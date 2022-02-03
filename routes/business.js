import express from "express";

const router = express.Router();

// middleware
// import { isCreator, requireSignin } from "../middlewares";

// controllers
import {
  createContent,
  uploadImage,
  getBusinessInfo,
} from "../controllers/business";

// image upload
router.post("/business/upload-image", uploadImage);

router.get("/business-info", getBusinessInfo);
router.post("/business", createContent);

module.exports = router;
