from flask import Flask, request, jsonify
import base64
import requests
from googletrans import Translator

app = Flask(__name__)

# Function to translate text from Korean to English
def translate_to_english(text):
    translator = Translator()
    translated = translator.translate(text, src="ko", dest="en")
    return translated.text

@app.route('/generate-image', methods=['POST'])
def generate_image():
    data = request.get_json()
    korean_text = data.get('korean_text', '')  # Extract Korean text from request data
    english_text = translate_to_english(korean_text)

    url = "https://api.stability.ai/v1/generation/stable-diffusion-xl-beta-v2-2-2/text-to-image"

    body = {
        "width": 512,
        "height": 512,
        "steps": 50,
        "seed": 0,
        "cfg_scale": 7,
        "samples": 1,
        "style_preset": "enhance",
        "text_prompts": [
            {
                "text": english_text,
                "weight": 1
            }
        ],
    }

    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer sk-HWOnpXPwvyjIBDebMro64xl5rwyAfLcVSFiBbEOLuOdSNWGf",  # Replace with your actual API key
    }

    response = requests.post(url, headers=headers, json=body)

    if response.status_code != 200:
        return jsonify({"error": "Non-200 response from API"}), 500

    data = response.json()
    image_paths = []

    for i, image in enumerate(data["artifacts"]):
        image_path = f"./out/txt2img_{image['seed']}.png"
        with open(image_path, "wb") as f:
            f.write(base64.b64decode(image["base64"]))
        image_paths.append(image_path)

    return jsonify({"image_paths": image_paths}), 200

if __name__ == '__main__':
    app.run(host = '0.0.0.0', port = 5002)
