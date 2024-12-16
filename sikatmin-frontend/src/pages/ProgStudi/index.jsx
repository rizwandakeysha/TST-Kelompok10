import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api"; // Mengimpor API dari src/api.js
import "../../App.css";
import Navbar from "../../components/Navbar";

const ProgStudiIndex = () => {
  const [progStudiList, setProgStudiList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    API.get("/prog-studi")
      .then((response) => {
        const progStudi = response.data.prog_studi || [];
        console.log(progStudi); // Debugging log untuk memeriksa data yang diterima
        setProgStudiList(progStudi);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Gagal mengambil data program studi.");
        setIsLoading(false);
      });
  }, []);

  const handleDelete = (id_progStudi, nama_progStudi) => {
    const confirmation = window.confirm(
      `Apakah kamu yakin ingin menghapus Program Studi ${nama_progStudi}?`
    );

    if (confirmation) {
      API.delete(`/prog-studi/${id_progStudi}`)
        .then(() => {
          setProgStudiList((prevList) =>
            prevList.filter((progStudi) => progStudi.id_progStudi !== id_progStudi)
          );
        })
        .catch((error) => {
          console.error(`Error menghapus ${nama_progStudi}:`, error);
        });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6 font-outfit bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Daftar Program Studi</h1>

        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600">Kelola data program studi di halaman ini.</p>
          <Link
            to="/prog-studi/tambah"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all duration-200"
          >
            Tambah Program Studi
          </Link>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="table-auto w-full border border-gray-200 bg-white rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-sm uppercase tracking-wider">
                  ID Program Studi
                </th>
                <th className="px-6 py-3 text-left font-medium text-sm uppercase tracking-wider">
                  Nama Program Studi
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
              {progStudiList.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-500 italic border-t border-gray-200"
                  >
                    Tidak ada data program studi.
                  </td>
                </tr>
              ) : (
                progStudiList.map((progStudi, index) => (
                  <tr
                    key={progStudi.id_progStudi}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
                  >
                    <td className="px-6 py-4 text-gray-800 border-t border-gray-200">
                      {progStudi.id_prog_studi}
                    </td>
                    <td className="px-6 py-4 text-gray-800 border-t border-gray-200">
                      {progStudi.nama_prog_studi}
                    </td>
                    <td className="px-6 py-4 text-gray-800 border-t border-gray-200">
                      {progStudi.nama_fakultas}
                    </td>
                    <td className="px-6 py-4 text-center border-t border-gray-200">
                      <Link
                        to={`/prog-studi/edit/${progStudi.id_prog_studi}`}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-md shadow hover:bg-yellow-600 transition-all duration-200 mr-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() =>
                          handleDelete(progStudi.id_prog_studi, progStudi.nama_prog_studi)
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

export default ProgStudiIndex;
