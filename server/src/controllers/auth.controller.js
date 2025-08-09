import User from "../models/user.model.js";
import { validateSignupData } from "../utils/validation.js";
import bcrypt from "bcrypt"
import validator from "validator"

// export const signUp = async (req, res) => {
//     try {
//         validateSignupData(req);

//         const { firstName, lastName, email, password } = req.body;
//         const passwordHash = await bcrypt.hash(password, 10);

//         const user = new User({ firstName, lastName, email, password: passwordHash });

//         const saveUser = await user.save();

//         const token = await saveUser.getJWT();

//         res.cookie("token", token, {
//             httpOnly: true,
//             secure: false, // set true in production
//             sameSite: "lax",
//             expires: new Date(Date.now() + 8 * 3600000),
//         });


//         return res.status(201).json({ message: "User created successfully", data: saveUser });

//     } catch (error) {
//         return res.status(400).json({ error: "Error in creating the user: " + error.message });
//     }
// };


export const signUp = async (req, res) => {
  try {
    validateSignupData(req);

    const { firstName, lastName, email, password } = req.body;

    const user = new User({ firstName, lastName, email, password });

    const saveUser = await user.save();
    const token = await saveUser.getJWT();

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      expires: new Date(Date.now() + 8 * 3600000),
    });

    return res.status(201).json({
      message: "User created successfully",
      data: saveUser,
    });
  } catch (error) {
    return res.status(400).json({ error: "Error in creating the user: " + error.message });
  }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: "Email is not valid" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        const isPasswordValid = await user.validatePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        const token = await user.getJWT();

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // set true in production
            sameSite: "lax",
            expires: new Date(Date.now() + 8 * 3600000),
        });


        return res.json({
            message: "Logged in Successfully",
            user,
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


export const logout = async (req, res) => {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.send("Logged Out Successfully")
}


// GET /auth/me
export const getLoggedInUser = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        // Remove sensitive data
        const { password, ...safeUser } = user.toObject();

        res.status(200).json({ user: safeUser });
    } catch (error) {
        res.status(500).json({ error: "Server error: " + error.message });
    }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


export const updateProfile = async (req, res) => {
  const { firstName, lastName, email } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


export const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Current password is incorrect" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.avatar = req.body.style || "micah";
    await user.save();

    res.json({
      message: "Avatar updated successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar, // ✅ return updated avatar
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
