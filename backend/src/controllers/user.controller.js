import User from "../models/User.js";

export async function getUsers(req, res) {
  try {
    const users = await User.find();

    res.status(200).send(users);
  } catch (error) {
    console.error("Error in getUsers Controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateUser(req, res) {
  try {
    const { fullName, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { fullName, email },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    // Return the updated user document
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Update Profile Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteUser(req, res) {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error while deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
