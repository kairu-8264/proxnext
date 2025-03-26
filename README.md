# Prox Next

**Prox Next** は、Proxmox VEをより使いやすくするためのWebクライアントです。Next.jsを使用して開発されており、モダンで快適なUIを提供します。

## 特徴

- **モダンなUI**: Next.jsを活用した高速で直感的なインターフェース  
- **簡単な操作**: Proxmox VEの基本的な管理操作をブラウザから実行可能  
- **レスポンシブデザイン**: スマホやタブレットからもアクセス可能  
- **API連携**: Proxmox VEのREST APIを活用して柔軟に管理  

## インストール方法
### 1. テンプレートのアップロード
1. Proxmox VEのWEBパネルにログインします。
2. [リリース](./releases)からテンプレートをダウンロードしてCTテンプレートをアップロードします
![alt text](github/Screenshot%202025-03-26%20183058.png)

### 2. LXCコンテナの作成
CTテンプレートがでてくるのでそれを選択してコンテナを作成します
![alt text](github/Screenshot%202025-03-26%20182506.png)

## インストール方法 (開発版)

### 1. リポジトリをクローン
```sh
git clone https://github.com/kairu-8264/proxnext.git
cd proxnext
```

### 2. 依存関係をインストール
```sh
npm install
```

### 3. 環境変数を設定  
```sh
cp config.json.example config.json
```
### config.jsonの例
```jsonc
{
    "host": "192.168.1.95",
    "port": 8006,
    "custom_headers": { // Optional
        "Authorization": "Bearer XXX", // Bearer Token
        "CF-Access-Client-ID": "XXXXX.access", // Cloudflare Access Client ID
        "CF-Access-Client-Secret": "XXXXX" // Cloudflare Access Client Secret
    }
}
```

### 4. 開発サーバーを起動
```sh
npm run dev
```

ブラウザで `http://localhost:8106` にアクセス！