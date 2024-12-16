import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api"; // Mengimpor API dari src/api.js
import "../../App.css";
import Navbar from "../../components/Navbar";

const FakultasIndex = () => {
  const [fakultasList, setFakultasList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true); // Set loading sebelum fetch
    API.get("/fakultas")
      .then((response) => {
        const fakultas = response.data.fakultas || []; // Ambil data dari key 'fakultas'
        setFakultasList(fakultas);
        setIsLoading(false); // Set loading selesai
      })
      .catch((error) => {
        console.error(error);
        setError("Gagal mengambil data fakultas.");
        setIsLoading(false); // Set loading selesai meskipun error
      });
  }, []);

  const handleDelete = (id_fakultas, nama_fakultas) => {
    const confirmation = window.confirm(
      `Apakah kamu yakin ingin menghapus Fakultas ${nama_fakultas}?`
    );

    if (confirmation) {
      // Jika user menekan "OK", lanjutkan dengan penghapusan
      API.delete(`/fakultas/${id_fakultas}`)
        .then(() => {
          console.log(`${nama_fakultas} berhasil dihapus`);
          // Setelah berhasil menghapus, lakukan tindakan sesuai kebutuhan (misalnya, refresh data)
        })
        .catch((error) => {
          console.error(`Error menghapus ${nama_fakultas}:`, error);
        });
    } else {
      console.log("Penghapusan dibatalkan");
    }
  };

  if (error) {
    return <div className="error">{error}</div>; // Tampilkan error jika gagal mengambil data
  }

  return (
    <div>
        <Navbar />
      <div className="container mx-auto p-6 font-outfit bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Daftar Fakultas
        </h1>

        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600">Kelola data fakultas di halaman ini.</p>
          <Link
            to="/fakultas/tambah"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all duration-200"
          >
            Tambah Fakultas
          </Link>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="table-auto w-full border border-gray-200 bg-white rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-sm uppercase tracking-wider">
                  ID Fakultas
                </th>
                <th className="px-6 py-3 text-left font-medium text-sm uppercase tracking-wider">
                  Nama Fakultas
                </th>
                <th className="px-6 py-3 text-center font-medium text-sm uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {fakultasList.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-4 text-center text-gray-500 italic border-t border-gray-200"
                  >
                    Tidak ada data fakultas.
                  </td>
                </tr>
              ) : (
                fakultasList.map((fakultas, index) => (
                  <tr
                    key={fakultas.id_fakultas}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
                  >
                    <td className="px-6 py-4 text-gray-800 border-t border-gray-200">
                      {fakultas.id_fakultas}
                    </td>
                    <td className="px-6 py-4 text-gray-800 border-t border-gray-200">
                      {fakultas.nama_fakultas}
                    </td>
                    <td className="px-6 py-4 text-center border-t border-gray-200">
                      <Link
                        to={`/fakultas/edit/${fakultas.id_fakultas}`}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-md shadow hover:bg-yellow-600 transition-all duration-200 mr-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() =>
                          handleDelete(
                            fakultas.id_fakultas,
                            fakultas.nama_fakultas
                          )
                        }
                        className="px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 transition-all duration-200"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FakultasIndex;
