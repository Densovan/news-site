const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const accessToken = (id, fullname, email, image) => {
  return jwt.sign(
    { id, fullname, email, image },

    process.env.JWTSECRET,
    {
      expiresIn: "1800000",
    }
  );
};
const maxAge = 30 * 24 * 60 * 60;

//===========register============
router.post("/", async (req, res) => {
  try {
    const { email, fullname, gender, password, passwordVerify } = req.body;

    //===========validation===========

    if (!email || !password || !passwordVerify) {
      return res.status(201).json({ msg: "Please Enter all required fields." });
    }
    if (password.length < 6) {
      return res
        .status(201)
        .json({ msg: "please Enter a password of at least 6 characters" });
    }
    // if (fullname.length < 3) {
    //   return res
    //     .status(400)
    //     .json({ msg: "please Enter a name of at least 3 characters" });
    // }
    if (password !== passwordVerify) {
      return res
        .status(201)
        .json({ msg: "Please Enter the same password twice" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(201).json({ msg: "This Email Already Exist!" });
    }
    //============hast the password==========

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    //=========save a new user account to database============

    const newUser = new User({
      fullname,
      email,
      gender,
      passwordHash,
    });
    const savedUser = await newUser.save();

    //=============log the user in=============

    const token = accessToken(savedUser._id);
    const refreshToken = jwt.sign(
      {
        id: savedUser._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: maxAge,
      }
    );

    //================send the token============
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 1800000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: maxAge * 1000,
    });

    res
      .status(200)
      .json({
        msg: "Login Successful",
        token: token,
        success: true,
        _id: savedUser._id,
      })
      .send();
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

//===============log in===========
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(201).json({ msg: "Please Enter all required fields." });
//     }
//     const existingUser = await User.findOne({ email });
//     if (!existingUser) {
//       return res.status(201).json({ msg: "Wrong Email or Password" });
//     }
//     const passwordCorrect = await bcrypt.compare(
//       password,
//       existingUser.passwordHash
//     );
//     if (!passwordCorrect) {
//       return res.status(201).json({ msg: "Wrong Email or Password" });
//     }
//     //=========sign token===========
//     const token = jwt.sign(
//       {
//         id: existingUser._id,
//       },
//       process.env.JWTSECRET
//     );

//     //================send the token============
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "none",
//     });
//     // .send();
//     res
//       .status(200)
//       .json({
//         msg: "Login Successful",
//         token: token,
//         success: true,
//         _id: existingUser._id,
//       })
//       .send();
//   } catch (error) {
//     console.error(error);
//     res.status(500);
//   }
// });

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(201).json({ msg: "Please Enter all required fields." });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(201).json({ msg: "Wrong Email or Password" });
    }
    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect) {
      return res.status(201).json({ msg: "Wrong Email or Password" });
    }
    //=========sign token===========
    const token = accessToken(existingUser._id);
    const refreshToken = jwt.sign(
      {
        id: existingUser._id,
        role: existingUser.role,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: maxAge,
      }
    );

    //================send the token============
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 1800000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: maxAge * 1000,
    });

    res
      .status(200)
      .json({
        msg: "Login Successful",
        token: token,
        success: true,
        _id: existingUser._id,
      })
      .send();
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .send();
});

router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);

    const newToken = jwt.verify(token, process.env.JWTSECRET);
    if (newToken) {
      res.send(true);
    }
  } catch (err) {
    res.json(false);
  }
});

router.get("/verifyToken", async (req, res) => {
  try {
    const { token, refreshToken } = await req.cookies;
    if (!token || !refreshToken) return res.json(false);
    const verifyToken = jwt.verify(token, process.env.JWTSECRET);
    const verifyRefreshToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    if (verifyToken && verifyRefreshToken) {
      res.send(true);
    }
  } catch (err) {
    res.json(false);
  }
});

//====================refresh Token==============

router.post("/refresh-token", (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res
      .status(403)
      .json({ msg: "Refresh token not found, login again" });
  }
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, user) => {
      if (!err) {
        const result = await User.findById(user.id);
        const token = accessToken(
          result._id,
          result.fullname,
          result.email,
          result.image
        );

        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: maxAge * 1000,
        });

        return res.status(200).send({
          success: true,
          accessToken: token,
        });
      } else {
        return res.json({
          success: false,
          message: "Invalid refresh token",
        });
      }
    }
  );
});

// ============admin login===============

router.post("/admin_login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(201).json({ msg: "Please Enter all required fields." });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(201).json({ msg: "Wrong Email or Password" });
    }
    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect) {
      return res.status(201).json({ msg: "Wrong Email or Password" });
    }
    //=========sign token===========
    const token = accessToken(existingUser._id);
    const refreshToken = jwt.sign(
      {
        id: existingUser._id,
        role: existingUser.role,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: maxAge,
      }
    );

    if (existingUser.role == "admin") {
      //================send the token============
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 1800000,
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: maxAge * 1000,
      });

      res
        .status(200)
        .json({
          msg: "Login Successful",
          token: token,
          success: true,
          _id: existingUser._id,
        })
        .send();
    } else if (existingUser.role == "user") {
      return res.status(400).json({ msg: "login failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

module.exports = router;
