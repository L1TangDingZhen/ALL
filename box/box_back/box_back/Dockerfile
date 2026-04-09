FROM python:3.10

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt
RUN pip install gunicorn django-cors-headers

COPY . .

# 设置环境变量
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=box_back.settings

# 创建 data 目录
RUN mkdir -p /app/data

# 收集静态文件
RUN python manage.py collectstatic --noinput

# 复制启动脚本
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# 暴露端口
EXPOSE 8000

# 使用 entrypoint 脚本启动（先 migrate 再启动 gunicorn）
ENTRYPOINT ["/app/entrypoint.sh"]