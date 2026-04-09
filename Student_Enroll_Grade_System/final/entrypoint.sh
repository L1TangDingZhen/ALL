#!/bin/bash
set -e

# 确保 data 目录存在（Docker volume 挂载点）
mkdir -p /app/data

echo "Running database migrations..."
python manage.py migrate --noinput

# 如果数据库是空的（没有用户），加载初始数据
echo "Checking if seed data is needed..."
python manage.py shell -c "
from back.models import newuser
if newuser.objects.count() == 0:
    print('No users found, loading seed data...')
    import django.core.management
    django.core.management.call_command('loaddata', 'seed.json', verbosity=1)
    print('Seed data loaded successfully.')
else:
    print(f'Database already has {newuser.objects.count()} users, skipping seed.')
"

echo "Starting gunicorn..."
exec gunicorn --bind 0.0.0.0:8000 --workers 3 --timeout 120 final.wsgi:application
