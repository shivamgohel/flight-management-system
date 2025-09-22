const express = require("express");
const { StatusCodes } = require("http-status-codes");
const { createProxyMiddleware } = require("http-proxy-middleware");

const { serverConfig, logger } = require("../../config");
const ErrorResponse = require("../../utils/common/error-response");

const router = express.Router();

const AUTH_SERVICE_URL = serverConfig.AUTH_SERVICE_URL;

/**
 * Proxy requests starting with `/auth`
 *
 * Client request:  /api/v1/auth/...
 * Forward to:      http://auth-service/api/v1/auth/...
 *
 * pathRewrite:
 * - Removes the leading slash (^) from the original path
 * - Prepends `/api/v1/auth/` to route requests correctly to the Auth Service
 *
 * Additional Config:
 * - 5-second timeout to prevent hanging requests
 * - Logs incoming client requests and outgoing proxied requests for better traceability
 * - Handles proxy errors gracefully by returning HTTP 503 with a JSON error message
 *
 * Usage Examples:
 * - POST /api/v1/auth/signup → proxied to → http://auth-service/api/v1/auth/signup
 * - POST /api/v1/auth/signin → proxied to → http://auth-service/api/v1/auth/signin
 * - POST /api/v1/auth/users/:id/roles → proxied to → http://auth-service/api/v1/auth/users/:id/roles
 * - GET  /api/v1/auth/users/:id → proxied to → http://auth-service/api/v1/auth/users/:id
 */
router.use(
  "/auth",
  createProxyMiddleware({
    target: AUTH_SERVICE_URL,
    changeOrigin: true,
    timeout: 5000,
    pathRewrite: {
      "^/": "/api/v1/auth/",
    },

    on: {
      proxyReq: (proxyReq, req, res) => {
        logger.info(`User requested: ${req.method} ${req.originalUrl}`);
        logger.info(`Proxied to: ${AUTH_SERVICE_URL}${proxyReq.path}`);
      },
      proxyRes: (proxyRes, req, res) => {
        logger.info(`Response received with status: ${proxyRes.statusCode}`);
      },
      error: (err, req, res) => {
        logger.error(`Proxy error: ${err.message}`);
        res.status(StatusCodes.SERVICE_UNAVAILABLE).json(
          ErrorResponse({
            message: "Service currently unavailable. Please try again later",
            error: err.message,
          })
        );
      },
    },
  })
);

module.exports = router;
