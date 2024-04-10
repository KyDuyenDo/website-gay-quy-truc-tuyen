const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
const moment = require("moment");

const Article = require("../models/article.model");
const User = require("../models/user.model");
const Address = require("../models/address.model");
const Comment = require("../models/commentAndEvaluation.model");
const Activity = require("../models/activity.model");
const Donation = require("../models/donation.model");
const Category = require("../models/category.model");
const Fundraiser = require("../models/fundraiser.model");
const formatCreatedAt = require("../utils/timeConverter");
const mongoose = require("mongoose");

const addArticle = async (req, res) => {
  try {
    const {
      title,
      category,
      body,
      expireDate,
      releaseDate,
      accountNumber,
      methodPayment,
      emailPayPal,
      amountRaised,
      city,
      county,
      detail,
      address,
      lat,
      lon,
      street,
      town,
      bankcode,
    } = req.body;
    const userId = req.userId;
    let add = null;
    const addressRelate = await Address.findOne({
      lat: lat,
      lon: lon,
    });
    const userAdd = await User.findOne({
      _id: { $eq: userId },
    });
    if (addressRelate === null) {
      add = await new Address({
        city: city,
        street: street,
        county: county,
        town: town,
        lat: lat,
        lon: lon,
        detail: detail,
      });
      add.save();
    } else {
      add = addressRelate;
    }
    const newArticle = new Article({
      userId: new mongoose.Types.ObjectId(userId),
      categotyId: new mongoose.Types.ObjectId(category),
      addressId: add._id,
      address: address,
      addedBy: userAdd.username,
      articletitle: title,
      body: body,
      state: "pending",
      expireDate: expireDate,
      releaseDate: null,
      accountNumber: accountNumber,
      emailPayPal: emailPayPal,
      methodPayment: methodPayment,
      bankcode: bankcode,
      adminApproval: false,
      published: false,
      amountRaised: amountRaised,
      amountEarned: "0",
    });

    await newArticle.save();
    return res.json(newArticle);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
const upLoadImage = async (req, res) => {
  const { articleId, imageURL1, imageURL2, imageURL3 } = req.body;
  const article = await Article.findOne({ _id: articleId });
  if (!article) {
    res.status(404).json({ message: "Not found" });
  }
  article.image = [imageURL1, imageURL2, imageURL3];
  article.save();
  res.status(200).json({ message: "successfully" });
  try {
  } catch (error) {
    res.status(500).json({
      message: "Error",
    });
  }
};
const confirmArticle = async (req, res) => {};

const rejectArticle = async (req, res) => {};

const findArticleById = async (postId) =>
  await Article.findOne({ _id: postId, published: true })
    .populate("userId", "username avatar")
    .populate("addressId")
    .populate("categotyId")
    .lean();

const findCommentsByArticleId = async (postId) =>
  await Comment.find({ articleId: postId })
    .sort({ createdAt: -1 })
    .populate("reviewerId", "username avatar")
    .lean();

const formatDocuments = (docs) =>
  docs.map((doc) => ({
    ...doc,
    createdAt: dayjs(doc.createdAt).fromNow(),
  }));

const formatDate = (docs) =>
  docs.map((doc) => ({
    ...doc._doc,
    donationDate: moment(doc.donationDate).format("DD-MM-YYYY-HH:mm"),
  }));

const findActivitiesByArticleId = async (postId) =>
  await Activity.find({ articleId: postId }).sort({ createdAt: -1 }).lean();

const getArticle = async (req, res) => {
  try {
    const postId = req.params.id;
    // tìm bài báo
    const post = await findArticleById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const imageObjects = post.image.map((imageUrl, index) => ({
      url: imageUrl,
      title: `Image ${index + 1}`,
    }));
    post.image = imageObjects;
    const fundraiser = await Fundraiser.aggregate([
      {
        $match: { userId: post.userId._id },
      },
    ]);
    post.groupName = fundraiser[0].groupName;
    // tìm tất cả các comment
    const comments = await findCommentsByArticleId(postId);
    post.comments = formatDocuments(comments);
    // tìm tất cả các hoạt động
    const activities = await findActivitiesByArticleId(postId);
    post.activities = formatDocuments(activities);

    const donations = await Donation.find({ articleId: post });
    post.totalDonations = donations.length;
    const donorMap = {};
    donations.forEach((donation) => {
      const donorId = donation.donorId;
      if (donorMap[donorId] !== undefined) {
        donorMap[donorId] = donorMap[donorId] + donation.donationAmount;
      } else {
        donorMap[donorId] = 0 + donation.donationAmount;
      }
    });
    const donorList = Object.entries(donorMap).map(
      ([donorId, totalDonations]) => ({
        donorId,
        totalDonations,
      })
    );
    donorList.sort((a, b) => b.totalDonations - a.totalDonations);
    const top4Donors = donorList.slice(0, Math.min(4, donorList.length));
    // trả về số sao đánh giá
    const totalStars = comments.reduce(
      (acc, comment) => acc + comment.rating,
      0
    );
    const topDonorsWithDetails = await Promise.all(
      top4Donors.map(async (donation) => {
        const userResponse = await Donation.find({ donorId: donation.donorId });
        return {
          donorId: donation.donorId,
          totalDonations: donation.totalDonations,
          username: userResponse[0].fullnameDonor,
          anonymous: userResponse[0].anonymous,
        };
      })
    );
    post.top4Donators = topDonorsWithDetails;
    // Tính trung bình số sao
    post.averageRating = totalStars / comments.length;
    res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({
      message: "Error getting post",
    });
  }
};

const getArticles = async (req, res) => {
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
          from: "fundraisers",
          localField: "userId",
          foreignField: "userId",
          as: "fundraisers",
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "comments",
          foreignField: "_id",
          as: "comments",
          pipeline: [
            {
              $group: {
                _id: null,
                averageRating: { $avg: "$rating" },
              },
            },
          ],
        },
      },
      {
        $match: {
          $and: [{ published: true }],
        },
      },
      {
        $project: {
          _id: 1,
          category: 1,
          addedBy: 1,
          createdAt: 1,
          articletitle: 1,
          image: 1,
          state: 1,
          expireDate: 1,
          releaseDate: 1,
          amountRaised: 1,
          amountEarned: 1,
          averageRating: { $arrayElemAt: ["$comments.averageRating", 0] },
          groupName: { $arrayElemAt: ["$fundraisers.groupName", 0] },
          type: { $arrayElemAt: ["$fundraisers.type", 0] },
        },
      },
    ];
    // bệnh%20nhân
    if (req.query.q) {
      pipeline[3].$match.$and.push({
        $or: [
          { articletitle: { $regex: new RegExp(req.query.q, "i") } },
          { body: { $regex: new RegExp(req.query.q, "i") } },
          { "category.title": { $regex: new RegExp(req.query.q, "i") } },
        ],
      });
    }
    if (req.query.category) {
      pipeline[3].$match.$and.push({
        "category.title": { $regex: new RegExp(req.query.category, "i") },
      });
    }
    const posts = await Article.aggregate(pipeline);
    let sortedPosts = posts;

    if (req.query.sort === "new") {
      sortedPosts.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
      });
    } else if (req.query.sort === "old") {
      sortedPosts.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateA - dateB;
      });
    }

    let limitedPosts = sortedPosts;

    if (req.query.limit && req.query.skip) {
      const skip = parseInt(req.query.skip);
      const limit = parseInt(req.query.limit);
      limitedPosts = sortedPosts.slice(skip, skip + limit);
    }
    const totalCount = limitedPosts.length;
    res.status(200).json({ limitedPosts, totalCount });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

const getArticleHighRating = async (req, res) => {
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
          from: "fundraisers",
          localField: "userId",
          foreignField: "userId",
          as: "fundraisers",
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "comments",
          foreignField: "_id",
          as: "comments",
          pipeline: [
            {
              $group: {
                _id: null,
                averageRating: { $avg: "$rating" },
              },
            },
          ],
        },
      },
      {
        $match: {
          $and: [{ published: true }],
        },
      },
      {
        $project: {
          _id: 1,
          category: 1,
          addedBy: 1,
          createdAt: 1,
          articletitle: 1,
          image: 1,
          state: 1,
          expireDate: 1,
          releaseDate: 1,
          amountRaised: 1,
          amountEarned: 1,
          averageRating: { $arrayElemAt: ["$comments.averageRating", 0] }, // Lấy giá trị rating đầu tiên
          groupName: { $arrayElemAt: ["$fundraisers.groupName", 0] },
          type: { $arrayElemAt: ["$fundraisers.type", 0] },
        },
      },
      {
        $sort: { averageRating: -1 }, // Sắp xếp theo averageRating (giảm dần)
      },
      {
        $limit: 4, // Giới hạn 4 kết quả đầu tiên
      },
    ];
    const posts = await Article.aggregate(pipeline);
    res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

const getArticleByUser = async (req, res) => {
  const userId = req.userId;
  try {
    let articles;
    if (req.query.state) {
      if (req.query.state === "fundraising") {
        articles = await Article.find({
          userId: userId, // của người dùng
          adminApproval: true, // đã đăng và chấp thuận bởi admin
          $expr: {
            $lte: [
              {
                $divide: [{ $subtract: [new Date(), "$createdAt"] }, 86400000],
              },
              { $add: ["$expireDate", 2] },
            ],
          }, // còn hạn
        });
      } else if (req.query.state === "finished") {
        articles = await Article.find({
          userId: userId,
          $expr: {
            $gt: [
              {
                $divide: [{ $subtract: [new Date(), "$createdAt"] }, 86400000],
              }, // Chuyển từ mili giây sang số ngày
              { $add: ["$expireDate", 2] },
            ],
          },
        });
      } else if (req.query.state === "pending") {
        articles = await Article.find({ userId: userId, adminApproval: false });
      }
    } else {
      articles = await Article.find({ userId: userId });
    }
    if (articles.length === 0) {
      res.status(404).json({ message: "No articles found" });
    } else {
      res.status(200).json(articles);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const isLimitArticleUp = async (req, res) => {
  const userId = req.userId;
  try {
    // không quá 5 bài kể cả bài yêu cầu và bài đã đăng
    const articles = await Article.find({
      userId: userId,
      $expr: {
        $lte: [
          {
            $divide: [{ $subtract: [new Date(), "$createdAt"] }, 86400000],
          },
          { $add: ["$expireDate", 2] },
        ],
      },
    });
    if (articles) {
      return res.status(404).json({ message: "Not Found" });
    }
    if (articles.length <= 5) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(200).json({ success: false });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

const getDonorOfArticle = async (req, res) => {
  try {
    const { articleId } = req.body;
    let donation;
    // neu co name thi tra ve name
    if (req.query.name) {
      const searchQuery = {
        fullnameDonor: {
          $regex: new RegExp(req.query.name, "i"),
        },
        articleId: {
          $eq: articleId,
        },
      };

      donation = await Donation.find(searchQuery).populate(
        "donorId",
        "username"
      );
    } else {
      donation = await Donation.find({ articleId: articleId }).populate(
        "donorId",
        "username"
      );
    }
    // neu co skip va limit thi tra ve nhu vay
    if (req.query.skip && req.query.limit) {
      donation = donation.slice(parseInt(req.query.skip));
      donation = donation.slice(0, parseInt(req.query.limit));
    }
    let formatDonation = [];
    let totalCount = 0;
    if (donation !== undefined) {
      formatDonation = await formatDate(donation);
      totalCount = donation.length;
    }
    res.status(200).json({ totalCount, formatDonation });
  } catch (error) {
    res.status(500).json({ message: "Internal error" });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Article.findById(id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found. It may have been deleted already",
      });
    }

    await post.remove();
    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the post",
    });
  }
};

const addComment = async (req, res) => {
  try {
    const { rating, content, postId } = req.body;
    const userId = req.userId;
    const newComment = new Comment({
      reviewerId: userId,
      articleId: postId,
      rating: rating,
      comment: content,
    });
    await newComment.save();
    await Article.findOneAndUpdate(
      {
        _id: { $eq: postId },
      },
      {
        $addToSet: {
          comments: newComment._id,
        },
      }
    );
    res.status(200).json({
      message: "Comment added successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding comment",
    });
  }
};

const addActivity = async (req, res) => {
  try {
    const { image, content, amountSpent, postId } = req.body;
    const userId = req.userId;
    const newActivity = new Activity({
      addedBy: userId,
      articleId: postId,
      image: image,
      state: "",
      body: content,
      amountSpent: amountSpent,
    });
    await newActivity.save();
    await Article.findOneAndUpdate(
      {
        _id: { $eq: postId },
      },
      {
        $addToSet: {
          activities: newActivity._id,
        },
      }
    );
    res.status(200).json({
      message: "added successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding",
    });
  }
};

const addCategory = async (req, res) => {
  const { description, icon, popular, title } = req.body;
  try {
    const categoryRelate = await Category.findOne({ title: title });
    if (categoryRelate) {
      res.status(500).json({
        message: "Error adding",
      });
    }
    const newCategory = await new Category({
      description: description,
      icon: icon,
      popular: popular,
      title: title,
    });
    newCategory.save();
    res.status(200).json({
      message: "added successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding",
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: "Error",
    });
  }
};

const getUserArticleDetail = async (req, res) => {
  try {
    const userId = req.userId;
    const postId = req.params.id;
    // tìm bài báo
    const post = await Article.find({ _id: postId, userId: userId })
      .populate("activities")
      .populate("categotyId")
      .lean();
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const articleRaiseAmount = async (req, res) => {
  const { postId, amount } = req.body;
  try {
    const article = await Article.findById(postId);
    if (!article) {
      return res.status(404).json({ message: "Not Fund" });
    }
    article.amountEarned = parseInt(article.amountEarned) + parseInt(amount);
    article.save();
    return res.status(200).json({ message: "Successfully" });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  addArticle,
  confirmArticle,
  rejectArticle,
  getArticle,
  getArticles, // loc, tim kiem luon theo query, or tra ve tat ca
  getArticleByUser, // tra ve bai bao cua nguoi dung, co loc theo state theo query
  deleteArticle,
  addComment,
  addActivity,
  addCategory,
  getCategories,
  upLoadImage,
  getDonorOfArticle,
  getArticleHighRating,
  isLimitArticleUp,
  getUserArticleDetail,
  articleRaiseAmount,
};
