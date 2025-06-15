from flask import Flask, request, jsonify, send_from_directory
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
UPLOAD_FOLDER = '/data'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/')
def home():
    return 'Flask backend is running!'

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify(error="No file part"), 400
    f = request.files['file']
    if f.filename == '':
        return jsonify(error="No selected file"), 400
    filename = secure_filename(f.filename)
    f.save(os.path.join(UPLOAD_FOLDER, filename))
    return jsonify(message=f"Uploaded '{filename}'"), 200

@app.route('/files', methods=['GET'])
def list_files():
    return jsonify(files=os.listdir(UPLOAD_FOLDER)), 200

@app.route('/files/<filename>', methods=['GET'])
def download(filename):
    return send_from_directory(UPLOAD_FOLDER, filename, as_attachment=True)

@app.route('/files/<filename>', methods=['DELETE'])
def delete(filename):
    try:
        os.remove(os.path.join(UPLOAD_FOLDER, filename))
        return jsonify(message=f"Deleted '{filename}'"), 200
    except FileNotFoundError:
        return jsonify(error="File not found"), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)