const express = require('express');
const db = require('./db');
const cors = require('cors');


const mahasiswaRoutes = require('./routes/mahasiswaRoutes');
const fakultasRoutes = require('./routes/fakultasRoutes');
const progStudiRoutes = require('./routes/progStudiRoutes');
const mahasiswaKTMRoutes = require('./routes/mahasiswaKTMRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:2000', // Ganti dengan URL frontend Anda
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Daftarkan routes
app.use('/mahasiswa', mahasiswaRoutes); // Untuk mahasiswa
app.use('/fakultas', fakultasRoutes); // Untuk fakultas
app.use('/prog-studi', progStudiRoutes); // Untuk program studi
app.use('/mahasiswa-ktm', mahasiswaKTMRoutes); // Untuk mahasiswa KTM

// Root route
app.get('/', (req, res) => {
    res.send('API Backend Berjalan! Gunakan endpoint seperti /fakultas atau /mahasiswa.');
});

// Jalankan server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});