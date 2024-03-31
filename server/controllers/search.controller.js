const Donation = require("../models/donation.model");
const { Fundraiser } = require("../models/user.model");

const getAllDonor = async (req, res) => {
  try {
    const pipeline = [
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $match: {
          $or: [],
        },
      },
      {
        $project: {
          _id: 1,
          "user.avatar": 1,
          groupName: 1,
          type: 1,
        },
      },
    ];
    if (req.query.type) {
      pipeline[1].$match.$or.push({
        type: { $regex: new RegExp(req.query.type, "i") },
      });
    }
    if (req.query.q) {
      pipeline[1].$match.$or.push({
        groupName: { $regex: new RegExp(req.query.q, "i") },
      });
    }
    const members = await Fundraiser.aggregate(pipeline);
    res.status(200).json({ members });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};
const getDonorOfArticle = async (req, res) => {
  try {
    const { articleId } = req.body;
    let donation;
    // neu co name thi tra ve name
    if (req.query.name) {
      donation = await Donation.find({ articleId: articleId })
        .populate("users", "username")
        .lean();

      donation = donation.filter((donation) =>
        donation.users.username.includes(req.query.name)
      );
    } else {
      // neu khong co thi tra ve tat ca
      donation = await Donation.find({ articleId: articleId }).populate(
        "users",
        "username"
      );
    }
    // neu co skip va limit thi tra ve nhu vay
    if (req.query.skip) {
      donation = donation.slice(parseInt(req.query.skip));
    }
    if (req.query.limit) {
      donation = donation.slice(0, parseInt(req.query.limit));
    }
    const totalCount = donation.length;
    res.status(200).json({ totalCount, donation });
  } catch (error) {
    res.status(500).json({ message: "Internal error" });
  }
};

module.exports = {
  getAllDonor,
  getDonorOfArticle,
};
