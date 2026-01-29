module.exports = {
  apps: [
    {
      name: 'learn-nestjs-prisma',
      script: 'dist/main.js',
      watch: false,
      instances: 3,
      exec_mode: 'cluster',
    },
  ],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
