function Auditor(mongoClientObject, auditSchema) {
  return (req, res, next) => {
    const userAgent = req.headers["user-agent"];
    const ipAddress =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    // Intercept the response to log it
    const originalSend = res.send;
    // method override, when res.send is called in the route handler this res.send will be called.
    res.send = function (body) {
      const auditData = auditSchema || {
        statusCode: res.statusCode,
        urlPath: req.originalUrl,
        body: JSON.stringify(req.body),
        query: JSON.stringify(req.query),
        responseBody: body,
        userAgent: userAgent,
        ipAddress: ipAddress,
        createdAt: new Date(),
      };

      mongoClientObject.insertOne(auditData);
      // call the original res.send method
      originalSend.apply(res, arguments);
    };

    return next();
  };
}

module.exports = { Auditor };
