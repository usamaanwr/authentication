import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controller/user.controller.js";
import { upload } from "../middleware/multer.middleware.js"; 
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router()
router.post('/register', upload.fields([{
    name: "avatar",
    maxCount: 1
}]), registerUser)

router.post("/login" , loginUser)
router.post("/logout" , verifyJWT, logoutUser)
export const userRouter = router

