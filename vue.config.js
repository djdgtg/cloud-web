module.exports = {
  devServer: {
    proxy: {
      "": {
        target: "http://localhost",
        changeOrigin: true,
      }
    }
  }
};