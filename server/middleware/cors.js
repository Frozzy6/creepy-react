module.exports = function( req, res, next ){
  console.log('');
  console.log('REQUEST FROM:', req.ip)
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
};
