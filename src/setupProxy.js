const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(
        createProxyMiddleware("/login", {
            target: "https://orderentryappv1.azurewebsites.net/api/account",
            changeOrigin: true
        })
    );
    app.use(
        createProxyMiddleware("/OrderHeaders/2/10-1-2020/12-30-2020", {
            target: "https://orderentryappv1.azurewebsites.net/api",
            changeOrigin: true
        })
    );
    app.use(
        createProxyMiddleware("/OrderHeaders", {
            target: "https://orderentryappv1.azurewebsites.net/api",
            changeOrigin: true
        })
    );
};