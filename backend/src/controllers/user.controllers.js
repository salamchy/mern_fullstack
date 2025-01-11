import { UserModel } from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Controller for user registration
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Validate if all required fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if a user already exists with the provided email
    const userExist = await UserModel.findOne({ email });

    if (userExist) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password using bcrypt before saving it to the database
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = await UserModel.create({
      username,
      email,
      password: hashPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with a success message
    return res.status(201).json({
      success: true,
      message: "Successfully Registered!!!",
    });
  } catch (error) {
    console.log(error); // Log the error for debugging
    return res.status(500).json({ error: "Internal Server Error" }); // Respond with a server error
  }
};

// Controller for user login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required!" });
    }

    // Check if the user exists in the database
    const userExist = await UserModel.findOne({ email }).select("+password");

    if (!userExist) {
      return res.status(400).json({
        success: false,
        message: "User does not exist!!!",
      });
    }

    // Compare the provided password with the hashed password stored in the database
    const hash = bcrypt.compareSync(password, userExist.password);

    if (!hash) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign(
      {
        id: userExist._id, // Use the existing user's ID
        username: userExist.username, // Include the username in the token
        email: userExist.email, // Include the email in the token
        role: userExist.role, // Include the role in the token
      },
      process.env.JWT_SECRET, // Secret key for signing the token
      { expiresIn: "1h" } // Token expiration time
    );

    //set the token as an HTTP-Only Cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true, //development
      sameSite: "strict", //prevent from CSRF
      maxAge: 60 * 60 * 1000, //1hour
    });

    // Respond with a success message and the generated token
    return res.status(200).json({
      success: true,
      message: "Login Successfully!!!",
      token,
      userExist: {
        _id: userExist._id,
        email: userExist.email,
        username: userExist.username,
        role: userExist.role,
        profileImage: userExist.profileImage,
        bio: userExist.bio,
        profession: userExist.profession,
      },
    });
  } catch (error) {
    console.log(error); // Log the error for debugging
    return res.status(500).json({ error: "Internal Server Error" }); // Respond with a server error
  }
};

//logout controller
export const logoutUser = (req, res) => {
  res.clearCookie("authToken");
  res.status(200).send({
    message: "Logged out successfully",
  });
};

//delete user controller
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).send({
        message: "User not found.",
      });
    }
    res.status(200).send({ message: "User deleted successfully." });
  } catch (error) {
    console.log(error); // Log the error for debugging
    return res.status(500).json({ error: "Internal Server Error" }); // Respond with a server error
  }
};

//get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}, "id email role").sort({
      createdAt: -1,
    });

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).send(users);
  } catch (error) {
    console.error("Error fetching users:", error.message); // Log the error for debugging
    return res.status(500).json({ error: "Internal Server Error" }); // Respond with a server error
  }
};

//update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const user = await UserModel.findByIdAndUpdate(id, { role }, { new: true });

    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }

    res.status(200).send({ message: "User role updated successfully." });
  } catch (error) {
    console.error("Error fetching users:", error.message); // Log the error for debugging
    return res.status(500).json({ error: "Internal Server Error" }); // Respond with a server error
  }
};

//edit or update profile
export const updateProfile = async (req, res) => {
  try {
    const { userId, username, profileImage, bio, profession } = req.body;

    if (!userId) {
      return res.status(400).send({
        message: "User Id is required.",
      });
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User doesnot found.",
      });
    }
    // Update user fields
    user.username = username || user.username;
    user.profileImage = profileImage || user.profileImage;
    user.bio = bio || user.bio;
    user.profession = profession || user.profession;

    // Save the updated user
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        userId: user._id,
        username: user.username,
        profileImage: user.profileImage,
        bio: user.bio,
        profession: user.profession,
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error.message); // Log the error for debugging
    return res.status(500).json({ error: "Internal Server Error" }); // Respond with a server error
  }
};
