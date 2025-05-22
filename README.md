# 倉庫管理システム

シンプルな倉庫管理システムの実装です。

## 技術構成
### フロントエンド
- React
- Next.js
- TypeScript

### バックエンド
- Python
- FastAPI

### データベース
- モックとして `.json` ファイルを使用

## 機能概要
- 商品管理: 商品の登録・編集・削除・一覧表示
- 在庫管理: 在庫の検索・表示・調整
- 入出庫管理: 入庫・出庫・移動処理の記録と履歴表示
- 倉庫管理: 倉庫場所の登録・管理・一覧表示
- ダッシュボード: 主要なKPIの可視化

## プロジェクト構造
```
/
├── backend/
│   ├── app/
│   │   ├── models/      # データモデル定義
│   │   ├── routes/      # APIエンドポイント
│   │   └── services/    # ビジネスロジック
│   ├── data/            # JSONモックデータベース
│   ├── main.py          # アプリケーションエントリーポイント
│   └── requirements.txt # 依存関係
│
└── frontend/
    ├── components/      # 再利用可能なUIコンポーネント
    ├── pages/           # Next.jsページ
    ├── styles/          # CSSスタイル
    ├── types/           # TypeScript型定義
    ├── package.json     # 依存関係
    └── tsconfig.json    # TypeScript設定
```

## インストール方法

### バックエンド
```bash
cd backend
pip install -r requirements.txt
```

### フロントエンド
```bash
cd frontend
npm install
```

## 実行方法

### バックエンド
```bash
cd backend
uvicorn main:app --reload
```
APIは http://localhost:8000 で動作します。

### フロントエンド
```bash
cd frontend
npm run dev
```
ウェブアプリケーションは http://localhost:3000 で動作します。

## 完了タスク一覧
- [x] 環境設定用ファイルの作成
- [x] モックファイルの作成
- [x] バックエンド用ファイル作成
- [x] フロントエンド表示用のファイル作成
- [x] プルリクエスト
