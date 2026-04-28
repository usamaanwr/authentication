import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({ storage });
// import path from "path"
// const storage = multer.memoryStorage({
//     destination: function(req , file , cb){
//         cb(null, path.join(process.cwd(), "public/temp"))
//     },
//     filename: function(req , file , cb){
//         cb(null , file.originalname)
//     }
// })

// export const upload = multer({storage: multer.memoryStorage()})