export const getEnvVaribale = function (param = 'ENV') {
  try {
    return process.env[`NODE_${param}`] || window[`__${param}__`];
  } catch( e ) {
    console.warn(`Request ${param} variable doesnt set`);
    return null;
  }
}
