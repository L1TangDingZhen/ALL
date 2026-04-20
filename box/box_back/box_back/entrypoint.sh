#!/bin/bash
set -e

# 确保 data 目录存在
mkdir -p /app/data

echo "Running database migrations..."
python manage.py migrate --noinput

echo "Checking if seed data is needed..."
python manage.py shell -c "
from box_back.app.models import User
if User.objects.count() == 0:
    print('No users found, loading seed data...')
    import django.core.management
    django.core.management.call_command('loaddata', 'seed.json', verbosity=1)
    print('Seed data loaded successfully.')
else:
    print(f'Database already has {User.objects.count()} users, skipping seed.')
"

echo "Starting gunicorn..."
exec gunicorn --bind 0.0.0.0:8000 box_back.wsgi:application
