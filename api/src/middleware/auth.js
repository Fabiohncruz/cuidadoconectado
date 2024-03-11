const { verifyIdToken } = require('../firebase/firebase');

const auth = (authority) => async (req, res, next) => {
  const authorization = req.headers['authorization'];
  if (!authorization) {
    res.status(401).send({ error: 'Not authorized to access this resource' });
    return;
  }

  try {
    const token = authorization.replace('Bearer ', '');

    const decodedIdToken = await verifyIdToken(token);
    const principal = {};
    principal.id = decodedIdToken.uid;
    principal.email = decodedIdToken.email;
    principal.authorities = [decodedIdToken.role];

    req.principal = principal;

    if (authority && decodedIdToken.role !== authority) {
      res.status(403).send();
      return;
    }
    next();
  } catch (err) {

    let msg = 'Not authorized to access this resource';
    if (err.errorInfo && err.errorInfo === 'auth/id-token-expired') {
      msg = 'Not authorized token has expired';
    }
    res.status(401).send({ message: msg, error: err });
  }
};

module.exports = auth;