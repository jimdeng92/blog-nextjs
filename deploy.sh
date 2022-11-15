#! /bin/bash
# 使脚本具有执行权限
# chmod +x ./git-pull.sh
# 保存当前目录
currentDir=$PWD
echo "Start to publish...\n"

git pull

npm install

npm run build

npm run pm2

# 切换到项目目录
# cd /usr/local/nginx/html/blog
# # 执行git命令
# git pull origin test
# git push origin master
# # 切换回原来的目录
# cd $currentDir
# # 删除缓存
# rm -rvf /usr/local/nginx/html/blog/runtime/cache
echo "Success\n";
