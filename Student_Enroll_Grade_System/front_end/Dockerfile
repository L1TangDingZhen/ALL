# 构建阶段
FROM node:16-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./

# 使用生产环境构建
RUN npm run build

# 生产阶段
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]