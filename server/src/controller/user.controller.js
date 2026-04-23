import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import { userRegisterValidation } from "../validator/user.validator.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";

const genrateAccessAndRefreshToken = async(userId)=>{
    try {
        const user = await User.findById(userId)
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefrshToken()

        user.refreshToken  = refreshToken
        await user.save({validateBeforeSave : false})
        return { accessToken , refreshToken }
    } catch (error) {
        throw new ApiError( 500 , "Something went wrong while generating referesh and access token");
        
    }
}

const registerUser = asyncHandler(async (req , res)=>{
 //get user details from frontend
    //validation-not empty 
    //check if user already exists: username, email 
    // check for images , check for avatar
    // upload them to cloudinary , avator
    // create user object-create entry in db 
    // remove password and refresh token field form response 
    // check for user creation 
    // return res

   
        const {error} = userRegisterValidation(req.body);
        if (error) {
           throw new ApiError( 400 , error.details[0].message);
        }

        const {fullName , email , password }= req.body
console.log(req.body);

        if ([fullName , email , password  ].some((field)=> field?.trim() === "")) {
            throw new ApiError( 400 , "All fields are required");
        }
        const existedUser = await User.findOne({
            $or:[{email},{fullName}]
        })

        if (existedUser) {
            throw new ApiError(409 , "User with email or fullName already exists");            
        }

        const avatarLocalPath = req.files?.avatar[0]?.path

        if (!avatarLocalPath) {
             throw new ApiError(400 , "Avatar file is required")
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath, "users_avatars")

        if (!avatar) {
            throw new ApiError(400 , "Avatar upload failed on Cloudinary");
        }

        const user = await User.create({
            fullName,
            email,
            password,
            avatar: avatar.url
        })
const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
)
        if (!createdUser) {
            throw new ApiError(500 , "User registration failed");
        }
  return res.status(201).json(
    new ApiResponse(201 , createdUser , "User registered succesfully")
  )
})

export { registerUser }