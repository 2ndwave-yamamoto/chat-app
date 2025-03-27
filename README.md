動作環境:Node.js 18以上


認証シークレットキーを生成

```
sed -i "s|AUTH_SECRET=.*|AUTH_SECRET=\"$(openssl rand -base64 32)\"|" .env
```