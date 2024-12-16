import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api"; // Mengimpor API untuk melakukan request ke backend
import Navbar from "../../components/Navbar";
import "../../App.css";

const EditProgStudi = () => {
  const { id } = useParams(); // Ambil id dari parameter URL
  const [namaProdi, setNamaProdi] = useState("");
  const [fakultas, setFakultas] = useState("");
  const [fakultasList, setFakultasList] = useState([]); // Menyimpan daftar fakultas
  const navigate = useNavigate(); // Menggunakan navigate untuk redirect

  // Mengambil data fakultas saat komponen dimuat
  useEffect(() => {
    // Panggil API untuk mengambil daftar fakultas
    API.get("/fakultas")
      .then((response) => {
        setFakultasList(response.data.fakultas || []);
      })
      .catch((error) => {
        console.error("Error fetching fakultas:", error);
      });

    // Ambil data program studi berdasarkan id dari API atau database
    API.get(`/prog-studi/${id}`)
      .then((response) => {
        if (response.data) {
          setNamaProdi(response.data.nama_prog_studi); // Set nama program studi
          setFakultas(response.data.fakultas.nama_fakultas); // Set fakultas yang dipilih
        } else {
          console.error("Program studi tidak ditemukan.");
        }
      })
      .catch((error) => {
        console.error("Error fetching program studi:", error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mencari id_fakultas berdasarkan nama fakultas yang dipilih
    const fakultasItem = fakultasList.find(item => item.nama_fakultas === fakultas);
    
    if (!fakultasItem) {
      console.error("Fakultas tidak ditemukan!");
      return;
    }
    
    const updatedProgStudi = {
      nama_prog_studi: namaProdi,
      id_fakultas: fakultasItem.id_fakultas,  // Kirim id_fakultas
    };
    
    // Kirim data program studi yang telah diperbarui
    API.put(`/prog-studi/${id}`, updatedProgStudi)
      .then(() => {
        navigate("/prog-studi"); // Redirect setelah berhasil mengedit
      })
      .catch((error) => {
        console.error("Error updating program studi:", error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6 font-outfit bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Program Studi</h1>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="nama_prog_studi"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nama Program Studi
              </label>
              <input
                type="text"
                id="nama_prog_studi"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                value={namaProdi}
                onChange={(e) => setNamaProdi(e.target.value)}
                placeholder="Masukkan nama program studi"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="fakultas"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Pilih Fakultas
              </label>
              <select
                id="fakultas"
                value={fakultas}
                onChange={(e) => setFakultas(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                required
              >
                <option value>Pilih Fakultas</option>
                {fakultasList.map((fakultasItem) => (
                  <option
                    key={fakultasItem.id_fakultas}
                    value={fakultasItem.nama_fakultas}
                  >
                    {fakultasItem.nama_fakultas}
                  </option>
                ))}
              </select>
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

export default EditProgStudi;
