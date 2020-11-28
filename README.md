# 概要

obniz + 湿度センサー + 赤外線リモコンコンセントを使って、加湿器を制御するプログラム



[<img src="https://pbs.twimg.com/ext_tw_video_thumb/1329421000950259712/pu/img/x5MQhBYy2CqfMH9X.jpg" width="300px" />](https://twitter.com/tmitsuoka0423/status/1329421026334162949?s=20)

# 解説記事

[最近朝起きると喉がカラカラになっているので、いい感じの湿度を保つ加湿器コントローラーを2時間で作る](https://qiita.com/tmisuoka0423/items/c8d950d9c450826845b5)

# 用意するもの

- obniz Board
    - IoTプロトタイピングボード。JavaScriptで動くのでWebアプリエンジニアにも優しい。
    - 6000円くらい
    - 公式で購入：https://obniz.com/ja/products/obnizboard/
- 温湿度センサー SHT31
    - 湿度が測定できれば何でもOK。
    - 1000円くらい
    - 秋月で購入：https://akizukidenshi.com/catalog/g/gK-12125/
- リモコンコンセント OCR-05W
    - 赤外線リモコンでON/OFFできるコンセント
    - 2000円くらい
    - Amazonで購入：https://www.amazon.co.jp/dp/B01ABMGGQ8
- 赤外線LED
    - 何でもOK
    - 100円くらい
    - 秋月で購入：https://akizukidenshi.com/catalog/g/gI-03261/
- 抵抗
    - 5Ωのもの
    - セットで100円くらい
    - 秋月で買えます（ページ見つからなかった）
- 加湿器
    - 電源をつけたり消したりしても継続して動くもの
    - ホームセンターで購入
- その他あると良いもの
    - ブレッドボード
    - オスオスのピン or ジャンパワイヤ
# インストール

```bash
$ npm install
```

# 実行

## コマンド

### 基本

```bash
$ npx cross-env OBNIZ_ID=XXXX-XXXX node index.js
```
### 実行間隔を調整する場合

```bash
$ npx cross-env OBNIZ_ID=XXXX-XXXX INTERVAL=10000 node index.js
```

### [Ambient](https://ambidata.io/)でデータをグラフ化する場合


```bash
$ npx cross-env OBNIZ_ID=xxxx-xxxx AMBIENT_CHANNEL_ID=xxxxx AMBIENT_WRITE_KEY=xxxxxxxxxxxx node index.js
```

## パラメータ

| 名前 | 必須 | 詳細 | 例 |
| -- | -- | -- | -- |
| OBNIZ_ID | ◯ | obnizボードに表示される`4桁`-`4桁`のID | 1234-5678 |
| INTERVAL |  | 測定間隔[ミリ秒] | 10000 (10秒の場合) |
| AMBIENT_CHANNEL_ID |  | AmbientチャネルID | 12345 |
| AMBIENT_WRITE_KEY |  | Ambientライトキー | a1b2c3d4e5... |
