FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5235

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["P2P.csproj", "./"]
RUN dotnet restore "./P2P.csproj"
COPY . .
RUN dotnet build "P2P.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "P2P.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# 设置环境变量（ALLOWED_ORIGINS 由 docker-compose 注入）
ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_URLS=http://+:5235

ENTRYPOINT ["dotnet", "P2P.dll"]