from flask import Flask, request, jsonify, send_from_directory
import os
from werkzeug.utils import secure_filename

# Set up Flask app and upload directory
UPLOAD_FOLDER = '/data'  # This will be mounted as a volume later
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app = Flask(__name__)

# Upload file
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    filename = secure_filename(file.filename)
    file.save(os.path.join(UPLOAD_FOLDER, filename))
    return jsonify({"message": f"File '{filename}' uploaded successfully."}), 200

# List files
@app.route('/files', methods=['GET'])
def list_files():
    files = os.listdir(UPLOAD_FOLDER)
    return jsonify({"files": files}), 200

# Download file
@app.route('/files/<filename>', methods=['GET'])
def download_file(filename):
    try:
        return send_from_directory(UPLOAD_FOLDER, filename, as_attachment=True)
    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 404

# Delete file
@app.route('/files/<filename>', methods=['DELETE'])
def delete_file(filename):
    try:
        os.remove(os.path.join(UPLOAD_FOLDER, filename))
        return jsonify({"message": f"File '{filename}' deleted."}), 200
    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 404