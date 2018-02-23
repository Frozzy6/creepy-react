export getEnvVaribale function(){
  try {
    return process.env.NODE_ENV || window.__ENV__;
  } catch( e ) {
    console.log('Request ENV variable doesnt set');
    return false;
  }
}
