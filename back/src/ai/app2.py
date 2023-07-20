# !pip install "git+https://github.com/SKTBrain/KoBERT.git#egg=kobert_tokenizer&subdirectory=kobert_hf"
# !pip install --upgrade -qq "git+https://github.com/huggingface/diffusers.git"
import warnings
warnings.filterwarnings('ignore')
import bertModelClass
from flask import Flask, jsonify, request
import torch
from torch import nn
import torch.nn.functional as F
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import gluonnlp as nlp
from tqdm import tqdm, tqdm_notebook
import numpy as np
from kobert_tokenizer import KoBERTTokenizer
from transformers import BertModel, AdamW
from transformers.optimization import get_cosine_schedule_with_warmup
from diffusers import StableDiffusionPipeline, EulerDiscreteScheduler
from translate import Translator


tokenizer = KoBERTTokenizer.from_pretrained('skt/kobert-base-v1')
bertmodel = BertModel.from_pretrained('skt/kobert-base-v1', return_dict=False)
vocab = nlp.vocab.BERTVocab.from_sentencepiece(tokenizer.vocab_file, padding_token='[PAD]')
device = torch.device('cpu')
loaded_model = bertModelClass.BERTClassifier(bertmodel, dr_rate=0.5)
loaded_model.load_state_dict(torch.load('./best_model.h5',map_location=device))
loaded_model.eval()
max_len = 64
batch_size = 32

def predict(predict_sentence, model):
    data = [predict_sentence, '0']
    dataset_another = [data]
    another_test = bertModelClass.BERTDataset(dataset_another, 0, 1, tokenizer, vocab, max_len, True, False)
    test_dataloader = torch.utils.data.DataLoader(another_test, batch_size=batch_size)  # num_workers 빼주기
    model.eval()
    for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(test_dataloader):
        token_ids = token_ids.long().to(device)
        segment_ids = segment_ids.long().to(device)
        valid_length= valid_length
        label = label.long().to(device)
        out = model(token_ids, valid_length, segment_ids)
        test_eval=[]
        for i in out:
            logits=i
            logits = logits.detach().cpu().numpy()
            if np.argmax(logits) == 0:
                test_eval.append("불안")
            elif np.argmax(logits) == 1:
                test_eval.append("놀람")
            elif np.argmax(logits) == 2:
                test_eval.append("분노")
            elif np.argmax(logits) == 3:
                test_eval.append("슬픔")
            elif np.argmax(logits) == 4:
                test_eval.append("중립")
            elif np.argmax(logits) == 5:
                test_eval.append("기쁨")
        return test_eval[0]



app = Flask(__name__)

@app.route('/')
def home():
    return "Flask 서버시작"


# 글 감정분석(아웃풋 : mood)
@app.route('/predict', methods=['POST'])
def getPredictResult():
    args = request.get_json(force=True)   # request_body예시: {"sentence": "슬픈 하루였다."}
    sentence = args.get('sentence', [])  
    emotion = predict(sentence, loaded_model)
    return jsonify({'sentence': sentence, 'emotion': emotion})


# 텍스트를 이미지로(아웃풋: 이미지)
@app.route('/text-to-image', methods=['POST'])
def getImage():
    args = request.get_json(force=True) 
    sentence = args.get('sentence',[])
    translator = Translator(from_lang="ko", to_lang="en")
    model_id = "stabilityai/stable-diffusion-2"
    scheduler = EulerDiscreteScheduler.from_pretrained(model_id, subfolder="scheduler")
    pipe = StableDiffusionPipeline.from_pretrained(model_id, scheduler=scheduler, revision="fp16", torch_dtype=torch.float16)
    # pipe = pipe.to("cuda")
    
    translation = translator.translate(sentence)
    image = pipe(translation, height=500, width=500).images[0]
    return image  # 1. 이미지 고대로 return / 2. base64로 인디코딩 후 return / 3. 이미지를 url로 바꿔준 후 return


if __name__ == '__main__':
    app.run(host = '0.0.0.0', port = 5000)

