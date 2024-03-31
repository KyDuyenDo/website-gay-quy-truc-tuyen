const verifyEmailHTML = (name, verificationLink, verificationCode) =>
  `
<div style="max-width: 600px; margin: auto; background-color: #f4f4f4; padding: 20px; border-radius: 10px; box-shadow: 0 2px 4px rgb(104, 182, 255);">
  <div style="background-color: #ffffff; padding: 20px; border-radius: 10px;">
    <img src="https://i.im.ge/2024/03/17/RPAwwp.zengive.png" alt="SocialEcho Logo" style="display: block; margin: auto auto 20px;max-width: 50%;">
    <p style="font-size: 18px; margin-bottom: 20px; text-align: center; color: #4b5563; font-weight: bold;">Chào mừng đến Website gây quỹ trực tuyến, ${name}!</p>
    <p style="font-size: 16px; margin-bottom: 20px; text-align: center; color: #4b5563;">Vui lòng nhấp vào nút bên dưới để xác minh địa chỉ email của bạn và kích hoạt tài khoản của bạn:</p>
    <div style="text-align: center; margin-bottom: 20px;">
      <a href="${verificationLink}" style="background-color: #3b82f6; color: #ffffff; padding: 12px 25px; border-radius: 5px; text-decoration: none; display: inline-block; font-size: 16px; font-weight: bold;">Xác nhận địa chỉ email</a>
   </div>
    <p style="font-size: 14px; margin-bottom: 20px; text-align: center; color: #6b7280;">Liên kết sẽ hết hạn sau 30 phút.</p>
    <p style="font-size: 16px; margin-bottom: 15px; text-align: center; color: #3b82f6; font-weight: bold;">Mã xác minh của bạn là: <span style="color: #000000;">${verificationCode}</span></p>
    <p style="font-size: 14px; margin-bottom: 20px; text-align: center; color: #4b5563;">Nếu bạn chưa tạo tài khoản, vui lòng bỏ qua email này.</p>
   </div>
</div>`;

module.exports = { verifyEmailHTML};
