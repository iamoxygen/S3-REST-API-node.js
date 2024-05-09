const awsS3Client = require("../config/aws");
const { ListBucketsCommand } = require("@aws-sdk/client-s3");
const { paginate } = require("../utils/useFun");

// listing bucket function
exports.listBucket = async (req, res) => {
  try {
    const page = parseInt(req?.query?.page ?? 1);
    const limit = parseInt(req?.query?.limit ?? 10);
    // const input = {};
    const command = new ListBucketsCommand();
    const response = await awsS3Client.send(command);

    const bucketList = response?.Buckets ?? [];

    const paginatedData = paginate(bucketList, page, limit);

    res.send({ count: bucketList?.length, data: paginatedData });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "internal server error" });
  }
};
