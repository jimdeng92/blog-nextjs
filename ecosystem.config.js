/* global module */
module.exports = {
  apps: [
    {
      name: 'blog-nextjs', // 应用名
      cwd: './', // 应用程序所在的目录
      script: './server.js', // 应用文件位置
      error_file: './logs/err.log', // 错误输出日志
      out_file: './logs/out.log', // 日志
      log_date_format: 'YYYY-MM-DD HH:mm Z', // 日期格式
      instances: 'max', // 将应用程序分布在所有CPU核心上,可以是整数或负数
      instance_var: 'INSTANCE_ID',
      exec_mode: 'cluster', // 集群
      watch: [ // 监听模式，不能单纯的设置为true，易导致无限重启，因为日志文件在变化，需要排除对其的监听
        'src/'
      ],
      ignore_watch: [ // 不用监听的文件
        'node_modules',
        'logs',
        'out'
      ],
      // 此处环境变量会覆盖 cross-env 设置的环境变量
      // env: {
      //   NODE_ENV: 'development',
      //   PORT: 10001
      // },
      // env_production: {
      //   NODE_ENV: 'production',
      //   PORT: 10001
      // },
      merge_logs: true, // 集群情况下，可以合并日志
    },
  ],
};
