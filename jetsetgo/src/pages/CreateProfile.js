import React, { useState } from 'react'
import { Upload, Camera } from 'lucide-react'
import { useNavigate } from "react-router-dom";

export default function CreateProfile() {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    bio: '',
    location: '',
    travelPreferences: '',
    bucketList: ''
  })

  const [profileImage, setProfileImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault()
    navigate("/profile");
  }

  const travelPreferenceOptions = [
    'Adventure Travel',
    'Luxury Travel',
    'Budget Travel',
    'Cultural Experiences',
    'Food Tourism',
    'Eco Tourism'
  ]

  const bucketListOptions = [
    'Paris, France',
    'Tokyo, Japan',
    'New York, USA',
    'Machu Picchu, Peru',
    'Great Barrier Reef, Australia',
    'Safari in Tanzania'
  ]

  return (
    <div className="min-h-screen bg-[#000080] py-12 px-4">
      <div className="max-w-2xl mx-auto bg-[#001530] rounded-lg p-8">
        <h1 className="text-3xl font-bold text-[#FFDD00] mb-8">Create Your Profile</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image Upload */}
          <div className="flex justify-center mb-8">
            <div className="relative w-48 h-48">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="profile-image"
              />
              <label
                htmlFor="profile-image"
                className="cursor-pointer block w-full h-full border-2 border-dashed border-[#FFDD00] rounded-lg overflow-hidden"
              >
                {previewUrl ? (
                  <img src={previewUrl} alt="Profile preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-[#FFDD00]">
                    <Camera className="w-12 h-12 mb-2" />
                    <span>Upload Photo</span>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-[#FFDD00] mb-2">
              Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-[#000080] text-white border border-[#FFDD00] focus:outline-none focus:border-[#FFB300]"
            />
          </div>

          {/* Date of Birth Input */}
          <div>
            <label htmlFor="dateOfBirth" className="block text-[#FFDD00] mb-2">
              Date of Birth<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              required
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-[#000080] text-white border border-[#FFDD00] focus:outline-none focus:border-[#FFB300]"
            />
          </div>

          {/* Bio Input */}
          <div>
            <label htmlFor="bio" className="block text-[#FFDD00] mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows="4"
              value={formData.bio}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-[#000080] text-white border border-[#FFDD00] focus:outline-none focus:border-[#FFB300]"
            />
          </div>

          {/* Location Input */}
          <div>
            <label htmlFor="location" className="block text-[#FFDD00] mb-2">
              Location<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              required
              value={formData.location}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-[#000080] text-white border border-[#FFDD00] focus:outline-none focus:border-[#FFB300]"
            />
          </div>

          {/* Travel Preferences Select */}
          <div>
            <label htmlFor="travelPreferences" className="block text-[#FFDD00] mb-2">
              Travel Preferences<span className="text-red-500">*</span>
            </label>
            <select
              id="travelPreferences"
              name="travelPreferences"
              required
              value={formData.travelPreferences}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-[#000080] text-white border border-[#FFDD00] focus:outline-none focus:border-[#FFB300]"
            >
              <option value="">Select an option</option>
              {travelPreferenceOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Bucket List Select */}
          <div>
            <label htmlFor="bucketList" className="block text-[#FFDD00] mb-2">
              Bucket List Destinations<span className="text-red-500">*</span>
            </label>
            <select
              id="bucketList"
              name="bucketList"
              required
              value={formData.bucketList}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-[#000080] text-white border border-[#FFDD00] focus:outline-none focus:border-[#FFB300]"
            >
              <option value="">Select an option</option>
              {bucketListOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-[#FFB300] text-[#000080] rounded-lg font-semibold hover:bg-[#FFDD00] transition-colors"
            >
              Create Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}