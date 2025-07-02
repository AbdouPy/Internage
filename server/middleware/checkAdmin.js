module.exports = (req, res, next) => {
  const adminKey = req.headers["x-admin-key"];
  const allowedKey = process.env.ADMIN_SECRET_KEY; // set this in .env

  if (adminKey && adminKey === allowedKey) {
    return next();
  }

  return res.status(403).json({ message: "Access forbidden. Admins only." });
};
