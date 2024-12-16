const db = require('../db');

exports.addFakultas = (req, res) => {
    const { nama_fakultas } = req.body;
    const query = 'INSERT INTO fakultas (nama_fakultas) VALUES (?)';
    db.query(query, [nama_fakultas], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Fakultas berhasil ditambahkan.' });
    });
};

exports.getAllFakultas = (req, res) => {
    const query = 'SELECT * FROM fakultas';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ fakultas: results }); // Bungkus hasil dalam objek 'fakultas'
    });
};

exports.getFakultasById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM fakultas WHERE id_fakultas = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Fakultas tidak ditemukan.' });
        res.json(result[0]);
    });
};

exports.updateFakultas = (req, res) => {
    const { id } = req.params;
    const { nama_fakultas } = req.body;
    const query = 'UPDATE fakultas SET nama_fakultas = ? WHERE id_fakultas = ?';
    db.query(query, [nama_fakultas, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Fakultas berhasil diperbarui.' });
    });
};

exports.deleteFakultas = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM fakultas WHERE id_fakultas = ?';
    db.query(query, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Fakultas berhasil dihapus.' });
    });
};