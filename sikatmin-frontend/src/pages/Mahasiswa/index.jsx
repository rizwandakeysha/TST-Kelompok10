// src/pages/Mahasiswa/IndexMahasiswa.jsx
import React, { useState, useEffect } from "react";
import API from "../../api";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const IndexMahasiswa = () => {
  const [mahasiswaList, setMahasiswaList] = useState([]);

  useEffect(() => {
    // Ambil daftar mahasiswa dari API
    API.get("/mahasiswa")
      .then((response) => {
        setMahasiswaList(response.data); // Sekarang data mahasiswa mencakup fakultas dan program studi
      })
      .catch((error) => console.error("Error fetching mahasiswa:", error));
  }, []);

  const handleDelete = (nim) => {
    // Hapus mahasiswa berdasarkan NIM
    API.delete(`/mahasiswa/${nim}`)
      .then(() => {
        setMahasiswaList(mahasiswaList.filter((mhs) => mhs.nim !== nim)); // Hapus mahasiswa dari state
      })
      .catch((error) => console.error("Error deleting mahasiswa:", error));
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6 font-outfit bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Daftar Mahasiswa</h1>
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600">Kelola data fakultas di halaman ini.</p>
          <Link
            to="/mahasiswa/tambah"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all duration-200"
          >
            Tambah Mahasiswa
          </Link>
        </div>
        <table className="w-full table-auto mt-4">
          <thead>
            <tr>
              <th className="border px-4 py-2">NIM</th>
              <th className="border px-4 py-2">Nama</th>
              <th className="border px-4 py-2">Program Studi</th>
              <th className="border px-4 py-2">Fakultas</th>
              <th className="border px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {mahasiswaList.map((mahasiswa) => (
              <tr key={mahasiswa.nim}>
                <td className="border px-4 py-2">{mahasiswa.nim}</td>
                <td className="border px-4 py-2">{mahasiswa.nama_lengkap}</td>
                <td className="border px-4 py-2">{mahasiswa.nama_prog_studi}</td>
                <td className="border px-4 py-2">{mahasiswa.nama_fakultas}</td>
                <td className="border px-4 py-2">
                  <Link
                    to={`/mahasiswa/edit/${mahasiswa.nim}`}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(mahasiswa.nim)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md ml-2"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IndexMahasiswa;
