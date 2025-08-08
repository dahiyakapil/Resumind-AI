import express from "express"
import { getLoggedInUser, login, logout, signUp, updateAvatar, updatePassword, updateProfile } from "../controllers/auth.controller.js";
import { userAuth } from "../middlewares/auth.middleware.js";
import passport from "passport";

const authRouter = express.Router();


authRouter.post("/signup", signUp)


authRouter.post("/login", login)

authRouter.post("/logout", logout)

authRouter.get("/me", userAuth, getLoggedInUser);

authRouter.put("/update-profile", userAuth,  updateProfile)

authRouter.put("/update-password", userAuth, updatePassword)

authRouter.put("/update-avatar", userAuth, updateAvatar);




// Google
// authRouter.get("/oauth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// authRouter.get(
//     "/oauth/google/callback",
//     passport.authenticate("google", { failureRedirect: "/auth", session: true }),
//     (req, res) => {
//         res.redirect(`${process.env.CLIENT_URL}/oauth-redirect`);
//     }
// );


// GitHub
// authRouter.get("/oauth/github", passport.authenticate("github", { scope: ["user:email"] }));

// authRouter.get(
//     "/oauth/github/callback",
//     passport.authenticate("github", { failureRedirect: "/auth", session: true }),
//     (req, res) => {
//         res.redirect(`${process.env.CLIENT_URL}/oauth-redirect`);
//     }
// );


export default authRouter;