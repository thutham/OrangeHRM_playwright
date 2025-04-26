// env.config.js
const environments = {
  development: {
    BASE_URL: 'http://localhost:8081/web/index.php',
  },
  staging: {
    BASE_URL: 'https://staging.example.com',
  },
  production: {
    BASE_URL: 'https://www.example.com',
  },
};

const currentEnv = process.env.NODE_ENV || 'development';

module.exports = {
  ...environments[currentEnv],
  currentEnv,
};
