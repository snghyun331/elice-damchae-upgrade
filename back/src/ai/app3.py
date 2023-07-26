from flask import Flask, request, jsonify
import base64
import requests
import os
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
    base64_value = data['artifacts'][0]['base64']
    

    return jsonify({"image_base64": base64_value})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)