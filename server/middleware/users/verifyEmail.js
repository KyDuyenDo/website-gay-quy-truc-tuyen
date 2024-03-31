const nodemailer = require("nodemailer");
const { User } = require("../../models/user.model");
const EmailVerification = require("../../models/email.model");
const { query, validationResult } = require("express-validator");
const { verifyEmailHTML } = require("../../utils/emailTemplates");

const verifyEmailValidation = [
  query("email").isEmail().normalizeEmail(),
  query("code").isLength({ min: 5, max: 5 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

const sendVerificationEmail = async (req, res) => {
  const USER = process.env.EMAIL;
  const PASS = process.env.PASSWORD;
  const { email, username } = req.body;

  const verificationCode = Math.floor(10000 + Math.random() * 90000);
  const verificationLink = `http://localhost:3000/auth/verify?code=${verificationCode}&email=${email}`;

  try {
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: USER,
        pass: PASS,
      },
    });

    let info = await transporter.sendMail({
      from: `<${USER}>`,
      to: email,
      subject: "Xác thực địa chỉ Email của bạn",
      html: verifyEmailHTML(username, verificationLink, verificationCode),
    });

    const newVerification = new EmailVerification({
      email,
      verificationCode,
      messageId: info.messageId,
      for: "signup",
    });

    await newVerification.save();

    res.status(200).json({
      message: `Verification email was successfully sent to ${email}`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const verifyEmail = async (req, res) => {
  const { code, email } = req.query;

  try {
    const [isVerified, verification] = await Promise.all([
      User.findOne({ email: { $eq: email }, isEmailVerified: true }),
      EmailVerification.findOne({
        email: { $eq: email },
        verificationCode: { $eq: code },
      }),
    ]);

    if (isVerified) {
      return res.status(400).json({ message: "Email is already verified" });
    }

    if (!verification) {
      return res
        .status(400)
        .json({ message: "Verification code is invalid or has expired" });
    }

    await User.findOneAndUpdate(
      { email: { $eq: email } },
      { isEmailVerified: true },
      { new: true }
    ).exec();

    await Promise.all([
      EmailVerification.deleteMany({ email: { $eq: email } }).exec(),
    ]);
    res.status(200).json({
      message: "Email verification process was successful",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  sendVerificationEmail,
  verifyEmail,
  verifyEmailValidation,
};
