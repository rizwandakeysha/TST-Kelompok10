const express = require('express');
const {
    addMahasiswaKTM,
    getAllMahasiswaKTM,
    getMahasiswaKTMById, // Tambahkan fungsi ini
    getMahasiswaKTM, // Data gabungan mahasiswa dan KTM
    updateMahasiswaKTM,
    deleteMahasiswaKTM
} = require('../controllers/mahasiswaKTMController');

const router = express.Router();

router.post('/', addMahasiswaKTM); // Tambah mahasiswa KTM
router.get('/', getAllMahasiswaKTM); // Ambil semua mahasiswa KTM
router.get('/gabungan', getMahasiswaKTM); // Ambil data gabungan mahasiswa dan KTM
router.get('/:id', getMahasiswaKTMById); // Ambil mahasiswa KTM berdasarkan ID
router.put('/:id', updateMahasiswaKTM); // Edit mahasiswa KTM berdasarkan ID
router.delete('/:id', deleteMahasiswaKTM); // Hapus mahasiswa KTM berdasarkan ID

module.exports = router;