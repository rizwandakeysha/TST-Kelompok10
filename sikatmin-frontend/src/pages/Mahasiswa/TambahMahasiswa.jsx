import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import Navbar from "../../components/Navbar";

const TambahMahasiswa = () => {
  const [nim, setNim] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [kotaLahir, setKotaLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [fakultas, setFakultas] = useState("");
  const [progStudi, setProgStudi] = useState("");
  const [gambar, setGambar] = useState(null); // Gambar mahasiswa
  const [fakultasList, setFakultasList] = useState([]); // Daftar fakultas
  const [progStudiList, setProgStudiList] = useState([]); // Semua program studi
  const navigate = useNavigate();

  // Mengambil data fakultas dan program studi saat komponen dimuat
  useEffect(() => {
    // Fetch fakultas
    API.get("/fakultas")
      .then((response) => {
        setFakultasList(response.data.fakultas || []); // Pastikan data tidak null
      })
      .catch((error) => {
        console.error("Error fetching fakultas:", error);
      });

    // Fetch semua program studi
    API.get("/prog-studi")
      .then((response) => {
        setProgStudiList(response.data.prog_studi || []); // Pastikan data tidak null
      })
      .catch((error) => {
        console.error("Error fetching program studi:", error);
      });
  }, []);

  // Mengubah gambar yang dipilih
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGambar(file);
    }
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Pastikan data valid sebelum mengirim
    if (!nim || !namaLengkap || !kotaLahir || !tanggalLahir || !fakultas || !progStudi) {
        console.error("Semua field wajib diisi.");
        return;
    }

    const mahasiswaData = new FormData();
    mahasiswaData.append("nim", nim);
    mahasiswaData.append("nama_lengkap", namaLengkap);
    mahasiswaData.append("kota_lahir", kotaLahir);
    mahasiswaData.append("tanggal_lahir", tanggalLahir);
    mahasiswaData.append("id_fakultas", fakultas);
    mahasiswaData.append("id_prog_studi", progStudi);
    if (gambar) mahasiswaData.append("gambar", gambar); // Tambahkan gambar jika ada

    // Pastikan API dapat menangani form-data
    API.post("/mahasiswa", mahasiswaData, {
        headers: {
            "Content-Type": "multipart/form-data", // Menentukan tipe konten
        }
    })
    .then((response) => {
        console.log("Mahasiswa berhasil ditambahkan:", response.data);
        navigate("/mahasiswa"); // Arahkan ke halaman mahasiswa setelah berhasil menambah
    })
    .catch((error) => {
        console.error("Error adding mahasiswa:", error.response?.data || error.message);
    });
};


  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6 font-outfit bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">Tambah Mahasiswa</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={nim}
            onChange={(e) => setNim(e.target.value)}
            className="p-2 border rounded w-full mb-4"
            placeholder="NIM"
            required
          />
          <input
            type="text"
            value={namaLengkap}
            onChange={(e) => setNamaLengkap(e.target.value)}
            className="p-2 border rounded w-full mb-4"
            placeholder="Nama Lengkap"
            required
          />
          <input
            type="text"
            value={kotaLahir}
            onChange={(e) => setKotaLahir(e.target.value)}
            className="p-2 border rounded w-full mb-4"
            placeholder="Kota Lahir"
            required
          />
          <input
            type="date"
            value={tanggalLahir}
            onChange={(e) => setTanggalLahir(e.target.value)}
            className="p-2 border rounded w-full mb-4"
            required
          />
          <select
            value={fakultas}
            onChange={(e) => setFakultas(e.target.value)} // Set fakultas yang dipilih
            className="p-2 border rounded w-full mb-4"
            required
          >
            <option value="">-- Pilih Fakultas --</option>
            {fakultasList.map((fakultasItem) => (
              <option
                key={fakultasItem.id_fakultas}
                value={fakultasItem.id_fakultas}
              >
                {fakultasItem.nama_fakultas}
              </option>
            ))}
          </select>

          <select
            value={progStudi}
            onChange={(e) => setProgStudi(e.target.value)} // Set program studi yang dipilih
            className="p-2 border rounded w-full mb-4"
            required
          >
            <option value="">-- Pilih Program Studi --</option>
            {progStudiList.map((progStudiItem) => (
              <option
                key={progStudiItem.id_prog_studi}
                value={progStudiItem.id_prog_studi}
              >
                {progStudiItem.nama_prog_studi}
              </option>
            ))}
          </select>

          <input
            type="file"
            onChange={handleFileChange} // Handler untuk gambar
            className="p-2 border rounded w-full mb-4"
          />

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

export default TambahMahasiswa;
