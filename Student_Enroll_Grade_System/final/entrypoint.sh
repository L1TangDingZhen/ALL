#!/bin/bash
set -e

# 确保 data 目录存在（Docker volume 挂载点）
mkdir -p /app/data

echo "Running database migrations..."
python manage.py migrate --noinput

echo "Starting gunicorn..."
exec gunicorn --bind 0.0.0.0:8000 --workers 3 --timeout 120 final.wsgi:application
