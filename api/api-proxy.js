const express = require("express");
const proxy = require("express-http-proxy");
const cors = require("cors");

const app = express();
app.disable("x-powered-by");

// Define an array of allowed hosts
const allowedHosts = process.env.CORS_ALLOWED_HOSTS.split(",");

if (allowedHosts.length > 0) {
  // Create a CORS middleware with a custom origin() function
  const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || allowedHosts.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(origin + " Not allowed by CORS"));
      }
    },
  };

  // Use CORS middleware with custom origin function
  app.use(cors(corsOptions));
}

const isMultipartRequest = (req) => {
  const contentTypeHeader = req.headers["content-type"];
  return contentTypeHeader && contentTypeHeader.indexOf("multipart") > -1;
};

const proxyMiddleware = (req, res, next) => {
  return proxy(process.env.API_UPSTREAM_URL, {
    parseReqBody: !isMultipartRequest(req),
    proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
      proxyReqOpts.headers.Host = srcReq.headers.host;
      proxyReqOpts.headers.Cookie = srcReq.headers.cookie || "empty";
      proxyReqOpts.method = srcReq.method;
      return proxyReqOpts;
    },
    proxyReqPathResolver: function (req) {
      return new Promise(function (resolve) {
        const parts = req.url.split("?");
        const queryString = parts[1];
        const updatedPath = "/api" + parts[0];
        const resolvedPathValue =
          updatedPath + (queryString ? "?" + queryString : "");
        resolve(resolvedPathValue);
      });
    },
  })(req, res, next);
};

app.use("/api", proxyMiddleware);

module.exports = app;
