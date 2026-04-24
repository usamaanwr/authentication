import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { userRegisterValidation } from "../validator/user.validator.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
// import { options } from "joi";

const genrateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken =  user.generateAccessToken();
    const refreshToken =  user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  //validation-not empty
  //check if user already exists: username, email
  // check for images , check for avatar
  // upload them to cloudinary , avator
  // create user object-create entry in db
  // remove password and refresh token field form response
  // check for user creation
  // return res

  const { error } = userRegisterValidation(req.body);
  if (error) {
    throw new ApiError(400, error.details[0].message);
  }

  const { fullName, email, password } = req.body;
  console.log(req.body);

  if ([fullName, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = await User.findOne({
    $or: [{ email }, { fullName }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or fullName already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath, "users_avatars");

  if (!avatar) {
    throw new ApiError(400, "Avatar upload failed on Cloudinary");
  }

  const user = await User.create({
    fullName,
    email,
    password,
    avatar: avatar.url,
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "User registration failed");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered succesfully"));
});

//login user

const loginUser = asyncHandler(async (req, res) => {
  //req body -> data
  //username or email
  //find the user
  // password check
  // access and refresh token
  // send cookie

  const { email, password, fullName } = req.body;
console.log(req.body);

  if (!email && !fullName) {
    throw new ApiError(400, "email or fullname is required!!");
  }
  const user = await User.findOne({
    $or:[{email},{fullName}]
  })
if (!user) {
    throw new ApiError(400, "user does not exist");
}
const isPasswordValid = await user.isPasswordCorrect(password)
if (!isPasswordValid) {
    throw new ApiError(401, "Inavlid User credentials");
}

const { accessToken , refreshToken} = await genrateAccessAndRefreshToken(user._id)
const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

const options = {
    httpOnly:true,
    secure:true
}
return res.status(200).cookie("accessToken" , accessToken , options).cookie("refreshToken" , refreshToken , options).json(
  new ApiResponse(
    200, {user: loggedInUser , accessToken , refreshToken},"user logged in sucessFully"
  )
)
});

//logout user 

const logoutUser = asyncHandler(async(req , res)=>{
  await User.findByIdAndUpdate(
    req.user._id,{
      $unset:{
        refreshToken: 1
      }
    },{new: true}
  )
  const options={
    httpOnly:true,
    secure:true
  }
  return res
  .status(200)
  .clearCookie('accessToken', options)
  .clearCookie("refreshToken" , options)
  .json(
    new ApiResponse(
      200, {}, "User logged out succesFully"
    )
  )
})

//verfiy token
const refreshAccessToken = asyncHandler(async (req , res)=>{

  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
  if (!incomingRefreshToken) {
    throw new ApiError(402 , "Unauthoried request")
  } 
  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken , 
      process.env.REFRESH_TOKEN_SECRET
    )

    const user = await User.findById(decodedToken?._id)
    if (!user) {
      throw new ApiError(401 , "Inavlid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(402 , "Refresh token is expired or used");      
    }
    const options ={
      httpOnly: true,
      secure: true
    }

    const { accessToken , refreshAccessToken :newRefreshToken } = await genrateAccessAndRefreshToken(user._id)

    return res.status(200)
    .cookie("accessToken", accessToken , options)
    .cookie("refreshToken" , newRefreshToken , options)
    .json(
      new ApiResponse(
        200,{accessToken , refreshToken: newRefreshToken},
        "Access token refreshed"
      )
    )
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }

})
export { registerUser , loginUser , logoutUser  , refreshAccessToken};
