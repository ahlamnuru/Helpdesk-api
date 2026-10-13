function notFound(req, res) {
  res.status(404).json({ error: "Not found" });
}

function errorHandler(err, req, res, next) {
  console.error(err);
  if (res.headersSent) return next(err);
  const status = err.status || 500;
  res.status(status).json({
    error: status === 500 ? "Something went wrong" : err.message,
  });
}

module.exports = { notFound, errorHandler };
