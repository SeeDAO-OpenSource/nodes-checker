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

```csv
Node,Address,SCR,SGN,Block,Time
N,0x01116bff69113dc1125dd9fc465eed55cf32e9ca,4110,0,15809702,"Sun, 23 Oct 2022 08:45:11 GMT"
Y,0x01175ef4738b825cd12f4d1ff2d2904d52144531,643625,2,15809702,"Sun, 23 Oct 2022 08:45:11 GMT"
...
...
N,0x01917dfa012027d59c86250e887a45f6d8f49f6d,1902,0,15809702,"Sun, 23 Oct 2022 08:45:11 GMT"
N,0x0374dd85fdbadaff0377bbe7d7753b054bd9e7e0,3000,0,15809702,"Sun, 23 Oct 2022 08:45:11 GMT"
Y,0x043aee850680c4fb982761b585929834c26cc32c,93870,1,15809702,"Sun, 23 Oct 2022 08:45:11 GMT"
```
其中:

- Node: Y 为具备节点身份资格, N 为不具备
- Address: 为钱包地址
- SCR: 为检验时间当下的 `$SCORE` 总数
- SGN: 为检验时间当下的 `SGN` 总数
- Block: 检验时间的区块
- Time: 该检验区块的时间

## 历史纪录

见 `data/` 目录，可看到各期节点共识大会的节点钱包地址列表