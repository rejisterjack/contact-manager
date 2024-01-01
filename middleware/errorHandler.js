const errorHandler = (err, req, res, next) => {
  const statusCode = req.statusCode ? req.statusCode : 500
  switch (statusCode) {
    case 400:
      res.json({
        title: "Validation Error",
        message: err.message,
        stackTrace: err.stack,
      })
      break
    case 404:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      })
      break
    default:
      res.json({
        title: "Unknown Error",
        message: err.message,
        stackTrace: err.stack,
      })
  }
}
