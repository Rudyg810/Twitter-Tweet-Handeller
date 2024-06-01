const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel")

const auth = {};

// Controller to get all users with role 0
auth.getAll = async (req, res) => {
  try {
      const all = await User.find({});
      res.json(all);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
  }
}


auth.registerUser = async (req, res) => {
    try {
        const { email, password, twitterId } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        let user = await User.findOne({ email });
        if (user) {
            console.log("User already exists:", user);
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ email, password: hashedPassword, twitterId });
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        console.log("New user registered:", user);
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

auth.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log("Invalid credentials");
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        console.log("User logged in:", user);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
auth.updateUserInfo = async (req, res) => {
  try {
      const userId = req.params.userId; // Assuming userId is passed in the URL parameters
      const { twitterId } = req.body;
      console.log(req.body)

      if (!userId) {
          return res.status(400).json({ message: "User ID is required" });
      }

      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Update user with new Twitter details
      user.twitterId = twitterId;
      await user.save();

      console.log("User information updated successfully");
      res.json({ message: "User information updated successfully" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
  }
};

auth.getUserInfo = async (req, res) => {
    try {
        const {userId} = req.params;
        const user = await User.findById(userId);
        if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: "User not found" });
        }
        console.log("User info retrieved:", user);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

auth.checkVerify = async (req,res) =>{
    try{
        const {userId} = req.params;
        const user = await User.findById(userId);
        console.log(user)
        res.json(user.verfied)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

auth.deleteUser = async (req, res) => {
    try {
        const id = req.params.userId;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: "User not found" });
        }
        console.log("User deleted successfully:", user);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = auth;
