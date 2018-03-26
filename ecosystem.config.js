module.exports = {
  apps: [{
    name: 'fora',
    script: "node ./bin/www",
  }],
  deploy: {
    production: {
      user: 'ec2-user',
      host: 'ec2-18-232-235-70.compute-1.amazonaws.com',
      key: '~/.ssh/fora.pem',
      ref: 'origin/master',
      repo: 'https://github.com/viniciusofp/fora.git',
      path: '/home/ec2-user/fora',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}