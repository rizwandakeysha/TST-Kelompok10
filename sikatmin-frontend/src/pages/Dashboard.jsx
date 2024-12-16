import React from "react";
import { Link } from "react-router-dom"; // Import Link untuk routing
import "../App.css"; // Impor file CSS untuk styling tambahan
import Navbar from "../components/Navbar";


const Dashboard = () => {
  return (
    <div>
        <Navbar/>
      <div className="dashboard-container bg-gray-100 min-h-screen flex flex-col font-outfit">
        <div className="cards-container my-auto flex flex-wrap justify-center gap-6 p-6 font-outfit">
          <div className="card bg-white shadow-lg rounded-lg p-6 w-72">
            <h3 className="text-xl font-semibold text-center">Fakultas</h3>
            <Link
              to="/fakultas"
              className="btn bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4 block text-center"
            >
              Go to Fakultas
            </Link>
          </div>
          <div className="card bg-white shadow-lg rounded-lg p-6 w-72">
            <h3 className="text-xl font-semibold text-center">Mahasiswa</h3>
            <Link
              to="/mahasiswa"
              className="btn bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4 block text-center"
            >
              Go to Mahasiswa
            </Link>
          </div>
          <div className="card bg-white shadow-lg rounded-lg p-6 w-72">
            <h3 className="text-xl font-semibold text-center">Program Studi</h3>
            <Link
              to="/progstudi"
              className="btn bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4 block text-center"
            >
              Go to Program Studi
            </Link>
          </div>
          <div className="card bg-white shadow-lg rounded-lg p-6 w-72">
            <h3 className="text-xl font-semibold text-center">KTM</h3>
            <Link
              to="/ktm"
              className="btn bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4 block text-center"
            >
              Go to KTM
            </Link>
          </div>
        </div>

        <footer className="footer bg-blue-600 text-white p-4 text-center mt-auto">
          <p>&copy; 2024 SikatMin | Kelompok 10</p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
