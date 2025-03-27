# syntax=docker/dockerfile:1

# -----------------------------------------
# ベースイメージは、Node.jsの公式イメージを使用
# https://hub.docker.com/_/node
# -----------------------------------------
ARG NODE_VERSION=23.10.0
FROM node:${NODE_VERSION}-bookworm-slim AS base

LABEL version=1.0.0

# コンテナ内のENVを設定
ENV WWWUSER=1000 \
    WWWGROUP=1000 \
    TZ=Asia/Tokyo

# パッケージをインストール
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
  # ユーザーの作成
  && groupadd -r ${WWWUSER} && useradd --no-log-init -r -g ${WWWUSER} ${WWWUSER} \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /src

# -----------------------------------------
# 依存関係インストール用のステージ
# -----------------------------------------
FROM base AS deps

COPY --chown=${WWWUSER}:${WWWGROUP} package*.json ./

RUN npm ci

# -----------------------------------------
# 開発用イメージ
# -----------------------------------------
FROM deps AS dev

# Gitと開発に必要なツールをインストール
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    git \
    openssl \
    && rm -rf /var/lib/apt/lists/*

# ソースコードをコピー
COPY --chown=${WWWUSER}:${WWWGROUP} . .

USER ${WWWUSER}

# 開発環境用のコマンド
CMD ["npm", "run", "dev"]

# -----------------------------------------
# ビルド用のステージ
# -----------------------------------------
FROM base AS build

# ソースコードをコピー
COPY --chown=${WWWUSER}:${WWWGROUP} . .

# アプリケーションをビルド
RUN npm run build

# -----------------------------------------
# 本番用イメージ
# -----------------------------------------
FROM base AS prod

# 必要なファイルのみをビルドステージからコピー
COPY --from=build /src/dist ./dist
COPY --from=build /src/package.json ./

# 本番環境用の依存関係のみをインストール
RUN npm ci --omit=dev

# 本番環境用のコマンド
CMD ["npm", "run", "start"]
