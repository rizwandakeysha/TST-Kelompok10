const express = require('express');
const {
    addProgStudi,
    getAllProgStudi,
    getProgStudiById, // Tambahkan fungsi ini
    updateProgStudi,
    deleteProgStudi,
} = require('../controllers/progStudiController');

const router = express.Router();

router.post('/', addProgStudi); // Tambah program studi
router.get('/', getAllProgStudi); // Ambil semua program studi
router.get('/:id', getProgStudiById); // Ambil program studi berdasarkan ID
router.put('/:id', updateProgStudi); // Edit program studi berdasarkan ID
router.delete('/:id', deleteProgStudi); // Hapus program studi berdasarkan ID

module.exports = router;