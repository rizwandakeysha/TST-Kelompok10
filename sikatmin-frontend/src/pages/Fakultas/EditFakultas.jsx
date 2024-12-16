import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api"; // Mengimpor API dari src/api.js
import "../../App.css";
import Navbar from "../../components/Navbar";

const EditFakultas = () => {
  const [namaFakultas, setNamaFakultas] = useState("");
  const { id } = useParams(); // Ambil id dari parameter URL
  const navigate = useNavigate(); // Menggunakan navigate untuk redirect

  useEffect(() => {
    // Mengambil data fakultas berdasarkan id
    API.get(`/fakultas/${id}`)
      .then((response) => {
        if (response.data.nama_fakultas) {
          setNamaFakultas(response.data.nama_fakultas); // Set data fakultas ke state
        } else {
          console.error("Nama fakultas tidak ditemukan.");
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kirim data fakultas yang telah diperbarui ke server
    API.put(`/fakultas/${id}`, { nama_fakultas: namaFakultas })
      .then(() => {
        navigate("/fakultas"); // Redirect setelah berhasil mengedit fakultas
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  return (
    <div>
        <Navbar />
      <div className="container mx-auto p-6 font-outfit bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Fakultas</h1>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="nama_fakultas"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nama Fakultas
              </label>
              <input
                type="text"
                id="nama_fakultas"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                value={namaFakultas}
                onChange={(e) => setNamaFakultas(e.target.value)}
                placeholder="Masukkan nama fakultas"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-all duration-200"
            >
              Simpan Perubahan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditFakultas;
