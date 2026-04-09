#!/bin/bash
set -e

# 确保 data 目录存在
mkdir -p /app/data

echo "Running database migrations..."
python manage.py migrate --noinput

echo "Starting gunicorn..."
exec gunicorn --bind 0.0.0.0:8000 box_back.wsgi:application
