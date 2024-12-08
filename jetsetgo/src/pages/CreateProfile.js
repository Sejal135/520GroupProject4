import React, { useState, useEffect } from 'react';
import '../components/CreateProfile.css';       // CSS page for styling

function CreateProfile({ onSubmit }) {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Assuming onSubmit function is passed to handle submission logic
    onSubmit();
  };

  return (
    <div className="create-profile-container">
      <div className="image-container">
        <label htmlFor="image-upload" className="image-box">
          {image ? (
            <img
              src={image}
              alt="Uploaded Preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span>+</span>
          )}
        </label>
        <input
          type="file"
          id="image-upload"
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>

      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label className="form-label">
            Name*: <span className="required">(Required)</span>
          </label>
          <input type="text" className="form-input" required />
        </div>
        <div>
          <label className="form-label">
            Date of Birth*: <span className="required">(Required)</span>
          </label>
          <input type="date" className="form-input" required />
        </div>
        <div>
          <label className="form-label">Bio:</label>
          <textarea className="form-input" rows="4"></textarea>
        </div>
        <div>
          <label className="form-label">
            Location*: <span className="required">(Required)</span>
          </label>
          <input type="text" className="form-input" required />
        </div>
        <div>
          <label className="form-label">
            Travel Preferences*: <span className="required">(Required)</span>
          </label>
          <select className="form-input" required>
            <option value="">Select an option</option>
            <option value="beach">Beach</option>
            <option value="mountains">Mountains</option>
            <option value="city">City</option>
            <option value="adventure">Adventure</option>
            <option value="cultural">Cultural</option>
          </select>
        </div>
        <div>
          <label className="form-label">
            Bucket List Destinations*: <span className="required">(Required)</span>
          </label>
          <select className="form-input" required>
            <option value="">Select an option</option>
            <option value="paris">Paris</option>
            <option value="tokyo">Tokyo</option>
            <option value="newyork">New York</option>
            <option value="sydney">Sydney</option>
            <option value="capeTown">Cape Town</option>
          </select>
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateProfile;
