const User = require("../model/user");
const {
  V4: { sign, generateKey },
} = require("paseto");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).exec();

    if (!user)
      return res.status(400).json({
        message:
          "The credentials you provided are incorrect, please try again.",
      });

    // Checking Password
    const match = user.password === password;
    if (!match)
      return res.status(400).json({
        message:
          "The credentials you provided are incorrect, please try again.",
      });

    const payload = {
      _id: user?._id,
      email: user?.email,
      name: user?.name,
    };

    const accessToken = await sign(payload, process.env.SECRET_KEY, {
      issuer: "http://localhost:8000",
      expiresIn: "7 days",
    });

    // send token in cookie
    res.cookie("token", accessToken, { maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.send({ message: "Login Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "internal server error" });
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email)
      return res.status(400).send({ message: "please provide email address" });
    if (!password)
      return res.status(400).send({ message: "please provide password" });
    if (!name) return res.status(401).send({ message: "please provide name" });

    const findEmailExist = await User.findOne({ email }).exec();
    if (findEmailExist)
      return res.status(400).send({
        message: "email address already exist please use another one",
      });

    // savingInDb
    const addToDB = await User.create({
      email,
      password,
      name,
    });

    res.send({ message: "User Register successfully" });
  } catch (err) {
    res.status(500).send({ message: "internal server error" });
  }
};

exports.userDetails = async (req, res) => {
  try {
    if (!req?.user) return res.status(400).send({ message: "user not found" });

    const user = await User.findOne({ _id: req?.user?._id }).exec();

    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "internal sever error" });
  }
};
exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.send({message:"Logout successfully"});
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "internal sever error" });
  }
};
