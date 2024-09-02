// import multer from "multer";
// import path from "path";

import multer from "multer";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "..", "/uploads"));
//   },
//   filename: function (req, file, cb) {
//     // if (file.filename.split(".")[1].match("")) {
//     // }
    
//     const uniqueSuffix = Date.now() + "-";
//     cb(null, uniqueSuffix + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// export default upload;


// // const multer = require("multer");
// // const upload = multer({
// //   storage: multer.diskStorage({
// //     destination: (req, file, cb) => {
// //       cb(null, "uploads/");
// //     },
// //     filename: (req, file, cb) => {
// //       cb(null, file.originalname);
// //     },
// //   }),
// //   fileFilter: (req, file, cb) => {
// //     if (file.mimetype.startsWith("image/")) {
// //       cb(null, true);
// //     } else {
// //       cb(new Error("Invalid file type"), false);
// //     }
// //   },
// // });

const storage = multer.memoryStorage();

export const upload = multer({ storage: storage })