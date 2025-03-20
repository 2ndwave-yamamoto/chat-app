# syntax=docker/dockerfile:1

# -----------------------------------------
# ベースイメージは、PostgreSQLの公式イメージを使用
# https://hub.docker.com/_/postgres
# -----------------------------------------
ARG POSTGRES_VERSION=16
FROM postgres:${POSTGRES_VERSION}

LABEL version=1.0.0

# データベースの接続情報
ENV POSTGRES_USER=postgres \
    POSTGRES_PASSWORD=postgres \
    POSTGRES_DB=postgres \
    POSTGRES_PORT=5432 \
    TZ=Asia/Tokyo

# ロケールの設定
RUN apt-get update && apt-get install -y locales && rm -rf /var/lib/apt/lists/* \
    && localedef -i ja_JP -c -f UTF-8 -A /usr/share/locale/locale.alias ja_JP.UTF-8

ENV LANG ja_JP.UTF-8

# データベースのポート
EXPOSE ${POSTGRES_PORT}
