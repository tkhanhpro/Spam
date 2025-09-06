const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const { myviettel, TV360, zalopay, metavn, vion, fpt, fptplay, hasuki, popeys, atm, mochalazi, interloan, winmart, pharmacity, gosell, gapo, f88 } = require('./spam');

// Danh sách các dịch vụ spam
const services = [
  myviettel,
  TV360,
  zalopay,
  metavn,
  vion,
  fpt,
  fptplay,
  hasuki,
  popeys,
  atm,
  mochalazi,
  interloan,
  winmart,
  pharmacity,
  gosell,
  gapo,
  f88
];

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Phục vụ file tĩnh từ thư mục public

// Endpoint /spam
app.get('/spam', async (req, res) => {
  const { sdt, lan } = req.query;

  // Kiểm tra tham số
  if (!sdt || !lan) {
    return res.status(400).json({ error: 'Thiếu số điện thoại (sdt) hoặc số lần gửi (lan)' });
  }

  const phoneNumber = sdt.toString().replace(/[^0-9]/g, ''); // Chuẩn hóa số điện thoại
  const times = parseInt(lan, 10);

  if (isNaN(times) || times < 1 || times > 10) { // Giới hạn số lần gửi
    return res.status(400).json({ error: 'Số lần gửi phải từ 1 đến 10' });
  }

  if (!/^\d{10,11}$/.test(phoneNumber)) { // Kiểm tra định dạng số điện thoại
    return res.status(400).json({ error: 'Số điện thoại không hợp lệ' });
  }

  const results = [];
  try {
    // Lặp số lần yêu cầu
    for (let i = 0; i < times; i++) {
      console.log(`Lần gửi thứ ${i + 1}`);
      // Gọi tất cả dịch vụ song song
      const serviceResults = await Promise.all(
        services.map(async (service) => {
          try {
            const result = await service(phoneNumber);
            return { service: service.name, ...result };
          } catch (err) {
            return { service: service.name, success: false, error: err.message };
          }
        })
      );
      results.push({ round: i + 1, services: serviceResults });
    }

    res.json({
      success: true,
      phone: phoneNumber,
      rounds: times,
      results
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server chạy tại http://localhost:${port}`);
});
