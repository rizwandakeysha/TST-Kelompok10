import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api"; // Import API
import "../../App.css";
import Navbar from "../../components/Navbar";

const TambahFakultas = () => {
  const [namaFakultas, setNamaFakultas] = useState("");
  const navigate = useNavigate(); // Pastikan ini menggunakan huruf kecil "navigate"

  const handleSubmit = (e) => {
    e.preventDefault();

    // Gunakan API untuk mengirim data fakultas baru
    API.post("/fakultas", { nama_fakultas: namaFakultas })
      .then(() => {
        console.log("Fakultas berhasil ditambahkan");
        // Redirect setelah berhasil menambah fakultas
        navigate("/fakultas"); // Tidak perlu .push
      })
      .catch((error) => {
        console.error("Error menambahkan fakultas:", error);
      });
  };

  return (
    <div>
        <Navbar/>
      <div className="container mx-auto p-6 font-outfit bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Tambah Fakultas
        </h1>

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
              Tambah Fakultas
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TambahFakultas;
