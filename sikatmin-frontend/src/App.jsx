// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';  // Halaman Dashboard
import FakultasIndex from './pages/Fakultas/index';  // Halaman Daftar Fakultas
import TambahFakultas from './pages/Fakultas/TambahFakultas';  // Halaman Tambah Fakultas
import EditFakultas from './pages/Fakultas/EditFakultas';  // Halaman Edit Fakultas
import ProgStudiIndex from './pages/ProgStudi'; // Impor halaman index
import TambahProgStudi from './pages/ProgStudi/TambahProgStudi'; // Impor halaman tambah
import EditProgStudi from './pages/ProgStudi/EditProgStudi'; // Impor halaman edit
import IndexMahasiswa from "./pages/Mahasiswa/index";
import TambahMahasiswa from "./pages/Mahasiswa/TambahMahasiswa";
import EditMahasiswa from "./pages/Mahasiswa/EditMahasiswa";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route untuk halaman Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Route untuk halaman Fakultas */}
        <Route path="/fakultas" element={<FakultasIndex />} />
        <Route path="/fakultas/tambah" element={<TambahFakultas />} />
        <Route path="/fakultas/edit/:id" element={<EditFakultas />} /> {/* :id untuk parameter id */}
        <Route path="/prog-studi" element={<ProgStudiIndex />} />
        <Route path="/prog-studi/tambah" element={<TambahProgStudi />} />
        <Route path="/prog-studi/edit/:id" element={<EditProgStudi />} />
        <Route path="/mahasiswa" element={<IndexMahasiswa />} />
        <Route path="/mahasiswa/tambah" element={<TambahMahasiswa />} />
        <Route path="/mahasiswa/edit/:nim" element={<EditMahasiswa />} />
      </Routes>
    </Router>
  );
};

export default App;
