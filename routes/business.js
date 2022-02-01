import express from "express";

const router = express.Router();

// middleware
// import { isCreator, requireSignin } from "../middlewares";

// controllers
import { createContent, uploadImage } from "../controllers/business";

// image upload
router.post("/business/upload-image", uploadImage);

router.post("/business", createContent);

module.exports = router;
