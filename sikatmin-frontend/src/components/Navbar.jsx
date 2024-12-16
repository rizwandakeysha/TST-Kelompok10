// src/components/Navbar.js

import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar bg-blue-600 p-4 flex justify-between items-center font-outfit">
      <h1 className="font-bold text-white text-2xl">
        SikatMin | Sistem Pembuatan Kartu Mahasiswa - Admin
      </h1>
      <div className="space-x-6">
        <Link
          to="/"
          className="text-white font-semibold hover:text-blue-300 transition-colors duration-300"
        >
          Home
        </Link>
        <Link
          to="/mahasiswa"
          className="text-white font-semibold hover:text-blue-300 transition-colors duration-300"
        >
          Mahasiswa
        </Link>
        <Link
          to="/mahasiswa-ktm"
          className="text-white font-semibold hover:text-blue-300 transition-colors duration-300"
        >
          Mahasiswa KTM
        </Link>
        <Link
          to="/fakultas"
          className="text-white font-semibold hover:text-blue-300 transition-colors duration-300"
        >
          Fakultas
        </Link>
        <Link
          to="/prog-studi"
          className="text-white font-semibold hover:text-blue-300 transition-colors duration-300"
        >
          Program Studi
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
