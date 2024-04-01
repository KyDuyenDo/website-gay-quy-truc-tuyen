const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const Article = require("../models/article.model");
const User = require("../models/user.model");
const Address = require("../models/address.model");
const Comment = require("../models/commentAndEvaluation.model");
const Activity = require("../models/activity.model");
const Donation = require("../models/donation.model");
const Category = require("../models/category.model");
const formatCreatedAt = require("../utils/timeConverter");
const mongoose = require("mongoose");

const addArticle = async (req, res) => {
  try {
    const {
      title,
      category,
      body,
      userId,
      expireDate,
      releaseDate,
      accountNumber,
      methodPayment,
      emailPayPal,
      amountRaised,
      city,
      county,
      detail,
      lat,
      lon,
      street,
      town,
      // imageURL1,
      // imageURL2,
      // imageURL3,
      bankcode,
    } = req.body;
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
      addedBy: "Duyen Do",
      articletitle: title,
      // image: [imageURL1, imageURL2, imageURL3],
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
    // tìm tất cả các comment
    const comments = await findCommentsByArticleId(postId);
    post.comments = formatDocuments(comments);
    // tìm tất cả các hoạt động
    const activities = await findActivitiesByArticleId(postId);
    post.activities = formatDocuments(activities);
    // format lại ngày
    post.createdAt = dayjs(post.createdAt).fromNow();
    // trả về top 4 nhà gây quỹ nhiều nhất
    post.top4Donators = await Donation.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "donorId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $group: {
          _id: "$donorId",
          totalDonated: { $sum: "$donationAmount" },
          username: { $first: { $arrayElemAt: ["$user.username", 0] } },
          avatar: { $first: { $arrayElemAt: ["$user.avatar", 0] } },
        },
      },
      { $sort: { totalDonated: -1 } },
      { $limit: 4 },
      {
        $project: {
          _id: 1,
          username: 1,
          avatar: 1,
          donationAmount: "$totalDonated",
        },
      },
    ]);
    // trả về số sao đánh giá
    const totalStars = comments.reduce(
      (acc, comment) => acc + comment.rating,
      0
    );
    // Tính trung bình số sao
    post.averageRating = totalStars / comments.length;
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
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
        $unwind: "$comments", // Unwind single document from nested "comments" array
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
          averageRating: "$comments.averageRating", // Include average rating
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
      console.log(pipeline);
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

const getArticleByUser = async (req, res) => {
  const { userId } = req.body;
  try {
    let articles;
    if (req.query.state) {
      if (req.query.state === "fundraising") {
        articles = await Article.find({ userId: userId, state: "fundraising" });
      } else if (req.query.state === "finished") {
        articles = await Article.find({ userId: userId, state: "finished" });
      } else if (req.query.state === "pending") {
        articles = await Article.find({ userId: userId, state: "pending" });
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

const getDonorOfArticle = async (req, res) => {
  try {
    const { articleId } = req.body;
    let donation;
    // neu co name thi tra ve name
    if (req.query.name) {
      donation = await Donation.find({ articleId: articleId })
        .populate("donorId", "username")
        .lean();

      donation = donation.filter((donation) =>
        donation.users.username.includes(req.query.name)
      );
    } else {
      // neu khong co thi tra ve tat ca
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
    const totalCount = donation.length;
    res.status(200).json({ totalCount, donation });
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
    const { rating, content, postId, userId } = req.body;
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

const updateArticle = async (req, res) => {};

const addActivity = async (req, res) => {
  try {
    const {
      image,
      state,
      content,
      title,
      amountSpent,
      document,
      postId,
      userId,
    } = req.body;
    const newActivity = new Activity({
      addedBy: userId,
      articleId: postId,
      image: image,
      state: state,
      body: content,
      title: title,
      amountSpent: amountSpent,
      document: document,
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

module.exports = {
  addArticle,
  confirmArticle,
  rejectArticle,
  getArticle,
  getArticles, // loc, tim kiem luon theo query, or tra ve tat ca
  getArticleByUser, // tra ve bai bao cua nguoi dung, co loc theo state theo query
  deleteArticle,
  addComment,
  updateArticle,
  addActivity,
  addCategory,
  getCategories,
  upLoadImage,
  getDonorOfArticle,
};
