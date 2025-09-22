const express = require("express");
const { StatusCodes } = require("http-status-codes");
const { createProxyMiddleware } = require("http-proxy-middleware");

const { serverConfig, logger } = require("../../config");
const ErrorResponse = require("../../utils/common/error-response");

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
    on: {
      proxyReq: (proxyReq, req, res) => {
        logger.info(`User requested: ${req.method} ${req.originalUrl}`);
        logger.info(`Proxied to: ${FLIGHTS_SERVICE_URL}${proxyReq.path}`);
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
    on: {
      proxyReq: (proxyReq, req, res) => {
        logger.info(`User requested: ${req.method} ${req.originalUrl}`);
        logger.info(`Proxied to: ${FLIGHTS_SERVICE_URL}${proxyReq.path}`);
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
    on: {
      proxyReq: (proxyReq, req, res) => {
        logger.info(`User requested: ${req.method} ${req.originalUrl}`);
        logger.info(`Proxied to: ${FLIGHTS_SERVICE_URL}${proxyReq.path}`);
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
    on: {
      proxyReq: (proxyReq, req, res) => {
        logger.info(`User requested: ${req.method} ${req.originalUrl}`);
        logger.info(`Proxied to: ${FLIGHTS_SERVICE_URL}${proxyReq.path}`);
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
