// const express = require('express');
// const {
//     addMahasiswa,
//     getAllMahasiswa,
//     getMahasiswaByNim, // Tambahkan fungsi ini
//     updateMahasiswa,
//     deleteMahasiswa
// } = require('../controllers/mahasiswaController');

// const { upload } = require('../controllers/multerConfig'); // Mengimpor konfigurasi multer
// const router = express.Router();

// router.post('/mahasiswa', upload.single('gambar'), mahasiswaController.addMahasiswa);
// router.get('/', getAllMahasiswa); // Ambil semua mahasiswa
// router.get('/:nim', getMahasiswaByNim); // Ambil mahasiswa berdasarkan NIM
// router.put('/mahasiswa/:nim', upload.single('gambar'), mahasiswaController.updateMahasiswa);
// router.delete('/:nim', deleteMahasiswa); // Hapus mahasiswa berdasarkan NIM

// module.exports = router;

// routes/mahasiswaRoutes.js
// routes/mahasiswaRoutes.js
const express = require('express');
const router = express.Router();
const mahasiswaController = require('../controllers/mahasiswaController'); // Mengimpor mahasiswaController
const { upload } = require('../controllers/multerConfig'); // Mengimpor upload dari multerConfig

// Menambahkan mahasiswa baru
router.post('/mahasiswa', upload.single('gambar'), mahasiswaController.addMahasiswa);

// Memperbarui mahasiswa
router.put('/mahasiswa/:nim', upload.single('gambar'), mahasiswaController.updateMahasiswa);

// Menampilkan semua mahasiswa
router.get('/', mahasiswaController.getAllMahasiswa);

// Menampilkan mahasiswa berdasarkan NIM
router.get('/:nim', mahasiswaController.getMahasiswaByNim);

// Menghapus mahasiswa berdasarkan NIM
router.delete('/:nim', mahasiswaController.deleteMahasiswa);

module.exports = router;