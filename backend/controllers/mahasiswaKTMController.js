const db = require('../db');

const generateNomorKTM = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000);
};

exports.addMahasiswaKTM = (req, res) => {
    const { nim } = req.body;

    const checkQuery = 'SELECT nim FROM mahasiswa_ub WHERE nim = ?';
    db.query(checkQuery, [nim], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) {
            return res.status(400).json({ message: 'NIM tidak ditemukan di tabel mahasiswa.' });
        }

        const nomor_ktm = generateNomorKTM();

        const insertQuery = `
            INSERT INTO mahasiswa_ub_ktm (nim, nomor_ktm)
            VALUES (?, ?)
        `;
        db.query(insertQuery, [nim, nomor_ktm], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({
                message: 'Data mahasiswa KTM berhasil ditambahkan.',
                nomor_ktm
            });
        });
    });
};


exports.getMahasiswaKTM = (req, res) => {
    const query = `
        SELECT mahasiswa_ub.nim, mahasiswa_ub.nama_lengkap, mahasiswa_ub.kota_lahir, mahasiswa_ub.tanggal_lahir, 
               mahasiswa_ub_ktm.nomor_ktm, mahasiswa_ub_ktm.tanggal_pembuatan,
               fakultas.nama_fakultas, prog_studi.nama_prog_studi
        FROM mahasiswa_ub
        LEFT JOIN mahasiswa_ub_ktm ON mahasiswa_ub.nim = mahasiswa_ub_ktm.nim
        LEFT JOIN fakultas ON mahasiswa_ub.id_fakultas = fakultas.id_fakultas
        LEFT JOIN prog_studi ON mahasiswa_ub.id_prog_studi = prog_studi.id_prog_studi
    `;

    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
}

exports.getAllMahasiswaKTM = (req, res) => {
    const query = 'SELECT * FROM mahasiswa_ub_ktm';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getMahasiswaKTMById = (req, res) => {
    const { id } = req.params;

    const query = `
        SELECT mahasiswa_ub.nim, mahasiswa_ub.nama_lengkap, mahasiswa_ub.kota_lahir, mahasiswa_ub.tanggal_lahir, 
               mahasiswa_ub_ktm.nomor_ktm, mahasiswa_ub_ktm.tanggal_pembuatan,
               fakultas.nama_fakultas, prog_studi.nama_prog_studi
        FROM mahasiswa_ub
        LEFT JOIN mahasiswa_ub_ktm ON mahasiswa_ub.nim = mahasiswa_ub_ktm.nim
        LEFT JOIN fakultas ON mahasiswa_ub.id_fakultas = fakultas.id_fakultas
        LEFT JOIN prog_studi ON mahasiswa_ub.id_prog_studi = prog_studi.id_prog_studi
        WHERE mahasiswa_ub_ktm.id_ktm = ?
    `;

    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) {
            return res.status(404).json({ message: 'Data tidak ditemukan.' });
        }

        res.json(results[0]);
    });
};

exports.updateMahasiswaKTM = (req, res) => {
    const { id } = req.params;

    const query = `
        UPDATE mahasiswa_ub_ktm
        SET tanggal_pembuatan = NOW() -- Update ke waktu sekarang
        WHERE id_ktm = ?
    `;
    db.query(query, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Tanggal pembuatan mahasiswa KTM berhasil diperbarui.' });
    });
};

exports.deleteMahasiswaKTM = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM mahasiswa_ub_ktm WHERE id_ktm = ?';
    db.query(query, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Data mahasiswa KTM berhasil dihapus.' });
    });
};