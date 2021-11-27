import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  const authorization = req.headers.authorization || '';
  const token = authorization.split('Bearer ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  let user;

  try {
    user = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.sendStatus(401);
  }

  if (!user) {
    return res.sendStatus(401);
  }

  res.locals.user = user;
  return next();
};

export default auth;
