const bcrypt = require("bcrypt");
const { User } = require("../models/user.model");
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
    res.status(200).json(user);
  } catch (error) {
    next(err);
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
    res.status(400).json({
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
    res.status(500).json({
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

// const getPublicUsers = async (req, res) => {
//   try {
//     const userId = req.userId;

//     const followingIds = await Relationship.find({ follower: userId }).distinct(
//       "following"
//     );

//     const userIdObj = mongoose.Types.ObjectId(userId);

//     const excludedIds = [...followingIds, userIdObj];

//     const usersToDisplay = await User.aggregate([
//       {
//         $match: {
//           _id: { $nin: excludedIds },
//           role: { $ne: "moderator" },
//         },
//       },
//       {
//         $project: {
//           _id: 1,
//           name: 1,
//           avatar: 1,
//           location: 1,
//         },
//       },
//       {
//         $lookup: {
//           from: "relationships",
//           localField: "_id",
//           foreignField: "following",
//           as: "followers",
//         },
//       },
//       {
//         $project: {
//           _id: 1,
//           name: 1,
//           avatar: 1,
//           location: 1,
//           followerCount: { $size: "$followers" },
//         },
//       },
//       {
//         $sort: { followerCount: -1 },
//       },
//       {
//         $limit: 5,
//       },
//     ]);

//     res.status(200).json(usersToDisplay);
//   } catch (error) {
//     res.status(500).json({ message: "An error occurred" });
//   }
// };

module.exports = {
  addUser,
  signin,
  logout,
  protected,
  refreshToken,
  // getPublicUser,
  // getPublicUsers,
  getUser,
  updateInfo,
};
