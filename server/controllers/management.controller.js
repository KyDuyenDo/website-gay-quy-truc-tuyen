const Donation = require("../models/donation.model");
const Activity = require("../models/activity.model");
const Article = require("../models/article.model");
const Notify = require("../models/notify.model");
const getUserDonation = async (req, res) => {
  const { userId } = req.body;
  try {
    const donation = Donation.find({ donorId: userId })
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
  const { userId } = req.body;
  try {
    const notify = Notify.find({ donorId: userId })
      .populate("articleId", "articletitle image")
      .lean();
    if (!notify) {
      res.status(404).json({ message: "Not Found" });
    }
    res.status(200).json(notify);
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};
const delNotify = async (req, res) => {
  const { notifyId } = req.body;
  try {
    const notify = await Notify.findById(notifyId);
    if (!notify) {
      return res.status(404).json({
        message: "Notify not found.",
      });
    }
    await notify.remove();
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
    const { userId } = req.body;
    const week = getWeekDays();

    const articlesByUser = await Article.find({ userId: userId }).exec();
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

module.exports = {
  getUserDonation,
  getChartData, // history
  getNotify,
  delNotify,
};
