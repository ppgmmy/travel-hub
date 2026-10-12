# 旅遊樞紐 · travel-hub

**備用模板（standby template）。** 用嚟開新 GitHub repo，再部署到 Vercel，做一次新旅程嘅獨立小站。

日常用嘅行程同伴係 **[trip-companion](https://trip-companion-pied.vercel.app/)**，唔係呢個站。呢個 repo 唔取代 trip-companion；功能保留完整，方便下次開新站時直接複製。

## English

Standby / reusable template: clone this repo and deploy to Vercel when you need a **fresh trip site**. The primary live companion is **trip-companion**. Seed trips here are sample content.

## 點樣用嚟開新旅程站

1. 用呢個 repo 開一個新 GitHub repository（fork 或複製檔案都得）。
2. 改 `content/trips.json` 同 `content/guides/`，換成新旅程（id、日期、住宿、日程、指南）。
3. 喺 [Vercel](https://vercel.com/new) 導入嗰個新 repo。Framework 選 Next.js，`npm run build`，無需資料庫、無需環境變數。
4. 推到 `main` 就會自動部署。

示範內容：`qianhai-2026-10`（前海，2026-10-12 至 2026-10-13，兩日一夜）係**樣本行程**，用嚟示範版面，唔係日常主站。

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

## 頁面（功能保留）

| 路徑 | 內容 |
| --- | --- |
| `/` | 首頁，突出當前／即將出發旅程 |
| `/trips` | 進行中旅程 |
| `/trips/[id]` | 日程、住宿、附近、清單、筆記 |
| `/guides` | 指南列表 |
| `/guides/qianhai` | 前海指南（樣本） |
| `/archive` | 已結束或已封存旅程 |
| `/book` | 機票／酒店外連搜尋（無即時報價） |

封存規則：結束日已過（香港日期）或 `status` 為 `archived`，就會出現在檔案。

## 內容檔

- `content/trips.json` — 旅程、住宿、日程、附近名單、清單、筆記
- `content/guides/*.json` — 目的地指南章節

清單同私人備忘會寫入瀏覽器 `localStorage`，只存在該裝置。

## 部署到 Vercel

1. 把 **新** GitHub repo 導入 [Vercel](https://vercel.com/new)（唔好當呢個示範站係日常主站）。
2. Framework Preset 選 Next.js；Build Command 用 `npm run build`，Output 維持預設。
3. 無環境變數、無資料庫。推到 `main` 後會自動部署。
4. 本站唔接預訂 API。外連按鈕只打開第三方搜尋頁，介面已標明「非即時報價」。
