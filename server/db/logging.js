//Get current date and time.

function now() {
  const d = new Date();
  return d.toISOString();
}

//Error logging functions.

function info(msg) {
  console.log('[' + now() + '] INFO: ' + msg);
}

function warn(msg) {
  console.log('[' + now() + '] WARN: ' + msg);
}

function error(msg) {
  console.log('[' + now() + '] ERROR: ' + msg);
}

function debug(msg) {
  console.log('[' + now() + '] DEBUG: ' + msg);
}
//Module export.

module.exports = {
  info: info,
  warn: warn,
  error: error,
  debug: debug,
  // fatal: fatal
};
