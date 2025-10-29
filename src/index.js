const express = require("express");
const morgan = require("morgan");
const { rateLimit } = require("express-rate-limit");
const { createProxyMiddleware } = require("http-proxy-middleware");
const {AuthorisedUser} = require('../src/middleware/index')
const app = express();

// if the coming request from same ip is more than the limit so block it
const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  limit: 5, // Limit each IP to 5 requests per `window` (here, per 2 minutes).
});
const PORT = 3005;

app.use(morgan("combined"));
app.use(limiter);


// applying Authentication if the upcoming request is coming from authorised user then start booking 
app.use("/bookingService",AuthorisedUser);
app.use(
  "/bookingService",
  createProxyMiddleware({
    target: "http://localhost:3002/",
    changeOrigin: true,
    pathRewrite: {
      "^/bookingService": "",
    },
  })
);

app.use('/flightService', createProxyMiddleware({
    target : 'http://localhost:3000/',
    changeOrigin:true,
    pathRewrite:{
        "^/flightService":"",
    },
})
);

app.use('/AuthService', createProxyMiddleware({
    target : 'http://localhost:3001/',
    changeOrigin:true,
    pathRewrite:{
        "^/AuthService":"",
    },
}))

app.listen(PORT, () => {
  console.log(`Server starts listening on  ${PORT}`);
});
