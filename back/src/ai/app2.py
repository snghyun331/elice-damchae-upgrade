from flask import Flask, Response, request, jsonify
import io
import base64
from pathlib import Path 
import torch 
from diffusers import StableDiffusionPipeline
from PIL.Image import Image
import os
from dotenv import load_dotenv
from translate import Translator
import pydantic as _pydantic
from typing import Optional

class _PromptBase(_pydantic.BaseModel):
    seed: Optional[int] = 42
    num_inference_steps: int = 10
    guidance_scale: float = 7.5


class ImageCreate(_PromptBase):
    prompt: str
    
load_dotenv()
pipe = StableDiffusionPipeline.from_pretrained(
    "CompVis/stable-diffusion-v1-4", 
    revision="fp16", 
    torch_dtype=torch.float32,
    use_auth_token="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"
    )
if torch.backends.mps.is_available():
    device = "mps"
else: 
    device = "cuda" if torch.cuda.is_available() else "cpu"
pipe.to(device)


app = Flask(__name__)

@app.route("/")
def read_root():
    return {"message": "Welcome to Stable Diffusers API"}

@app.route("/text-to-image", methods=["POST"])
def generate():
    args = request.get_json(force=True)
    prompt_kr = args.get('prompt',[])
    translator = Translator(from_lang="ko", to_lang="en")
    prompt_eng = translator.translate(prompt_kr)
    imgPromptCreate = ImageCreate(
        prompt=prompt_eng,
        seed=42,
        num_inference_steps=10,
        guidance_scale=7.5,
    )
    image = generate_image(imgPrompt=imgPromptCreate)
    
    # Encode the image to Base64
    temp_file_path = "temp_image.png"
    image.save(temp_file_path, format="PNG")

    # Read the image from the temporary file
    with open(temp_file_path, "rb") as f:
        image_data = f.read()

    # Remove the temporary file
    os.remove(temp_file_path)

    # Encode the image data to Base64
    base64_image = base64.b64encode(image_data).decode("utf-8")
    return jsonify({"image_base64": base64_image})


def generate_image(imgPrompt: ImageCreate) -> Image: 
    generator = None if imgPrompt.seed is None else torch.Generator().manual_seed(int(imgPrompt.seed))
    image: Image = pipe(imgPrompt.prompt,
                        guidance_scale=imgPrompt.guidance_scale, 
                        num_inference_steps=imgPrompt.num_inference_steps, 
                        generator = generator, 
                    ).images[0]
    
    return image

if __name__ == '__main__':
    app.run(host = '0.0.0.0', port = 5001)