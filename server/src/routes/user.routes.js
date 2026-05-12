import { Router } from "express";
import { getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser } from "../controller/user.controller.js";
import { upload } from "../middleware/multer.middleware.js"; 
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router()
router.post('/register', upload.fields([{
    name: "avatar",
    maxCount: 1
}]), registerUser)

router.post("/login" , loginUser)
router.post("/logout" , verifyJWT, logoutUser)
router.post("/refresh-token" , refreshAccessToken)
router.get("/current-user", verifyJWT, getCurrentUser);
export const userRouter = router

