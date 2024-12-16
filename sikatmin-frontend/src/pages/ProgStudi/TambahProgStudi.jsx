import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api"; // Mengimpor API untuk melakukan request ke backend
import Navbar from "../../components/Navbar";

const TambahProgStudi = () => {
  const [namaProdi, setNamaProdi] = useState("");
  const [fakultas, setFakultas] = useState("");
  const [fakultasList, setFakultasList] = useState([]); // Menyimpan daftar fakultas
  const navigate = useNavigate();

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
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Mencari id_fakultas berdasarkan nama fakultas yang dipilih
    const fakultasItem = fakultasList.find(item => item.nama_fakultas === fakultas);
  
    if (!fakultasItem) {
      console.error("Fakultas tidak ditemukan!");
      return;
    }
  
    const newProgStudi = {
      nama_prog_studi: namaProdi,
      id_fakultas: fakultasItem.id_fakultas,  // Kirim id_fakultas
    };
  
    API.post("/prog-studi", newProgStudi)
      .then((response) => {
        console.log("Program Studi berhasil ditambahkan:", response);
        navigate("/prog-studi");
      })
      .catch((error) => {
        console.error("Error adding program studi:", error);
      });
  };
  

  return (
    <div>
        <Navbar/>
      <div className="container mx-auto p-6 font-outfit bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">Tambah Program Studi</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Nama Program Studi:</label>
          <input
            type="text"
            value={namaProdi}
            onChange={(e) => setNamaProdi(e.target.value)}
            className="p-2 border rounded w-full"
            required
          />

          <label className="block mt-4 mb-2">Pilih Fakultas:</label>
          <select
            value={fakultas}
            onChange={(e) => setFakultas(e.target.value)}
            className="p-2 border rounded w-full"
            required
          >
            <option value="">-- Pilih Fakultas --</option>
            {fakultasList.map((fakultasItem) => (
              <option
                key={fakultasItem.id_fakultas}
                value={fakultasItem.nama_fakultas}
              >
                {fakultasItem.nama_fakultas}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="mt-4 text-white bg-blue-600 p-2 rounded"
          >
            Tambah
          </button>
        </form>
      </div>
    </div>
  );
};

export default TambahProgStudi;
