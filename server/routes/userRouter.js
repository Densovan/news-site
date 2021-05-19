const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

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

    // const salt = await bcrypt.gentSalt(10);
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    //=========save a new user account to database============

    const newUser = new User({
      fullname,
      email,
      passwordHash,
    });
    const savedUser = await newUser.save();
    // console.log(passwordHash);
    res.status(200).json({ msg: "Register Successful", Newuser: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

module.exports = router;
