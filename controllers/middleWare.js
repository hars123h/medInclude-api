
const {expressjwt: expressJwt} = require('express-jwt');




exports.requireSignin = expressJwt({
    secret: "shhhhhhared-secret",
    algorithms: ["HS256"],
  });
  