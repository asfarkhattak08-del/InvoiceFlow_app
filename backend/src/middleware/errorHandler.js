export function notFoundHandler(req, res) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  if (error.code === 11000) {
    return res.status(409).json({ error: 'An invoice with that invoice number already exists.' });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation failed',
      details: Object.values(error.errors).map((item) => item.message),
    });
  }

  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid invoice id.' });
  }

  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'The attachment must be 10 MB or smaller.' });
  }

  console.error(error);
  return res.status(error.status || 500).json({ error: error.message || 'Internal server error.' });
}

