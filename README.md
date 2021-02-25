This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## TODO

- [x] ESLint
- [x] Vercel
- [x] title修改
- [x] 添加博客、分页设置
- [ ] 记录部署过程、description 修改

## 部署

git push 到 git 服务器，在 Linux 上 git pull，执行 `npm run build`，再执行 `npm run pm2`.

## 关键

1. 起初 .env.production 中的环境变量我设置了 `HOSTNAME=imlinhe.com HOST=https://$HOSTNAME`，在本地打包没什么问题，但是到服务端打包却总是报错，接口调用连接的是 `https://vm-0-6-centos/api/blog/list`，其中 `vm-0-6-centos` 是我服务器的主机名。排查了很久，在服务端执行 `export` 才发现 Linux 有环境变量 HOSTNAME，是 Linux 的环境变量覆盖了我的设置，因此在项目中修改 HOSTNAME 这个关键字就 ok 了。

2. 服务端执行 `yarn build` （有时会）报错 FetchError: invalid json response body at https://v1.hitokoto.cn/ reason: Unexpected end of JSON input ，需要删除 pm2 服务 --- `pm2 delete blog-nextjs` 再执行 `yarn build`，然后启动 `yarn pm2` 

