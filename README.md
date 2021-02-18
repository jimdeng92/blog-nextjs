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

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
