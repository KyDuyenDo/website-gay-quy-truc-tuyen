const Admin = require("../models/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminToken = require("../models/token.admin.model");
const User = require("../models/user.model");
const Article = require("../models/article.model");
const Notify = require("../models/notify.model");
const Fundraiser = require("../models/fundraiser.model");
const Disbursement = require("../models/disbursement");
const Donation = require("../models/donation.model");
const Comment = require("../models/commentAndEvaluation.model");
const MongoDB = require("../utils/mongodb.util");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await Admin.findOne({
      username,
    });
    if (!existingUser) {
      return res.status(404).json({
        message: "Invalid credentials",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    const payload = {
      id: existingUser._id,
      username: existingUser.username,
    };

    const accessToken = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "6h",
    });

    const newAdminToken = new AdminToken({
      user: existingUser._id,
      accessToken,
    });

    await newAdminToken.save();

    res.status(200).json({
      accessToken,
      accessTokenUpdatedAt: new Date().toLocaleString(),
      user: {
        _id: existingUser._id,
        username: existingUser.username,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const confirmArticle = async (req, res) => {
  const { articleId } = req.body;
  try {
    const article = await Article.findById(articleId);
    article.adminApproval = true;
    article.published = true;
    article.releaseDate = new Date();
    article.save();
    res.status(200).json({ message: "Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteArticle = async (req, res) => {
  const { articleId } = req.body;
  try {
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Not Found" });
    }
    // xoa anh
    const images = article.image.map((i) => {
      const urlParts = i.split("/");
      return urlParts[urlParts.length - 1];
    });
    const bucket = MongoDB.bucket("article");
    images.forEach(async (image) => {
      const file = await bucket
        .find({
          filename: image,
        })
        .toArray();
      const objectId = new ObjectId(file[0]._id);
      await bucket.delete(objectId);
    });
    // xoa bai
    await Article.findByIdAndDelete(articleId);
    return res.status(200).json({ message: "Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const removePublishedArticle = async (req, res) => {
  const { articleId } = req.body;
  try {
    const article = await Article.findById(articleId);
    article.published = false;
    article.save();
    res.status(200).json({ message: "successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const puslishArticle = async (req, res) => {
  const { articleId } = req.body;
  try {
    const article = await Article.findById(articleId);
    article.published = true;
    article.save();
    res.status(200).json({ message: "successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const sendNotify = async (req, res) => {
  const { userId, message, state } = req.body;
  try {
    const notify = new Notify({
      userId: userId,
      message: message,
      state: state,
    });
    notify.save();
    res.status(200).json({ message: "Not fund" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const blockUser = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    user.state = "block";
    user.save();
    res.status.json({ message: "Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const OpenBlock = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    user.state = "active";
    user.save();
    res.status.json({ message: "Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const acceptFundraiser = async (req, res) => {
  const { userId } = req.body;
  try {
    const fund = await Fundraiser.findById(userId);
    fund.adminApproval = true;
    fund.approvaldate = new Date();
    fund.save();
    res.status(200).json({ message: "successfully" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
const rejectFundraiser = async (req, res) => {
  const { userId } = req.body;
  try {
    const fund = await Fundraiser.findById(userId);
    // xoa anh đại diện
    const urlParts = fund.identificationImage.split("/");
    const bucket = MongoDB.bucket("identifyAvatar");
    const bucket_card = MongoDB.bucket("identifyCard");
    const file = await bucket
      .find({
        filename: urlParts[urlParts.length - 1],
      })
      .toArray();
    const objectId = new ObjectId(file[0]._id);
    await bucket.delete(objectId);
    // xoa anh dinh danh
    fund.identificationCard.forEach(async (img) => {
      const urlParts_card = img.split("/");
      const file_card = await bucket_card
        .find({
          filename: urlParts_card[urlParts_card.length - 1],
        })
        .toArray();
      const objectId_card = new ObjectId(file_card[0]._id);
      await bucket_card.delete(objectId_card);
    });
    // xoa yeu cau
    await Fundraiser.findByIdAndDelete(userId);
    res.status(200).json({ message: "successfully" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const totalData = async (req, res) => {
  // tổng số dự án
  const articles = await Article.find({ adminApproval: true })
    .populate("activities")
    .lean();
  // tổng số tiền thu được
  const totalPrice = articles.reduce(
    (acc, article) => acc + article.amountEarned,
    0
  );
  // tổng số tiền tiêu
  let totalSpent = articles?.activities?.reduce(
    (acc, activity) => acc + activity.amountSpent,
    0
  );
  if (totalSpent === undefined) {
    totalSpent = 0;
  }
  // member
  const totalMember = await Fundraiser.find({ adminApproval: true });
  // users
  const totalUser = await User.find({});
  // yêu cầu đăng ký thành viên
  const totalRequestMember = await Fundraiser.find({ adminApproval: false });
  // yêu cầu đăng ký bài báo
  const totalRequestArticle = await Article.find({ adminApproval: false });

  res.status(200).json({
    totalArticle: articles.length,
    totalPrice: totalPrice,
    totalSpent: totalSpent,
    totalMember: totalMember.length,
    totalUser: totalUser.length,
    totalRequestMember: totalRequestMember.length,
    totalRequestArticle: totalRequestArticle.length,
  });
};

const disbursement = async (req, res) => {
  try {
    const aggregationPipeline = [
      {
        $lookup: {
          from: "disbursements",
          localField: "disbursements",
          foreignField: "_id",
          as: "disbursements",
        },
      },
      {
        $project: {
          _id: 1,
          image: 1,
          articletitle: 1,
          amountEarned: 1,
          releaseDate: 1,
          expireDate: 1,
          disbursements: 1,
          daysPassed: {
            $cond: {
              if: { $eq: ["$releaseDate", null] },
              then: null,
              else: {
                $round: [
                  {
                    $divide: [
                      { $subtract: [new Date(), "$releaseDate"] },
                      86400000,
                    ],
                  },
                  0,
                ],
              },
            },
          },
        },
      },
      {
        $match: {
          $expr: {
            $or: [
              {
                $and: [
                  {
                    $and: [
                      {
                        $gte: [
                          "$daysPassed",
                          { $multiply: ["$expireDate", 0.3] },
                        ],
                      },
                      {
                        $gt: [
                          { $multiply: ["$expireDate", 0.5] },
                          "$daysPassed",
                        ],
                      },
                    ],
                  },
                  { $eq: [{ $size: "$disbursements" }, 0] },
                ],
              },
              {
                $and: [
                  {
                    $and: [
                      {
                        $gte: [
                          "$daysPassed",
                          { $multiply: ["$expireDate", 0.5] },
                        ],
                      },
                      {
                        $gt: ["$expireDate", "$daysPassed"],
                      },
                    ],
                  },
                  { $eq: [{ $size: "$disbursements" }, 1] },
                ],
              },
              {
                $and: [
                  { $eq: ["$daysPassed", "$expireDate"] },
                  { $eq: [{ $size: "$disbursements" }, 2] },
                ],
              },
            ],
          },
        },
      },
    ];
    const articles = await Article.aggregate(aggregationPipeline);

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const createDisbursement = async (req, res) => {
  const { articleId, amountDisburse, step } = req.body;
  try {
    const disbursement = await new Disbursement({
      articleId: articleId,
      amountDisburse: amountDisburse,
      step: step,
    });
    disbursement.save();
    await Article.findOneAndUpdate(
      {
        _id: { $eq: articleId },
      },
      {
        $addToSet: {
          disbursements: disbursement._id,
        },
      }
    );
    res.status(200).json(disbursement);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const disbursementByArticle = async (req, res) => {
  const articleId = req.params.id;
  try {
    const disbursement = await Disbursement.find({ articleId: articleId });
    if (!disbursement) {
      return res.status(404).json({ message: "Not Found" });
    }
    res.status(200).json(disbursement);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const getDetailFundraiserAdmin = async (req, res) => {
  try {
    const user = await Fundraiser.findOne({ userId: req.body.userId })
      .populate(
        "userId",
        "email username joindate youtubeUrl facebookUrl tiktokUrl avatar"
      )
      .lean();
    if (!user) {
      return res.status(404).json({ message: "Not Found" });
    }
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

const returnRequestMember = async (req, res) => {
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
          $and: [{ adminApproval: false }],
        },
      },
      {
        $project: {
          _id: 1,
          userId: 1,
          "user.avatar": 1,
          "user.username": 1,
          groupName: 1,
          type: 1,
          approvaldate: 1,
          createdAt: 1,
        },
      },
    ];
    const members = await Fundraiser.aggregate(pipeline);
    res.status(200).json(members);
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

const getAllFund = async (req, res) => {
  let pipeline;
  try {
    if (req.query.id && mongoose.Types.ObjectId.isValid(req.query.id)) {
      pipeline = [
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
            $and: [
              { adminApproval: true }, // Ensure this condition applies
              { userId: new ObjectId(req.query.id) }, // Use ObjectId type for req.query.id
            ],
          },
        },
        {
          $project: {
            _id: 1,
            userId: 1,
            "user.avatar": 1,
            "user.username": 1,
            groupName: 1,
            type: 1,
            approvaldate: 1,
            createdAt: 1,
          },
        },
      ];
    } else {
      pipeline = [
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
            $and: [{ adminApproval: true }],
          },
        },
        {
          $project: {
            _id: 1,
            userId: 1,
            "user.avatar": 1,
            "user.username": 1,
            groupName: 1,
            type: 1,
            approvaldate: 1,
            createdAt: 1,
          },
        },
      ];
    }
    const members = await Fundraiser.aggregate(pipeline);
    res.status(200).json(members);
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

const returnRequestArticle = async (req, res) => {
  try {
    const pipeline = [
      {
        $lookup: {
          from: "categories",
          localField: "categotyId",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $lookup: {
          from: "addresses",
          localField: "addressId",
          foreignField: "_id",
          as: "address",
        },
      },
      {
        $lookup: {
          from: "fundraisers",
          localField: "userId",
          foreignField: "userId",
          as: "fundraisers",
        },
      },
      {
        $match: {
          $and: [{ published: false }, { adminApproval: false }],
        },
      },
      {
        $project: {
          _id: 1,
          category: 1,
          addedBy: 1,
          createdAt: 1,
          articletitle: 1,
          address: 1,
          image: 1,
          state: 1,
          expireDate: 1,
          releaseDate: 1,
          amountRaised: 1,
          amountEarned: 1,
          groupName: { $arrayElemAt: ["$fundraisers.groupName", 0] },
          type: { $arrayElemAt: ["$fundraisers.type", 0] },
        },
      },
    ];
    const article = await Article.aggregate(pipeline);
    res.status(200).json(article);
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

const getArticlesByAdmin = async (req, res) => {
  try {
    let articles;
    if (req.query.state) {
      if (req.query.state === "fundraising") {
        articles = await Article.find({
          adminApproval: true,
          $expr: {
            $lte: [
              {
                $divide: [
                  { $subtract: [new Date(), "$releaseDate"] },
                  86400000,
                ],
              },
              "$expireDate",
            ],
          }, // còn hạn
        });
      } else if (req.query.state === "finished") {
        articles = await Article.find({
          adminApproval: true,
          $expr: {
            $gt: [
              {
                $divide: [
                  { $subtract: [new Date(), "$releaseDate"] },
                  86400000,
                ],
              }, // Chuyển từ mili giây sang số ngày
              "$expireDate",
            ],
          },
        });
      }
    } else if (req.query.q && mongoose.Types.ObjectId.isValid(req.query.q)) {
      articles = await Article.find({
        adminApproval: true,
        _id: req.query.q,
      });
    } else if (req.query.q) {
      articles = await Article.find({
        adminApproval: true,
        articletitle: { $regex: new RegExp(req.query.q, "i") },
      });
    } else {
      articles = await Article.find({ adminApproval: true });
    }
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    let user;
    if (req.query.id && mongoose.Types.ObjectId.isValid(req.query.id)) {
      user = await User.find({ _id: req.query.id }).select("-password").lean();
    } else {
      user = await User.find({}).select("-password").lean();
    }
    if (!user) {
      return res.status(404).json({ message: "Not Fund" });
    }
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

const getArticleByAdmin = async (req, res) => {
  try {
    const postId = req.params.id;
    const article = await Article.findById(postId)
      .populate("userId", "username avatar")
      .populate("addressId")
      .populate("categotyId")
      .populate("activities")
      .lean();
    if (!article) {
      return res.status(404).json({ message: "Not Fund" });
    }
    const fund = await Fundraiser.find({ userId: article.userId._id });
    if (!fund) {
      return res.status(404).json({ message: "Not Fund" });
    }
    article.fundraiser = fund;
    const donations = await Donation.find({
      articleId: postId,
    });
    const comments = await Comment.find({ articleId: postId });
    article.totalDonations = donations.length;
    const totalStars = comments.reduce(
      (acc, comment) => acc + comment.rating,
      0
    );
    article.averageRating = totalStars / comments.length;
    const totalSpend = article.activities?.reduce(
      (acc, activity) => acc + activity.amountSpent,
      0
    );
    article.totalSpend = totalSpend;
    article.totalComment = comments.length;
    res.status(200).json(article);
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

const getDetailUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
      .select("-password")
      .lean();
    if (!user) {
      return res.status(404).json({ message: "Not Found" });
    }
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

module.exports = {
  signin,
  confirmArticle,
  deleteArticle,
  removePublishedArticle,
  sendNotify,
  blockUser,
  OpenBlock,
  acceptFundraiser,
  rejectFundraiser,
  totalData,
  disbursement,
  disbursementByArticle,
  getDetailFundraiserAdmin,
  returnRequestMember,
  returnRequestArticle,
  getArticlesByAdmin,
  getAllUsers,
  getArticleByAdmin,
  puslishArticle,
  createDisbursement,
  getDetailUser,
  getAllFund,
};
