# いめこれったー

最高の画像を集めるためのTwitterクライアント

## スクリーンショット
![](https://raw.githubusercontent.com/tigberd/imecoletter/image/1.png)


## 使うには

Rekognitionでお金が予想外にかかりすぎて自前のIAMアカウントの情報を埋め込んだアプリは配布できそうにないです。すみません。一応簡単に自前でビルドできます。

Twitterでwrite権限を持ったアプリの作成、AWSで[Rekognition](https://aws.amazon.com/jp/rekognition/)の権限を持ったユーザを作成します。

` mv env.js.template env.js ` してそれぞれのキーを埋めます。

```
npm install
npm run build
```

でうまくいけばWin, Mac, Linux用のバイナリが作成されます。必要なライブラリなどは各位入れてください。

---

This project was generated from [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about this project can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
