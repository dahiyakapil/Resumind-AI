// import mongoose from "mongoose"
// import validator from "validator"
// import bcrypt from "bcrypt"
// import jwt from "jsonwebtoken"

// const userSchema = new mongoose.Schema({
//     firstName: {
//         type: String,
//         required: [true, "First name is required"],
//         minLength: 3,
//         maxLength: 50,
//         trim: true
//     },
//     lastName: {
//         type: String,
//         trim: true
//     },
//     email: {
//         type: String,
//         unique: true,
//         trim: true,
//         lowercase: true,
//         required: [true, "Email is required"],
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error("Invalid Email address" + value)
//             }
//         }
//     },
//     oauthId: { type: String },
//     provider: { type: String }, // 'google' | 'github'

//     password: {
//         type: String,
//         required: [true, "Password is required"],
//         trim: true,
//         validate: {
//             validator: function (value) {
//                 return (
//                     value.length >= 8 &&
//                     /[A-Z]/.test(value) &&
//                     /[a-z]/.test(value) &&
//                     /[0-9]/.test(value) &&
//                     /[!@#$%^&*]/.test(value)
//                 );
//             },
//             message:
//                 "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
//         },
//     },
//     avatar: {
//         type: String,
//         default: "micah", // or any default avatar style
//     },


// }, { timestamps: true });


// userSchema.index({ firstName: 1, lastName: 1 });


// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });




// userSchema.methods.getJWT = async function () {
//     const user = this;
//     const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
//     return token;
// }

// userSchema.methods.validatePassword = async function (passwordInputByUser) {

//     const user = this;
//     const passwordHash = user.password;

//     const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);

//     return isPasswordValid;

// }

// export default mongoose.model("User", userSchema)




import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minLength: 3,
      maxLength: 50,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, "Email is required"],
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email address " + value);
        }
      },
    },
    oauthId: { type: String },
    provider: { type: String }, // 'google' | 'github'

    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      validate: {
        validator: function (value) {
          return (
            value.length >= 8 &&
            /[A-Z]/.test(value) &&
            /[a-z]/.test(value) &&
            /[0-9]/.test(value) &&
            /[!@#$%^&*]/.test(value)
          );
        },
        message:
          "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
      },
    },

    avatar: {
      type: String,
      default: "micah",
    },
  },
  { timestamps: true }
);

// 🔍 Index for faster search
userSchema.index({ firstName: 1, lastName: 1 });

// 🔐 Hash password only if it's modified
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔐 JWT Generator
userSchema.methods.getJWT = async function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// 🔐 Password Validator
userSchema.methods.validatePassword = async function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

// ✅ FINAL EXPORT with re-registration protection
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
