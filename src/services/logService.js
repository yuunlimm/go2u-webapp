function init() {}

function log(error) {
  // Sentry.captureException(error);
  console.log(error);
}

export default {
  init,
  log
};
