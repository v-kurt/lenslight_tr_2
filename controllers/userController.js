import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Photo from "../models/photoModel.js";

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ user: user._id });
  } catch (error) {
    let errors2 = {};

    if (error.code === 11000) {
      errors2.email = "Email is already registered";
    }

    if (error.name === "ValidationError") {
      Object.keys(error.errors).forEach((key) => {
        errors2[key] = error.errors[key].message;
      });
    }

    res.status(400).json(errors2);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    let same = false;

    if (user) {
      same = await bcrypt.compare(password, user.password);
    } else {
      return res.status(401).json({
        succeded: false,
        error: "There is no such person",
      });
    }

    if (same) {
      const token = createToken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      });
      res.status(200).redirect("/users/dashboard");
    } else {
      res.status(401).json({
        succeded: false,
        error: "You are not authorized",
      });
    }
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error: "Internal Error",
    });
  }
};

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
};

const getDashboardPage = async (req, res) => {
  const photos = await Photo.find({ user: res.locals.user._id });
  const user = await User.findById({ _id: res.locals.user._id }).populate([
    "followings",
    "followers",
  ]);

  res.render("dashboard", {
    link: "dashboard",
    photos,
    user,
  });
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: res.locals.user._id } });
    res.status(200).render("users", {
      users,
      link: "users",
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};

const getAUser = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });

    const inFollowers = user.followers.some((follower) => {
      return follower.equals(res.locals.user._id);
    });

    const photos = await Photo.find({ user: user._id });

    res.status(200).render("user", {
      user,
      link: "users",
      photos,
      inFollowers,
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};

const follow = async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $addToSet: { followers: res.locals.user._id },
      },
      {
        new: true,
      }
    );

    user = await User.findByIdAndUpdate(
      { _id: res.locals.user._id },
      { $addToSet: { followings: req.params.id } },
      { new: true }
    );
    res.status(200).redirect(`/users/${req.params.id}`);
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};

const unfollow = async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $pull: { followers: res.locals.user._id },
      },
      {
        new: true,
      }
    );

    res.status(200).redirect(`/users/${req.params.id}`);

    user = await User.findByIdAndUpdate(
      { _id: res.locals.user._id },
      { $pull: { followings: req.params.id } },
      { new: true }
    );
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};

export {
  createUser,
  loginUser,
  getDashboardPage,
  getAllUsers,
  getAUser,
  follow,
  unfollow,
};
