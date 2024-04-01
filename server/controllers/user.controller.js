const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const Fundraiser = require("../models/fundraiser.model");

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
    const starEvalution = await Comment.aggregate([
      {
        $match: {
          evaluatee: req.params.id,
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);
    user.starEvalution = starEvalution[0].averageRating;
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
    let limitMember = members;
    if (req.query.limit && req.query.skip) {
      const skip = parseInt(req.query.skip);
      const limit = parseInt(req.query.limit);
      limitMember = limitMember.slice(skip, skip + limit);
    }
    const totalCount = limitMember.length;
    res.status(200).json({ limitMember, totalCount });
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
        "email username joindate youtubeUrl facebookUrl tiktokUrk"
      )
      .lean();
    const starEvalution = await Comment.aggregate([
      {
        $match: {
          evaluatee: req.params.id,
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);
    user.starEvalution = starEvalution[0].averageRating;
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

const updateInfo = async (req, res) => {};

// const getPublicUser = async (req, res) => {
//   try {
//     const currentUserId = req.userId;
//     const id = req.params.id;

//     const user = await User.findById(id).select(
//       "-password -email -savedPosts -updatedAt"
//     );

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const totalPosts = await Post.countDocuments({ user: user._id });
//     const communities = await Community.find({ members: user._id })
//       .select("name")
//       .lean();

//     const currentUserCommunities = await Community.find({
//       members: currentUserId,
//     })
//       .select("_id name")
//       .lean();

//     const userCommunities = await Community.find({ members: user._id })
//       .select("_id name")
//       .lean();

//     const commonCommunities = currentUserCommunities.filter((comm) => {
//       return userCommunities.some((userComm) => userComm._id.equals(comm._id));
//     });

//     const isFollowing = await Relationship.findOne({
//       follower: currentUserId,
//       following: user._id,
//     });

//     const followingSince = isFollowing
//       ? dayjs(isFollowing.createdAt).format("MMM D, YYYY")
//       : null;

//     const last30Days = dayjs().subtract(30, "day").toDate();
//     const postsLast30Days = await Post.aggregate([
//       { $match: { user: user._id, createdAt: { $gte: last30Days } } },
//       { $count: "total" },
//     ]);

//     const totalPostsLast30Days =
//       postsLast30Days.length > 0 ? postsLast30Days[0].total : 0;

//     const responseData = {
//       name: user.name,
//       avatar: user.avatar,
//       location: user.location,
//       bio: user.bio,
//       role: user.role,
//       interests: user.interests,
//       totalPosts,
//       communities,
//       totalCommunities: communities.length,
//       joinedOn: dayjs(user.createdAt).format("MMM D, YYYY"),
//       totalFollowers: user.followers?.length,
//       totalFollowing: user.following?.length,
//       isFollowing: !!isFollowing,
//       followingSince,
//       postsLast30Days: totalPostsLast30Days,
//       commonCommunities,
//     };

//     res.status(200).json(responseData);
//   } catch (error) {
//     res.status(500).json({
//       message: "Some error occurred while retrieving the user",
//     });
//   }
// };

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
};
