import User from "../model/userModel.js";

export const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const { email } = newUser;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ errorMessage: "User already exist" });
    }
    const savedData = await newUser.save();
    // res.status(200).json(savedData);
    res.status(200).json({message:"User created succesfully"});
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData || userData.length === 0) {
      return res.status(404).json({ errorMessage: "No User Found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getAllUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ errorMessage: "User not found" });
    }
    res.status(200).json(userExist);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ errorMessage: "User not found" });
    }
    const updateData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "User updated successfully", updateData });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ errorMessage: "User not found" });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User Deleted successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
