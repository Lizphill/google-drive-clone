# google-drive-clone# 📁 Google Drive Clone – File Uploader

A simple personal file uploader built with Flask + Kubernetes. Upload, list, download, and delete files from a local volume via web UI.

## 🔧 Tech Stack
- Backend: Flask
- Frontend: HTML + JS (React ready)
- Platform: Kubernetes (Minikube or Docker Desktop)
- Storage: Kubernetes hostPath PVC

## 🚀 Quick Start

### 1. Backend Docker Build

```bash
cd backend
docker build -t file-uploader-backend .