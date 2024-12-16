const db = require('../db');

exports.addProgStudi = (req, res) => {
    const { id_fakultas, nama_prog_studi } = req.body;

    // Validasi input
    if (!id_fakultas || !nama_prog_studi) {
        return res.status(400).json({ error: "Semua field harus diisi." });
    }

    const query = 'INSERT INTO prog_studi (id_fakultas, nama_prog_studi) VALUES (?, ?)';
    db.query(query, [id_fakultas, nama_prog_studi], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Program studi berhasil ditambahkan.' });
    });
};

exports.getAllProgStudi = (req, res) => {
    const query = `
        SELECT prog_studi.id_prog_studi, prog_studi.nama_prog_studi, fakultas.nama_fakultas
        FROM prog_studi
        JOIN fakultas ON prog_studi.id_fakultas = fakultas.id_fakultas
    `;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({ prog_studi: results });
    });
};

exports.getProgStudiById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM prog_studi WHERE id_prog_studi = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Program studi tidak ditemukan.' });
        res.json(result[0]);
    });
};

exports.updateProgStudi = (req, res) => {
    const { id } = req.params;
    const { id_fakultas, nama_prog_studi } = req.body;

    // Validasi input
    if (!id_fakultas || !nama_prog_studi) {
        return res.status(400).json({ error: "Semua field harus diisi." });
    }

    const query = 'UPDATE prog_studi SET id_fakultas = ?, nama_prog_studi = ? WHERE id_prog_studi = ?';
    db.query(query, [id_fakultas, nama_prog_studi, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Program studi berhasil diperbarui.' });
    });
};

exports.deleteProgStudi = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM prog_studi WHERE id_prog_studi = ?';
    db.query(query, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Program studi berhasil dihapus.' });
    });
};