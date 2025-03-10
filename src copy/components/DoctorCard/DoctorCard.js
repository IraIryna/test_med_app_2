import React from "react";
import "./DoctorCard.css"; // Подключаем стили

const DoctorCard = ({ doctor }) => {
  return (
    <div className="doctor-card">
      <img src={doctor.image} alt={doctor.name} className="doctor-image" />
      <h2 className="doctor-name">{doctor.name}</h2>
      <p className="doctor-specialty">{doctor.profile}</p>
      <p className="doctor-experience">Experience: {doctor.experience} years</p>
      <p className="doctor-rating">⭐ {doctor.rating}</p>
      <button className="book-appointment-btn">Book appointment</button>
    </div>
  );
};

export default DoctorCard;
