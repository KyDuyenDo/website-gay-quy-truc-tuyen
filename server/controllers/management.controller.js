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
    const notify = await Notify.find(
      { userId: userId },
      "message state time"
    ).sort({ time: -1 });
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

function getWeekDays(date) {
  const today = new Date(date);
  const startOfWeek = new Date(today);
  startOfWeek.setDate(
    startOfWeek.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)
  );
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);
  const daysOfWeek = [];
  for (let i = 0; i <= 6; i++) {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(currentDate.getDate() + i);
    daysOfWeek.push(currentDate);
  }
  return daysOfWeek;
}
function getDailyTotals(data, weekDays) {
  const dailyTotals = {}; // Object to store daily totals
  for (const item of weekDays) {
    const dateString = item.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    dailyTotals[dateString] = 0;
  }
  for (const item of data) {
    const dateString =
      item.createdAt === undefined
        ? item.donationDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : item.createdAt.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
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
    const date = req.params.date;
    const userId = req.userId;
    const week = getWeekDays(date);

    const articlesByUser = await Article.find({
      userId: userId,
      adminApproval: true,
      $expr: {
        $lte: [
          {
            $divide: [{ $subtract: [new Date(), "$releaseDate"] }, 86400000],
          },
          { $add: ["$expireDate"] },
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
            $divide: [{ $subtract: [new Date(), "$releaseDate"] }, 86400000],
          },
          { $add: ["$expireDate"] },
        ],
      }, // còn hạn
    });
    const finished = await Article.find({
      userId: userId,
      $expr: {
        $gt: [
          {
            $divide: [{ $subtract: [new Date(), "$releaseDate"] }, 86400000],
          }, // Chuyển từ mili giây sang số ngày
          { $add: ["$expireDate"] },
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
            $divide: [{ $subtract: [new Date(), "$releaseDate"] }, 86400000],
          },
          { $add: ["$expireDate"] },
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
