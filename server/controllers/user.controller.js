const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const Fundraiser = require("../models/fundraiser.model");
const Article = require("../models/article.model");
const Donation = require("../models/donation.model");

const jwt = require("jsonwebtoken");
const Token = require("../models/token.model");

const duration = require("dayjs/plugin/duration");
const dayjs = require("dayjs");
dayjs.extend(duration);

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({
      email: { $eq: email },
    });
    if (!existingUser) {
      return res.status(404).json({
        message: "Email hoặc mật khẩu sai.",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Email hoặc mật khẩu sai.",
      });
    }
    if (existingUser.isEmailVerified === false) {
      return res.status(400).json({
        message: "Email hoặc mật khẩu sai.",
      });
    }
    if (existingUser.state !== "active") {
      return res.status(401).json({
        message:
          "Tài khoản của bạn đã bị chặn. Vui lòng liên hệ người hỗ trợ để được giải đáp.",
      });
    }
    const payload = {
      id: existingUser._id,
      email: existingUser.email,
    };

    const accessToken = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "6h",
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: "7d",
    });

    const newRefreshToken = new Token({
      user: existingUser._id,
      refreshToken,
      accessToken,
    });
    await newRefreshToken.save();

    res.status(200).json({
      accessToken,
      refreshToken,
      accessTokenUpdatedAt: new Date().toLocaleString(),
      user: {
        _id: existingUser._id,
        name: existingUser.username,
        email: existingUser.email,
        role: existingUser.role,
        avatar: existingUser.avatar,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password").lean();
    if (!user) {
      return res.status(404).json({ message: "Not Fund" });
    }
    // const starEvalution = await Comment.aggregate([
    //   {
    //     $match: {
    //       evaluatee: req.params.id,
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: null,
    //       averageRating: { $avg: "$rating" },
    //     },
    //   },
    // ]);
    // user.starEvalution = starEvalution[0].averageRating;
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};
const getDetailFundraiser = async (req, res) => {
  try {
    const user = await Fundraiser.findOne({ userId: req.userId })
      .select(
        "-identificationCard -identificationNumber -expirationDate -achievements -adminApproval"
      )
      .populate(
        "userId",
        "email username joindate youtubeUrl facebookUrl tiktokUrl avatar"
      )
      .lean();
    if (!user) {
      return res.status(404).json({ message: "Not Found" });
    }
    const parts = user.identificationImage.split("/");
    const filename = parts[parts.length - 1];
    user.identificationImage = filename;
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};
const getAllMember = async (req, res) => {
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
        $lookup: {
          from: "articles",
          localField: "userId",
          foreignField: "userId",
          as: "articles",
          pipeline: [
            {
              $group: {
                _id: null,
                totalAmountRaised: {
                  $sum: {
                    $cond: [
                      { $eq: ["$amountEarned", null] },
                      0,
                      "$amountEarned",
                    ],
                  },
                }, // Handle missing or non-numeric values
              },
            },
          ],
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
          groupName: 1,
          type: 1,
          articles: 1,
          approvaldate: 1,
          totalAmountRaised: {
            $arrayElemAt: ["$articles.totalAmountRaised", 0],
          },
        },
      },
    ];
    if (req.query.type) {
      pipeline[2].$match.$and.push({
        $or: [{ type: { $regex: new RegExp(req.query.type, "i") } }],
      });
    }
    if (req.query.q) {
      pipeline[2].$match.$and.push({
        $or: [{ groupName: { $regex: new RegExp(req.query.q, "i") } }],
      });
    }
    const members = await Fundraiser.aggregate(pipeline);
    let limitMember = members;
    if (req.query.limit && req.query.skip) {
      const skip = parseInt(req.query.skip);
      const limit = parseInt(req.query.limit);
      limitMember = limitMember.slice(skip, skip + limit);
    }
    res.status(200).json(limitMember);
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
};

const getHighRaiseMember = async (req, res) => {
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
        $lookup: {
          from: "articles",
          localField: "userId",
          foreignField: "userId",
          as: "articles",
          pipeline: [
            {
              $group: {
                _id: null,
                totalAmountRaised: {
                  $sum: {
                    $cond: [
                      { $eq: ["$amountEarned", null] },
                      0,
                      "$amountEarned",
                    ],
                  },
                }, // Handle missing or non-numeric values
              },
            },
          ],
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
          groupName: 1,
          type: 1,
          articles: 1,
          approvaldate: 1,
          totalAmountRaised: {
            $arrayElemAt: ["$articles.totalAmountRaised", 0],
          },
        },
      },
      {
        $sort: { totalAmountRaised: -1 }, // Sắp xếp theo averageRating (giảm dần)
      },
      {
        $limit: 4, // Giới hạn 4 kết quả đầu tiên
      },
    ];
    const results = await Fundraiser.aggregate(pipeline);
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
};

const getMemberDetail = async (req, res) => {
  try {
    const user = await Fundraiser.findOne({ userId: req.params.id })
      .select(
        "-identificationCard -identificationImage -identificationNumber -expirationDate -achievements -adminApproval"
      )
      .populate(
        "userId",
        "email username joindate youtubeUrl facebookUrl tiktokUrl avatar"
      )
      .lean();
    if (!user) {
      return res.status(404).json({ message: "Not Found" });
    }
    const articles = await Article.find({
      userId: req.params.id,
    });
    if (articles) {
      const totalAmountEarned = articles.reduce((acc, article) => {
        return acc + article.amountEarned;
      }, 0);
      // user.totalAmountEarned = totalAmountEarned;
      let totalDonation = 0;
      for (const article of articles) {
        const donations = await Donation.find({ articleId: article._id });
        totalDonation += donations.length;
      }
      user.totalDonation = totalDonation;
    }
    const donation = await Donation.find(
      { donorId: req.params.id },
      "donationAmount"
    );
    if (donation) {
      const totalAmountDonate = donation.reduce((acc, donation) => {
        return acc + donation.donationAmount;
      }, 0);
      user.totalAmountDonate = totalAmountDonate;
    }

    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

const becomeFundraiser = async (req, res) => {
  const {
    fullname,
    birthday,
    numberPhone,
    emailContact,
    type,
    groupName,
    describe,
    introLink,
  } = req.body;
  const userId = req.userId;

  try {
    const fund = await Fundraiser.findOne({ userId: userId });
    if (fund) {
      return res.status(400).json({ message: "User was Fundraiser" }); // Use 404 for not found
    }
    const fundraiser = await new Fundraiser({
      userId: userId,
      fullname: fullname,
      birthday: birthday,
      numberPhone: numberPhone,
      emailContact: emailContact,
      type: type,
      groupName: groupName,
      describe: describe,
      introLink: introLink,
    });
    fundraiser.save();
    res.status(200).json(fundraiser._id);
  } catch (error) {
    console.error("Error finding:", error);
    return res.status(500).json({ message: "Internal server error" }); // More specific error message
  }
};

const upLoadImageFundraiser = async (req, res) => {
  const {
    fundId,
    identificationImage,
    identificationCard1,
    identificationCard2,
  } = req.body;
  try {
    const fundraiser = await Fundraiser.findById(fundId);
    if (!fundraiser) {
      return res.status(404).json({ message: "Not Fund" });
    }
    fundraiser.identificationCard = [identificationCard1, identificationCard2];
    fundraiser.identificationImage = identificationImage;
    fundraiser.save();
    res.status(200).json({ message: "successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Error",
    });
  }
};

const addUser = async (req, res, next) => {
  const { email, password, isConsentGiven, username } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  /**
   * @type {boolean} isConsentGiven
   */
  // const isConsentGiven = JSON.parse(req.body.isConsentGiven);

  const defaultAvatar =
    "https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg";
  const fileUrl = req.files?.[0]?.filename
    ? `${req.protocol}://${req.get("host")}/assets/userAvatars/${
        req.files[0].filename
      }`
    : defaultAvatar;

  newUser = new User({
    username: username,
    email: email,
    password: hashedPassword,
    avatar: fileUrl,
  });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Tài khoản đã tồn tại.",
      });
    }
    await newUser.save();
    if (newUser.isNew) {
      throw new Error("Tài khoản đã tồn tại.");
    }

    if (isConsentGiven === false) {
      res.status(201).json({
        message: "User added successfully",
      });
    } else {
      next();
    }
  } catch (err) {
    return res.status(400).json({
      message: "Thêm tài khoản thất bại.",
    });
  }
};

const logout = async (req, res) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1] ?? null;
    if (accessToken) {
      await Token.deleteOne({ accessToken });
    }
    res.status(200).json({
      message: "Logout successful",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error. Please try again later.",
    });
  }
};

const protected = async (req, res) => {
  try {
    const userId = req.userId;
    if (userId !== null) {
      return res.json({ success: true, message: "This is protected data." });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    const existingToken = await Token.findOne({
      refreshToken: { $eq: refreshToken },
    });
    if (!existingToken) {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }
    const existingUser = await User.findById(existingToken.user);
    if (!existingUser) {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    const refreshTokenExpiresAt =
      jwt.decode(existingToken.refreshToken).exp * 1000;
    if (Date.now() >= refreshTokenExpiresAt) {
      await existingToken.deleteOne();
      return res.status(401).json({
        message: "Expired refresh token",
      });
    }

    const payload = {
      id: existingUser._id,
      email: existingUser.email,
    };

    const accessToken = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "6h",
    });

    res.status(200).json({
      accessToken,
      refreshToken: existingToken.refreshToken,
      accessTokenUpdatedAt: new Date().toLocaleString(),
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateInfo = async (req, res) => {
  const userId = req.userId;
  const {
    username,
    gender,
    birthday,
    phone,
    youtubeUrl,
    facebookUrl,
    tiktokUrl,
    intro,
    avatar,
  } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        username: username,
        gender: gender,
        birthday: birthday,
        phone: phone,
        youtubeUrl: youtubeUrl,
        facebookUrl: facebookUrl,
        tiktokUrl: tiktokUrl,
        intro: intro,
        avatar: avatar,
      },
      { new: true }
    )
      .select("-password -isEmailVerified -joindate -role -state")
      .lean();
    if (!user) {
      return res.status(404).json({
        message: "Cant update",
      });
    }
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  addUser,
  signin,
  logout,
  protected,
  refreshToken,
  getAllMember,
  getMemberDetail,
  getUser,
  updateInfo,
  becomeFundraiser,
  upLoadImageFundraiser,
  getHighRaiseMember,
  getDetailFundraiser,
};
