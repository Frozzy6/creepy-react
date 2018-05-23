/*
  Middleware of disable direct access on prod server.
  It's need for prevent google/yandex page duplicates

  GET scary-stories.com:80(nginx proxy) -> OK
  GET scary-stories.com:3000 -> 403
*/
module.exports = function( req, res, next ){
  const HOST = req.headers.host;

  if ( process.env.NODE_ENV == 'production' && HOST.match(':3000') ) {
    return res.sendStatus(403);
  } else {
    next();
  }
};
