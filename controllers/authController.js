const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const JWT_SECRET = "my_secret_key_for_task_api";

async function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({
      message: "Name is required",
    });
  }

  if (!email || email.trim() === "") {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters long",
    });
  }

  const existingUser = userModel.getUserByEmail(email);

  if (existingUser) {
    return res.status(400).json({
      message: "User with this email already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = userModel.createUser({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: newUser.id,
      email: newUser.email,
    },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.status(201).json({
    message: "User registered successfully",
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
  });
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || email.trim() === "") {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  if (!password || password.trim() === "") {
    return res.status(400).json({
      message: "Password is required",
    });
  }

  const user = userModel.getUserByEmail(email);

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.status(200).json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
}

module.exports = {
  register,
  login,
  JWT_SECRET,
};