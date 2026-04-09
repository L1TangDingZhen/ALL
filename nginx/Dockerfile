# ============================================================
# 多阶段构建：3个前端 + nginx 集成镜像
# 构建上下文必须是仓库根目录
# ============================================================

# ── Stage 1: Box 前端 (React) ────────────────────────────────
FROM node:18-alpine AS box-builder
WORKDIR /app
COPY box/box_show/package*.json ./
RUN npm ci
COPY box/box_show/ ./
ENV REACT_APP_API_URL=""
ENV REACT_APP_API_PATH=/api/box
ENV GENERATE_SOURCEMAP=false
RUN npm run build

# ── Stage 2: P2P 前端 (React) ────────────────────────────────
FROM node:16-alpine AS p2p-builder
WORKDIR /app
COPY P2P/p2p-client/package*.json ./
RUN npm ci
COPY P2P/p2p-client/ ./
ENV REACT_APP_API_URL=""
ENV REACT_APP_API_PATH=/api/p2p
ENV GENERATE_SOURCEMAP=false
RUN npm run build

# ── Stage 3: Student 前端 (Vue/Vite) ─────────────────────────
FROM node:18-alpine AS student-builder
WORKDIR /app
COPY Student_Enroll_Grade_System/front_end/package*.json ./
RUN npm ci
COPY Student_Enroll_Grade_System/front_end/ ./
ENV VITE_API_BASE_URL=/api/student
RUN npm run build

# ── Stage 4: 最终 nginx 镜像 ──────────────────────────────────
FROM nginx:alpine

# nginx 配置（生产环境用 secure 版本，包含 HTTPS + 速率限制）
COPY nginx/nginx-secure.conf /etc/nginx/conf.d/default.conf

# 三个前端构建产物
COPY --from=box-builder     /app/build  /usr/share/nginx/html/box
COPY --from=p2p-builder     /app/build  /usr/share/nginx/html/p2p
COPY --from=student-builder /app/dist   /usr/share/nginx/html

# 测试页面
COPY test.html /usr/share/nginx/html/test.html

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
