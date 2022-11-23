#! /bin/bash
# 使脚本具有执行权限
# chmod +x ./deploy.sh

echo "Start to publish..."

echo "git pull"
git pull

#echo "rm -rf ./node_modules"
#rm -rf ./node_modules

#echo "npm cache clean --force"
#npm cache clean --force

echo "npm install"
npm install

echo "npm run build"
npm run build

echo "npm run pm2"
npm run pm2

echo "Success!";
