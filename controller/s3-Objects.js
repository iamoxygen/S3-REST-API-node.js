const awsS3Client = require("../config/aws");
const {
  ListObjectsCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const { paginate } = require("../utils/useFun");
const { Readable } = require("stream");
const { writeFile, readFile } = require("fs").promises;
const path = require("path");

const Files = require("../model/files");

exports.uploadObject = async (req, res) => {
  try {
    const { bucketName } = req.query;

    if (!bucketName)
      return res.status(401).send({ message: "please provide bucket name" });

    if (!req?.file)
      res.status(401).send({ message: "please provide object to upload" });

    const { filename, path, mimetype } = req?.file;

    const input = {
      Bucket: bucketName,
      Key: filename,
      ACL: "public-read",
      Body: await readFile(path),
      ContentType: mimetype,
    };

    const command = new PutObjectCommand(input);
    const response = await awsS3Client.send(command);
    const data = {
      key: input?.Key,
      url: `https://${input?.Bucket}.s3.amazonaws.com/${input?.Key}`,
      name: filename,
      bucketName: input?.Bucket,
    };

    //saving in DB

    const savingInDb = await Files.create({
      ...data,
    });

    res.send({ data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "internal server error" });
  }
};

exports.getObject = async (req, res) => {
  try {
    const { bucketName, key, from } = req.query;

    if (from === "s3") {
      if (!bucketName)
        return res
          .status(400)
          .send({ message: "Please provide bucket name..." });
      if (!key)
        return res.status(400).send({ message: "Please provide Key..." });

      const input = { Bucket: bucketName, Key: key };
      const command = new GetObjectCommand(input);
      const response = await awsS3Client.send(command);

      // Converting object Body to readable stream
      const stream = Readable.from(response?.Body);

      // Write the object data to a file
      await writeFile(`files/${key}`, stream);

      //file path
      const filePath = path.join(__dirname, "..", "files", key);

      // Check if the file exists
      if (!filePath) {
        return res.status(400).send({ message: "File not found" });
      }

      // Send the file as a response
      res.sendFile(filePath);
    } else if (from === "db") {
      const files = await Files.findOne({
        $or: [{ bucketName }, { key }],
      }).exec();

      res.json(files);
    } else {
      res.status(400).send({
        message: "Not data found.. else might be select query from db/s3",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "internal server error" });
  }
};
exports.deleteObject = async (req, res) => {
  try {
    const { bucketName, Key } = req.query;

    if (!bucketName)
      return res.status(400).send({ message: "Please provide bucket name..." });
    if (!Key) return res.status(400).send({ message: "Please provide Key..." });

    const input = { Bucket: bucketName, Key };
    const command = new DeleteObjectCommand(input);
    const response = await awsS3Client.send(command);

    if (response?.DeleteMarker) {
      res.status(401).send({ message: "Object has been Successfully Delete" });
    } else {
      res.status(401).send({ message: "unable to delete object", response });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "internal server error" });
  }
};
exports.listObject = async (req, res) => {
  try {
    const { bucketName, from } = req.query;

    const page = parseInt(req?.query?.page ?? 1);
    const limit = parseInt(req?.query?.limit ?? 10);

    if (!bucketName)
      return res.status(400).send({ message: "Please provide bucket name.." });

    if (from === "s3") {
      const input = { Bucket: bucketName };
      const command = new ListObjectsCommand(input);
      const response = await awsS3Client.send(command);

      const objectList = response?.Contents ?? [];

      const paginatedData = paginate(objectList, page, limit);

      res.send({ count: objectList?.length, data: paginatedData });
    } else if (from === "db") {
      const files = await Files.find({ bucketName }).exec();

      const newArray = [...files]

      const startIndex = (page - 1) * limit;
      newArray.slice(startIndex, startIndex + limit);
 
      res.send({ count: files?.length, data: newArray });
    } else {
      res.status(400).send({
        message: "Not data found.. else might be select query from db/s3",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "internal server error" });
  }
};
