const Donation = require("../models/donation.model");
const Activity = require("../models/activity.model");
const Article = require("../models/article.model");
const Notify = require("../models/notify.model");
const getUserDonation = async (req, res) => {
  const userId = req.userId;
  // console.log("do")
  try {
    const donation = await Donation.find(
      { donorId: userId },
      "articleId donationAmount donationDate"
    )
      .populate("articleId", "articletitle image")
      .lean();
    if (!donation) {
      res.status(404).json({ message: "Not Found" });
    }
    res.status(200).json(donation);
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};
const getNotify = async (req, res) => {
  const userId = req.userId;
  try {
    const notify = await Notify.find({ userId: userId }, "message state time");
    if (!notify) {
      res.status(404).json({ message: "Not Found" });
    }
    res.status(200).json(notify);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const delNotify = async (req, res) => {
  const { notifyId } = req.body;
  try {
    const notify = await Notify.findByIdAndDelete(notifyId);
    console.log(notify);
    if (!notify) {
      return res.status(404).json({
        message: "Notify not found.",
      });
    }
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the notify",
    });
  }
};

function getWeekDays() {
  const today = new Date();
  const weekDays = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(today.getTime() + i * 1000 * 60 * 60 * 24);
    weekDays.push(day);
  }

  return weekDays;
}
function getDailyTotals(data, weekDays) {
  const dailyTotals = {}; // Object to store daily totals
  for (const item of weekDays) {
    const dateString = item.toLocaleDateString();
    dailyTotals[dateString] = 0;
  }
  for (const item of data) {
    const dateString =
      item.createdAt === undefined
        ? item.donationDate.toLocaleDateString()
        : item.createdAt.toLocaleDateString();
    if (dailyTotals[dateString] === undefined) {
      continue;
    } else {
      dailyTotals[dateString] =
        dailyTotals[dateString] +
        (item.amountSpent === undefined
          ? +item.donationAmount
          : -item.amountSpent);
    }
  }
  return dailyTotals;
}

// trả về mảng danh số chi trong tuần được tổng hợp từ các activity và các donation
const getChartData = async (req, res) => {
  try {
    const userId = req.userId;
    const week = getWeekDays();

    const articlesByUser = await Article.find({
      userId: userId,
      adminApproval: true,
      $expr: {
        $lte: [
          {
            $divide: [{ $subtract: [new Date(), "$createdAt"] }, 86400000],
          },
          { $add: ["$expireDate", 2] },
        ],
      },
    }).exec();
    if (!articlesByUser) {
      res.status(404).json({ message: "Not Found" });
    }
    const donationsForUserArticles = await Donation.find({
      articleId: { $in: articlesByUser },
    }).exec();
    const activitiesForUserArticles = await Activity.find({
      articleId: { $in: articlesByUser },
    }).exec();

    const dataDonationChart = getDailyTotals(donationsForUserArticles, week);
    const dataActivityChart = getDailyTotals(activitiesForUserArticles, week);

    res.status(200).json({ dataActivityChart, dataDonationChart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDataUserProject = async (req, res) => {
  const userId = req.userId;
  try {
    const articles = await Article.find({
      userId: userId,
    })
      .populate("activities")
      .lean()
      .then((articles) => {
        return articles.map((article) => {
          const totalSpent = article.activities.reduce(
            (acc, activity) => acc + activity.amountSpent,
            0
          );
          return {
            ...article, // Include other desired article fields
            totalSpent,
          };
        });
      });
    if (!articles) {
      return res.status(404).json({ message: "Not Fund" });
    }
    // tổng số dự án
    const fundraising = await Article.find({
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
    const finished = await Article.find({
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
    const pending = await Article.find({
      userId: userId,
      adminApproval: false,
    });
    // tổng số tiền đã chi
    const totalSpent = articles.reduce((acc, article) => {
      return acc + article.totalSpent;
    }, 0);
    // tổng số tiền gây quỹ được
    const totalAmountEarned = articles.reduce((acc, article) => {
      return acc + article.amountEarned;
    }, 0);
    // tổng số người hỗ trợ
    let totalDonation = 0;
    for (const article of articles) {
      const donations = await Donation.find({ articleId: article._id });
      totalDonation += donations.length;
    }
    const result = {
      fundraising: fundraising ? fundraising.length : 0,
      finished: finished ? finished.length : 0,
      spending: pending ? pending.length : 0,
      totalSpend: articles ? totalSpent : 0,
      totalRaise: articles ? totalAmountEarned : 0,
      totalDonor: totalDonation,
    };
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getDataFundraising = async (req, res) => {
  const userId = req.userId;
  try {
    const articles = await Article.find({
      userId: userId,
      adminApproval: true,
      $expr: {
        $lte: [
          {
            $divide: [{ $subtract: [new Date(), "$createdAt"] }, 86400000],
          },
          { $add: ["$expireDate", 2] },
        ],
      }, // còn hạn
    })
      .populate("activities")
      .lean()
      .then((articles) => {
        return articles.map((article) => {
          const totalSpent = article.activities.reduce(
            (acc, activity) => acc + activity.amountSpent,
            0
          );
          return {
            ...article, // Include other desired article fields
            totalSpent,
          };
        });
      });
    if (!articles) {
      return res.status(404).json({ message: "Not Fund" });
    }
    res.status(200).json(articles);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUserDonation,
  getChartData, // history
  getNotify,
  delNotify,
  getDataUserProject,
  getDataFundraising,
};
