import { User } from "../models/index.model.js";
import bcrypt from "bcrypt";
import { createToken } from "../services/jwt.js";
import { connect } from "../services/mongodb.js";

connect();

const createUser = async (req, res) => {
  let params = req.body;

  try {
    if (
      params.name,
      params.lastname,
      params.username,
      params.role,
      params.password,
      params.email
    ){
      let validateUnique = await User.findOne({ $or:[
        { username: params.username.toLowerCase() },
        { email: params.email.toLowerCase() }
      ]});

      if (validateUnique) {
        return res.status(400).json({
          status: "error",
          message: "Username or email already exists",
        });
      }
    }else{
      return res.status(400).json({
        status: "bad request",
        message: "Missing required fields",
      });
    }
    
    const newUser = new User(params);
    newUser.password = await bcrypt.hash(params.password, 10);

    await newUser.save();

    if (!newUser._id) {
      return res.status(400).json({
        status: "error",
        message: "Error creating user",
      });
    }
    
    return res.status(201).json({
      status: "ok",
      message: "User created successfully",
      data: {
        id: newUser._id,
        name: newUser.name,
        lastname: newUser.lastname,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status,
        createdAt: newUser.createdAt,
        avatar: newUser.avatar,
      },
    });
  }
  catch (error) {
    res.status(500).json({
        status: "error",
        message: "Something went wrong creating the user",
    });
  }
}

const validateUser = async (req, res) => {
  let params = req.body;

  if(!params.email || !params.password){
    return res.status(400).json({
      status: "bad request",
      message: "Missing required fields",
    });
  }

  let user = await User.findOne({$or: [
    { email: params.email.toLowerCase() },
    { username: params.email.toLowerCase() },
  ]});

  if (!user) {
    return res.status(404).json({
      status: "not found",
      message: "User not found",
    });
  }

  let validatePassword = await bcrypt.compare(params.password, user.password);

  if (!validatePassword) {
    return res.status(403).json({
      status: "unauthorized",
      message: "Invalid password",
    });
  }

  const token = createToken(user);

  return res.status(200).json({
    status: "ok",
    message: "User logged in successfully",
    user: {
      id: user._id,
      name: user.name,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt,
      avatar: user.avatar,
    },
    token: token,
  });
}

const updateUserData = async (req, res) => {
  let params = req.body;
  let userId = req.params.userId;

  try {
    if (
      params.name,
      params.lastname,
      params.username,
      params.role,
      params.email
    ){
      let validateUnique = await User.findOne({ $or:[
        { username: params.username.toLowerCase() },
        { email: params.email.toLowerCase() }
      ]});

      if (validateUnique) {
        return res.status(400).json({
          status: "error",
          message: "Username or email already exists",
        });
      }
    }else{
      return res.status(400).json({
        status: "bad request",
        message: "Missing required fields",
      });
    }

    
    const user = await User.findByIdAndUpdate(userId, params, {new: true});

    if (!user) {
      return res.status(404).json({
        status: "not found",
        message: "User not found",
      });
    }
    
    return res.status(201).json({
      status: "ok",
      message: "User updated successfully",
      data: {
        id: user._id,
        name: user.name,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
        avatar: user.avatar,
      },
    });
  }
  catch (error) {
    res.status(500).json({
        status: "error",
        message: "Something went wrong updating the user",
    });
  }
}

export { createUser, validateUser, updateUserData };