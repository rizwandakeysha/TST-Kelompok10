// src/pages/Mahasiswa/EditMahasiswa.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api";
import Navbar from "../../components/Navbar";

const EditMahasiswa = () => {
  const { nim } = useParams();
  const [mahasiswa, setMahasiswa] = useState({});
  const [fakultasList, setFakultasList] = useState([]);
  const [progStudiList, setProgStudiList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil data mahasiswa berdasarkan NIM
    API.get(`/mahasiswa/${nim}`)
      .then((response) => setMahasiswa(response.data))
      .catch((error) => console.error("Error fetching mahasiswa:", error));

    // Ambil daftar fakultas dan program studi
    API.get("/fakultas")
      .then((response) => setFakultasList(response.data))
      .catch((error) => console.error("Error fetching fakultas:", error));

    API.get("/prog-studi")
      .then((response) => setProgStudiList(response.data))
      .catch((error) => console.error("Error fetching program studi:", error));
  }, [nim]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...mahasiswa,
      id_fakultas: mahasiswa.id_fakultas,
      id_prog_studi: mahasiswa.id_prog_studi,
    };
    API.put(`/mahasiswa/${nim}`, updatedData)
      .then(() => navigate("/mahasiswa"))
      .catch((error) => console.error("Error updating mahasiswa:", error));
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6 font-outfit bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">Edit Mahasiswa</h2>
        <form onSubmit={handleSubmit}>
          {/* Form fields similar to TambahMahasiswa with pre-filled values */}
        </form>
      </div>
    </div>
  );
};

export default EditMahasiswa;
