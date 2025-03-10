import React, { useState } from 'react';

// ReviewForm component to collect feedback from patients
const ReviewForm = () => {
  // State variables to manage the form data (rating and comments)
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Handle rating change
  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  // Handle comments change
  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // For now, you can log the rating and comments or send them to an API
    console.log('Rating:', rating);
    console.log('Comments:', comments);
    
    // Reset form after submission
    setRating(0);
    setComments('');
    setShowForm(false); // Hide the form after submission
  };

  return (
    <div className="review-form-container">
      {/* Button to show the review form */}
      {!showForm && (
        <button onClick={() => setShowForm(true)} className="show-feedback-button">
          Provide Feedback
        </button>
      )}

      {/* Feedback Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="review-form">
          <h3>Provide Your Feedback</h3>
          <div className="rating-section">
            <label htmlFor="rating">Rate your consultation (1 to 5):</label>
            <input
              type="number"
              id="rating"
              name="rating"
              min="1"
              max="5"
              value={rating}
              onChange={handleRatingChange}
              required
            />
          </div>
          <div className="comments-section">
            <label htmlFor="comments">Additional Comments:</label>
            <textarea
              id="comments"
              name="comments"
              value={comments}
              onChange={handleCommentsChange}
              placeholder="Write your comments here..."
            />
          </div>
          <button type="submit" className="submit-button">
            Submit Feedback
          </button>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;
