const fs = require('fs');
const path = require('path');

// Cari semua folder yang namanya diawali Jobsheet
const items = fs.readdirSync(__dirname);
const jobsheets = items.filter(name => /^jobsheet/i.test(name) && fs.statSync(path.join(__dirname, name)).isDirectory());

// Urutkan untuk mengambil angka jobsheet terbesar (tugas terbaru)
jobsheets.sort((a, b) => {
  const numA = parseInt(a.replace(/\D/g, '')) || 0;
  const numB = parseInt(b.replace(/\D/g, '')) || 0;
  return numB - numA;
});

const latest = jobsheets[0];
if (latest) {
  console.log(`Menampilkan tugas terbaru otomatis: ${latest}`);
  fs.cpSync(path.join(__dirname, latest), path.join(__dirname, 'public'), { recursive: true });
}
