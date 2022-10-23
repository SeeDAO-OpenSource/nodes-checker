# Nodes Checker

确认节点身份并输出 JSON 档案的小工具 (使用 nodejs)

## 立即开始

1. 首先到 Etherscan 下载所有 Token Holder 的 Address list
https://etherscan.io/token/0xc74DEE15a4700D5df797bDD3982EE649A3Bb8c6C#balances

2. 在 Holders 最下方右下角处有一个 `[ Download CSV Export  ]` 点击下载所有 Holder 地址

3. 将档案 `export-tokenholders-for-contract-0xc74...csv` 复制到本目录，并更名为 `tokenholders.csv`

4. 复制 `.env.example` 为 `.env` 并将 `INFURA_APIKEY`, `SGN_THRESHOLD`, `SCR_THRESHOLD` 填入

```sh
cp .env.example .env

## .env
#                 
# INFURA_APIKEY=240..........................5f3
# SGN_THRESHOLD=1
# SCR_THRESHOLD=20000
#
```

其中 Infura API key 可免费到 [infura.io](https://infura.io) 申请

5. 执行比对与运算:

```sh
npm install
npm run start
```

6. 得到 `nodelist.csv` 即完成


## 历史纪录

见 `data/` 目录，可看到各期节点共识大会的节点钱包地址列表