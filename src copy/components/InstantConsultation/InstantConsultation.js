import React, { useEffect, useState } from 'react';
import './InstantConsultation.css';
import { useSearchParams } from 'react-router-dom';
import FindDoctorSearchIC from './FindDoctorSearchIC/FindDoctorSearchIC';
import DoctorCardIC from './DoctorCardIC/DoctorCardIC';

const InstantConsultation = () => {
  const [searchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const getDoctorsDetails = async () => {
    try {
      const response = await fetch('https://api.npoint.io/9a5543d36f1460da2f63');
      const data = await response.json();
      setDoctors(data);

      if (searchParams.get('speciality')) {
        const filtered = data.filter((doctor) =>
          doctor.speciality.toLowerCase() === searchParams.get('speciality').toLowerCase()
        );
        setFilteredDoctors(filtered);
        setIsSearched(true);
      }
    } catch (err) {
      console.error('Ошибка загрузки данных:', err);
    }
  };

  useEffect(() => {
    getDoctorsDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSearch = (searchText) => {
    if (searchText.trim() === '') {
      setFilteredDoctors([]);
      setIsSearched(false);
    } else {
      const filtered = doctors.filter((doctor) =>
        doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredDoctors(filtered);
      setIsSearched(true);
    }
  };

  return (
    <div className="instant-consultation">
      <FindDoctorSearchIC onSearch={handleSearch} />
      {isSearched ? (
        <div>
          <h2>{filteredDoctors.length} doctors found</h2>
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor, index) => (
              <DoctorCardIC key={index} {...doctor} />
            ))
          ) : (
            <p>No doctors available for this speciality.</p>
          )}
        </div>
      ) : (
        <p>Search for doctors by speciality.</p>
      )}
    </div>
  );
};

export default InstantConsultation;
