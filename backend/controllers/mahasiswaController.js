// controllers/mahasiswaController.js
const db = require('../db');
const { upload } = require('./multerConfig'); // Mengimpor konfigurasi multer

// Menambahkan mahasiswa baru
exports.addMahasiswa = (req, res) => {
    console.log(req.body); // Memeriksa data yang diterima
    const { nim, nama_lengkap, kota_lahir, tanggal_lahir, id_fakultas, id_prog_studi } = req.body;

    const gambar = req.file ? req.file.filename : null; // Mendapatkan nama gambar jika di-upload

    const query = `
        INSERT INTO mahasiswa_ub (nim, nama_lengkap, kota_lahir, tanggal_lahir, id_fakultas, id_prog_studi, gambar)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [nim, nama_lengkap, kota_lahir, tanggal_lahir, id_fakultas, id_prog_studi, gambar], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Mahasiswa berhasil ditambahkan.' });
    });
};

// Menampilkan seluruh mahasiswa
exports.getAllMahasiswa = (req, res) => {
    const query = `
        SELECT m.nim, m.nama_lengkap, m.kota_lahir, m.tanggal_lahir, m.gambar,
               f.nama_fakultas, ps.nama_prog_studi
        FROM mahasiswa_ub m
        JOIN fakultas f ON m.id_fakultas = f.id_fakultas
        JOIN prog_studi ps ON m.id_prog_studi = ps.id_prog_studi
    `;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Menampilkan mahasiswa berdasarkan NIM
exports.getMahasiswaByNim = (req, res) => {
    const { nim } = req.params;
    const query = 'SELECT * FROM mahasiswa_ub WHERE nim = ?';
    db.query(query, [nim], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Mahasiswa tidak ditemukan.' });
        res.json(result[0]);
    });
};

// Memperbarui data mahasiswa
exports.updateMahasiswa = (req, res) => {
    const { nim } = req.params;
    const { nama_lengkap, kota_lahir, tanggal_lahir, id_fakultas, id_prog_studi } = req.body;

    const gambar = req.file ? req.file.filename : null; // Mendapatkan nama gambar jika di-upload

    const query = `
        UPDATE mahasiswa_ub
        SET nama_lengkap = ?, kota_lahir = ?, tanggal_lahir = ?, id_fakultas = ?, id_prog_studi = ?, gambar = ?
        WHERE nim = ?
    `;
    db.query(query, [nama_lengkap, kota_lahir, tanggal_lahir, id_fakultas, id_prog_studi, gambar, nim], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Mahasiswa berhasil diperbarui.' });
    });
};

// Menghapus mahasiswa berdasarkan NIM
exports.deleteMahasiswa = (req, res) => {
    const { nim } = req.params;
    const query = 'DELETE FROM mahasiswa_ub WHERE nim = ?';
    db.query(query, [nim], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Mahasiswa berhasil dihapus.' });
    });
};