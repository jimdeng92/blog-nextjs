/* global require process */
const nextConf = require('./next.config')
const express = require("express");
const next = require("next");
const compression = require('compression')
// const {createProxyMiddleware} = require("http-proxy-middleware");

console.log(process.env.NODE_ENV)
const port = parseInt(process.env.PORT, 10) || 10001;
const dev = process.env.NODE_ENV !== "production";
const app = next({dev, conf: nextConf});
const handle = app.getRequestHandler();

// 使用fetch时（全路径），设置代理无效
// const devProxy = {
//   "/api": {
//     target: "http://localhost:9000",
//     changeOrigin: true,
//   },
// };

app
  .prepare()
  .then(() => {
    const server = express();

    // gzip 压缩
    if (!dev) {
      server.use(compression()) //gzip
    }

    // 开发环境代理
    // if (dev && devProxy) {
    //   Object.keys(devProxy).forEach(function (context) {
    //     server.use(context, createProxyMiddleware(devProxy[context]));
    //   });
    // }

    server.all("*", (req, res) => {
      handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) {
        throw err;
      }
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("An error occurred, unable to start the server");
    console.log(err);
  });
