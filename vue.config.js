module.exports = {
  devServer: {
    proxy: {
      "/": {
        target: "http://localhost:90",
        changeOrigin: true,
      }
    }
  }
};