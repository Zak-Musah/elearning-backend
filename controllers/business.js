import AWS from "aws-sdk";
import { nanoid } from "nanoid";
import Business from "../models/business";
import slugify from "slugify";
const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const S3 = new AWS.S3(awsConfig);

export const uploadImage = async (req, res) => {
  // console.log(req.body);
  try {
    const { image } = req.body;
    if (!image) return res.status(400).send("No image");

    // prepare the image
    const base64Data = new Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ""),
      "base64",
    );

    const type = image.split(";")[0].split("/")[1];

    // image params
    const params = {
      Bucket: "se-hub-1",
      Key: `${nanoid()}.${type}`,
      Body: base64Data,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: `image/${type}`,
    };

    // upload to s3
    S3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        return res.sendStatus(400);
      }
      console.log(data);
      res.send(data);
    });
  } catch (err) {
    console.log(err);
  }
};

export const createContent = async (req, res) => {
  console.log(req);
  try {
    const alreadyExist = await Business.findOne({
      slug: slugify(req.body.name.toLowerCase()),
    });
    if (alreadyExist) return res.status(400).send("Name is taken");

    // const business = await new Business({
    //   slug: slugify(req.body.name),
    //   creator: req.user._id,
    //   ...req.body,
    // }).save();

    // res.json(business);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Business data creation failed. Try again.");
  }
};
