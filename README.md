# 旅遊樞紐 · travel-hub

個人行程手帳、公開目的地指南，以及機票／酒店外連搜尋。內容以 JSON 放在 `content/`，v1 無資料庫。主要介面為繁體中文（香港）。

## 本機執行

需要 Node.js 22 或以上。

```bash
npm install
npm run dev
```

瀏覽器打開 [http://localhost:3000](http://localhost:3000)。

```bash
npm run build
npm start
```

## 頁面

| 路徑 | 內容 |
| --- | --- |
| `/` | 首頁，突出當前／即將出發旅程 |
| `/trips` | 進行中旅程 |
| `/trips/[id]` | 日程、清單、筆記 |
| `/guides` | 指南列表 |
| `/guides/qianhai` | 前海指南 |
| `/archive` | 已結束或已封存旅程 |
| `/book` | 機票／酒店外連搜尋（無即時報價） |

種子行程：`qianhai-2026-10`（前海，2026-10-12 至 2026-10-14，`status: active`）。住宿：海底世界 Rany Hotel（蛇口海上世界），最早 10 月 12 日 08:00 入住。結束日已過或以香港日期計已完結，或 `status` 為 `archived`，就會出現在檔案。

## 內容檔

- `content/trips.json` — 旅程、日程、預設清單同筆記
- `content/guides/*.json` — 目的地指南章節

清單同私人備忘會寫入瀏覽器 `localStorage`，只存在該裝置。

## 部署到 Vercel

1. 把 GitHub repo 導入 [Vercel](https://vercel.com/new)。
2. Framework Preset 選 Next.js；Build Command 用 `npm run build`，Output 維持預設。
3. v1 無環境變數、無資料庫。推到 `main` 後會自動部署。
4. 本站唔接預訂 API。外連按鈕只打開第三方搜尋頁，介面已標明「非即時報價」。
