const {
  V4: { verify },
} = require("paseto");

exports.requireSignIn = async (req, res, next) => {
  try {
   
 if (!req?.cookies?.token)
      return res.status(401).send({ message: "Not authorized." });

   

    const token = req?.cookies?.token;

    if (!token)
      return res.status(401).send({
        message: "No authorization.",
      });
    try {
      const user = await verify(token, process.env.PUBLIC_KEY, {
        issuer: "http://localhost:8000",
      });

      req.user = user;
    } catch (err) {
      if (err) {
        console.log(err);
        return res.status(401).send({ message: err.code });
      }
    }
    return next();
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "internal server error" });
  }
};
