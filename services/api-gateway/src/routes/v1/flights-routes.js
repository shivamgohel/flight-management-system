const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const { serverConfig, logger } = require("../../config");

const router = express.Router();

const FLIGHTS_SERVICE_URL = serverConfig.FLIGHTS_SERVICE_URL;

/**
 * Proxy requests starting with `/flights`
 *
 * Client request:  /api/v1/flights/...
 * Forward to:      http://flight-service/api/v1/flights/...
 *
 * pathRewrite:
 * - Removes the leading slash (^) from the original path and prepends `/api/v1/flights`
 * - Ensures the Flight Service receives the correctly formatted API path
 */
router.use(
  "/flights",
  createProxyMiddleware({
    target: FLIGHTS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/": "/api/v1/flights",
    },
  })
);

/**
 * Proxy requests starting with `/cities`
 *
 * Client request:  /api/v1/cities/...
 * Forward to:      http://flight-service/api/v1/cities/...
 */
router.use(
  "/cities",
  createProxyMiddleware({
    target: FLIGHTS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/": "/api/v1/cities",
    },
  })
);

/**
 * Proxy requests starting with `/airports`
 *
 * Client request:  /api/v1/airports/...
 * Forward to:      http://flight-service/api/v1/airports/...
 */
router.use(
  "/airports",
  createProxyMiddleware({
    target: FLIGHTS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/": "/api/v1/airports",
    },
  })
);

/**
 * Proxy requests starting with `/airplanes`
 *
 * Client request:  /api/v1/airplanes/...
 * Forward to:      http://flight-service/api/v1/airplanes/...
 */
router.use(
  "/airplanes",
  createProxyMiddleware({
    target: FLIGHTS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/": "/api/v1/airplanes",
    },
  })
);

module.exports = router;
