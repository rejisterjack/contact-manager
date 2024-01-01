const errorHandler = (err, req, res, next) => {
  const statusCode = req.statusCode ? req.statusCode : 500
  switch (statusCode) {
    case 400:
      res.json({ message: err.message, stackTrace: err.stack })
      break
  }
}
