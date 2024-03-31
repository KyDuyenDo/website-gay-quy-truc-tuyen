
const formatCreatedAt = (createdAt) => {
  // Tạo đối tượng Date từ chuỗi
  const dateTime = new Date(createdAt);

  // Thêm 7 tiếng để chuyển đổi sang giờ Việt Nam
  dateTime.setHours(dateTime.getHours() + 7);

  // Lấy ngày, tháng, năm
  const day = dateTime.getDate().toString().padStart(2, "0");
  const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
  const year = dateTime.getFullYear();

  // Lấy giờ, phút
  const hour = dateTime.getHours().toString().padStart(2, "0");
  const minute = dateTime.getMinutes().toString().padStart(2, "0");

  // Định dạng chuỗi ngày giờ
  const formattedDateTime = `${day}/${month}/${year}, ${hour}:${minute}`;

  return formattedDateTime;
};

module.exports = formatCreatedAt;
