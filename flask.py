from flask import Flask, request, jsonify
import ollama
from flask_cors import CORS  # Import CORS

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

MODEL_NAME = "deepseek-r1:7b"  # Ensure the model is installed (ollama pull deepseek:7b)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_prompt = data.get("message", "")

    if not user_prompt:
        return jsonify({"error": "Message is required"}), 400

    try:
        response = ollama.chat(
            model=MODEL_NAME,
            messages=[
                {"role": "user", "content": user_prompt}
            ]
        )
        return jsonify({"response": response['message']['content']})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)