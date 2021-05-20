const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

//===========register============
router.post("/", async (req, res) => {
  try {
    const { email, fullname, password, passwordVerify } = req.body;

    //===========validation===========

    if (!email || !password || !passwordVerify) {
      return res.status(400).json({ msg: "Please Enter all required fields." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ msg: "please Enter a password of at least 6 characters" });
    }
    if (fullname.length < 3) {
      return res
        .status(400)
        .json({ msg: "please Enter a name of at least 3 characters" });
    }
    if (password !== passwordVerify) {
      return res
        .status(400)
        .json({ msg: "Please Enter the same password twice" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "This Email Already Exist!" });
    }
    //============hast the password==========

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    //=========save a new user account to database============

    const newUser = new User({
      fullname,
      email,
      passwordHash,
    });
    const savedUser = await newUser.save();

    //=============log the user in=============

    const token = jwt.sign(
      {
        user: savedUser.id,
      },
      process.env.JWTSECRET
    );

    //================send the token============
    res.cookie("token", token, {
      httpOnly: true,
    });
    // .send();

    res
      .status(200)
      .json({ msg: "Register Successful", Newuser: savedUser, token: token });
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

//===============log in===========
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Please Enter all required fields." });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ msg: "Wrong Email or Password" });
    }
    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect) {
      return res.status(401).json({ msg: "Wrong Email or Password" });
    }
    //=========sign token===========
    const token = jwt.sign(
      {
        user: existingUser.id,
      },
      process.env.JWTSECRET
    );

    //================send the token============
    res.cookie("token", token, {
      httpOnly: true,
    });
    // .send();

    res.status(200).json({ msg: "Login Successful", token: token });
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
});

module.exports = router;
