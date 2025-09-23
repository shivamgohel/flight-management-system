const express = require("express");
const { StatusCodes } = require("http-status-codes");
const { createProxyMiddleware } = require("http-proxy-middleware");

const { serverConfig, logger } = require("../../config");
const ErrorResponse = require("../../utils/common/error-response");
const { isAuthenticated } = require("../../middlewares");

const router = express.Router();

const NOTIFICATION_SERVICE_URL = serverConfig.NOTIFICATION_SERVICE_URL;

/**
 * Proxy requests starting with `/notifications`
 *
 * Client request:  /api/v1/notifications/...
 * Forward to:      http://notification-service/api/v1/...
 *
 * Authentication middleware `isAuthenticated` is applied before proxying.
 */
router.use(
  "/",
  createProxyMiddleware({
    target: NOTIFICATION_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/": "/api/v1/", // rewrites /notifications/... to /api/v1/...
    },
    on: {
      proxyReq: (proxyReq, req, res) => {
        logger.info(`User requested: ${req.method} ${req.originalUrl}`);
        logger.info(`Proxied to: ${NOTIFICATION_SERVICE_URL}${proxyReq.path}`);

        // Forward user info from the token if needed
        if (req.user) {
          proxyReq.setHeader("x-user-id", req.user.id || "");
          proxyReq.setHeader("x-user-roles", (req.user.roles || []).join(","));
        }
      },
      proxyRes: (proxyRes, req, res) => {
        logger.info(`Response received with status: ${proxyRes.statusCode}`);
      },
      error: (err, req, res) => {
        logger.error(`Proxy error: ${err.message}`);
        res.status(StatusCodes.SERVICE_UNAVAILABLE).json(
          ErrorResponse({
            message:
              "Notification service currently unavailable. Please try again later",
            error: err.message,
          })
        );
      },
    },
  })
);

module.exports = router;
