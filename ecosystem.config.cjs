// ecosystem.config.cjs
module.exports = {
  apps : [{
    name   : "puce",
    script : "./dist/start.js",
    env: {
      NODE_ENV: "production"
    }
  }]
}