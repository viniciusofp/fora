module.exports = {
  apps: [{
    name: 'fora',
    script: './app.js'
  }],
  deploy: {
    production: {
      user: 'ec2-user',
      host: 'ec2-34-235-143-94.compute-1.amazonaws.com',
      key: '~/.ssh/fora.pem',
      ref: 'origin/master',
      repo: 'https://github.com/viniciusofp/fora.git',
      path: '/home/ec2-user/fora',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}