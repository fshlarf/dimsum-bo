module.exports = {
  apps: [
    {
      name: "dimsum-bo",
      script: "yarn",
      args: "start",
      interpreter: "bash",
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
