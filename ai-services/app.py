from flask import Flask, request, jsonify
from services.nlp import process_text

app = Flask(__name__)

@app.route('/api/nlp', methods=['POST'])
def nlp_endpoint():
    """
    Endpoint for processing NLP tasks.
    Expects a JSON payload with 'text' field.
    """
    try:
        data = request.get_json()
        text = data.get('text', '')

        if not text:
            return jsonify({"success": False, "message": "Text is required"}), 400

        # Process text using NLP service
        result = process_text(text)
        return jsonify({"success": True, "result": result}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)