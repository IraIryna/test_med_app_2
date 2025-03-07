import React, { useState } from 'react';
import './FindDoctorSearchIC.css';

const FindDoctorSearchIC = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search doctor by speciality"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default FindDoctorSearchIC;
