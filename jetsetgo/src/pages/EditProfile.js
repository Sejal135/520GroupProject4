import React, { useState, useEffect } from 'react'; 
import { Camera } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

const travelPreferenceOptions = [
  'Adventure Traveler', 'Cultural Enthusiast', 'Solo Traveler', 'Luxury Traveler',
  'Budget Backpacker', 'Eco Traveler', 'Foodie Traveler', 'Beach Bum', 'Digital Nomad',
  'Pilgrim Traveler', 'Wildlife Enthusiast', 'Photographer Traveler', 'History Buff',
  'Family Vacationer', 'Festival Hopper', 'Wellness Traveler', 'Sports Fanatic', 'Road Tripper',
  'Cruise Traveler', 'Urban Explorer', 'Misc Traveler'
];

const mapPreferencesToApiNames = (preferences) => {
  const preferenceMap = {
    'Adventure Traveler': 'ADVENTURE_TRAVELER',
    'Cultural Enthusiast': 'CULTURAL_ENTHUSIAST',
    'Solo Traveler': 'SOLO_TRAVELER',
    'Luxury Traveler': 'LUXURY_TRAVELER',
    'Budget Backpacker': 'BUDGET_BACKPACKER',
    'Eco Traveler': 'ECO_TRAVELER',
    'Foodie Traveler': 'FOODIE_TRAVELER',
    'Beach Bum': 'BEACH_BUM',
    'Digital Nomad': 'DIGITAL_NOMAD',
    'Pilgrim Traveler': 'PILGRIM_TRAVELER',
    'Wildlife Enthusiast': 'WILDLIFE_ENTHUSIAST',
    'Photographer Traveler': 'PHOTOGRAPHER_TRAVELER',
    'History Buff': 'HISTORY_BUFF',
    'Family Vacationer': 'FAMILY_VACATIONER',
    'Festival Hopper': 'FESTIVAL_HOPPER',
    'Wellness Traveler': 'WELLNESS_TRAVELER',
    'Sports Fanatic': 'SPORTS_FANATIC',
    'Road Tripper': 'ROAD_TRIPPER',
    'Cruise Traveler': 'CRUISE_TRAVELER',
    'Urban Explorer': 'URBAN_EXPLORER',
    'Misc Traveler': 'MISC_TRAVELER'
  };
  return preferences.map(pref => preferenceMap[pref] || pref);
};

export default function CreateProfile() {
  const [formData, setFormData] = useState({
    username: '',
    date_of_birth: '',
    bio: '',
    location: '',
    travelPreferences: [],
    email: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        const decodedToken = jwtDecode(token);
        setFormData(prev => ({
          ...prev,
          email: decodedToken.email,
        }));

        // Fetch the user's profile
        fetchUserProfile(decodedToken.email);
      } else {
        console.error("JWT token not found in localStorage.");
      }
    } catch (error) {
      console.error("Error decoding JWT token:", error);
    }
  }, []);

  const fetchUserProfile = async (email) => {
    try {
      const profileResponse = await fetch(`http://localhost:8081/GetUserProfileByEmail?email=${email}`);
      if (!profileResponse.ok) {
        throw new Error('Failed to fetch profile data');
      }
      const profileJson = await profileResponse.json();
      setFormData(prev => ({
        ...prev,
        bio: profileJson.bio || '',
        location: profileJson.location || '',
        travelPreferences: profileJson.travelPreferences || [],
        username: profileJson.username || '',
        date_of_birth: profileJson.date_of_birth || ''
      }));
      console.log(profileJson)
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, options } = e.target;
    if (name === 'travelPreferences') {
      const selectedPreferences = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);
      setFormData(prev => ({
        ...prev,
        [name]: selectedPreferences,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('jwtToken');
      const decodedToken = jwtDecode(token);
      const email = decodedToken.email;
      const profileResponse = await fetch(`http://localhost:8081/GetUserProfileByEmail?email=${email}`);
      const profileJson = await profileResponse.json();
      const userId = profileJson.userId;
      const userName = profileJson.username;
      console.log(profileJson)

      const formDataToSend = new FormData();
      formDataToSend.append("userId", userId);
      formDataToSend.append("userName", userName);

      formDataToSend.append("profilePicture", formData.profileImage || ''); 
      formDataToSend.append("bio", formData.bio);
      formDataToSend.append("location", formData.location);

    
      console.log("hey l", formData.location)
      console.log("hey b", formData.bio)
      console.log("hey p", profileImage)
      console.log("hey u", userName)
      console.log("hey uid", userId)


    // Use API to UpdateUser
    //   @PostMapping("/UpdateUser")
    //   public String UpdateUser(@RequestParam int userId, @RequestParam String userName, @RequestParam String profilePicture, @RequestParam String bio, @RequestParam String location) {
    //       return usersService.EditUserProfile(userId, userName, profilePicture, bio, location);
    //   }

      // Send the updated profile
      const userResponse = await fetch(`http://localhost:8081/UpdateUser?userId=${userId}&userName=${userName}&profilePicture=${profileImage}&bio=${formData.bio}&location=${formData.location}`, {
        method: 'POST'
      });

      if (!userResponse.ok) {
        const errorMsg = await userResponse.text();
        throw new Error(`Failed to update user: ${errorMsg}`);
      }

      // Update preferences if they exist
      if (formData.travelPreferences.length > 0) {
        const mappedPreferences = mapPreferencesToApiNames(formData.travelPreferences);
        const preferencesResponse = await fetch(`http://localhost:8081/SetUserPreferences?userId=${userId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(mappedPreferences.map(pref => ({ preference: pref }))),
        });

        if (!preferencesResponse.ok) {
          const errorMsg = await preferencesResponse.text();
          throw new Error(`Failed to update preferences: ${errorMsg}`);
        }
      }

      navigate('/profile'); // Navigate to profile page after successful update
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000080] py-12 px-4">
      <div className="max-w-2xl mx-auto bg-[#001530] rounded-lg p-8">
        <h1 className="text-3xl font-bold text-[#FFDD00] mb-8">Edit Your Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center mb-8">
            <div className="relative w-48 h-48">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="profile-image"
              />
              <label htmlFor="profile-image" className="cursor-pointer block w-full h-full border-2 border-dashed border-[#FFDD00] rounded-lg overflow-hidden">
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

          <div>
            <label htmlFor="bio" className="block text-[#FFDD00] mb-2">Bio</label>
            <textarea
              id="bio"
              name="bio"
              rows="4"
              value={formData.bio}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-[#000080] text-white border border-[#FFDD00] focus:outline-none focus:border-[#FFB300]"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-[#FFDD00] mb-2">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-[#000080] text-white border border-[#FFDD00] focus:outline-none focus:border-[#FFB300]"
            />
          </div>

          <div>
            <label htmlFor="travelPreferences" className="block text-[#FFDD00] mb-2">Travel Preferences</label>
            <select
              id="travelPreferences"
              name="travelPreferences"
              multiple
              value={formData.travelPreferences}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-[#000080] text-white border border-[#FFDD00] focus:outline-none focus:border-[#FFB300]"
              size={5}
            >
              {travelPreferenceOptions.map((option) => (
                <option key={option} value={option} className="p-2 hover:bg-[#001530]">
                  {option}
                </option>
              ))}
            </select>
            <p className="text-sm text-[#FFDD00] mt-1">Hold Ctrl (Cmd on Mac) to select multiple options</p>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${loading ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-[#FFB300] text-[#000080] hover:bg-[#FFDD00]'}`}
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Edit Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


