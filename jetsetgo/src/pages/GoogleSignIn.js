// import React, { useEffect, useState } from 'react';
// import jwtDecode from "jwt-decode";

// function GoogleSignIn() {
//   const [isLibraryLoaded, setIsLibraryLoaded] = useState(false);

//   /* Callback function to handle the credential response */
//   const handleCredentialResponse = (response) => {
//     console.log("Encoded JWT ID token: " + response.credential);

//     // Decode the JWT token
//     const userObject = jwtDecode(response.credential);
//     console.log("Decoded User Info: ", userObject);

//     // Redirect to another page after successful sign-in
//     window.location.href = "/Profile"; // Example redirect
//   };

//   useEffect(() => {
//     // Load Google API client script
//     const script = document.createElement("script");
//     script.src = "https://accounts.google.com/gsi/client";
//     script.async = true;
//     script.defer = true;
    
//     // Set up onload handler to initialize Google Sign-In
//     script.onload = () => {
//       if (window.google && window.google.accounts) {
//         window.google.accounts.id.initialize({
//           client_id: "61729881345-lhduvocsq48944422u7id4h8v9iohd58.apps.googleusercontent.com",
//           callback: handleCredentialResponse,
//         });
//         setIsLibraryLoaded(true); // Indicate that the library has loaded
//       } else {
//         console.error("Google Sign-In library failed to load.");
//       }
//     };

//     document.head.appendChild(script);

//     return () => {
//       // Clean up script from DOM if the component unmounts
//       document.head.removeChild(script);
//     };
//   }, []);

//   useEffect(() => {
//     // Render the Google Sign-In button only if the library has loaded
//     if (isLibraryLoaded) {
//       window.google.accounts.id.renderButton(
//         document.getElementById("signInDiv"),
//         { theme: "outline", size: "large" }  // Customize button options
//       );
//     }
//   }, [isLibraryLoaded]);

//   // Only render the div for the button if the library has loaded
//   return isLibraryLoaded ? <div id="signInDiv"></div> : <p>Loading...</p>;
// }

// export default GoogleSignIn;
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
function GoogleSignIn() {
  const [isLibraryLoaded, setIsLibraryLoaded] = useState(false);
  const navigate = useNavigate();
  


  // Fetch functionality to get user profile information by email
  const getUserProfileByEmail = async (email) => {
    try {
      // email = "email1@gmail.com";
      // Send GET request to fetch the user's profile information using email
      const apiUrl = 'http://localhost:8081'; // Use the supabase URL
      const response = await fetch(`${apiUrl}/GetUserProfileByEmail?email=${email}`);
      // console.log(response)
      const jsonResponse = await response.json();
      console.log("Checking response...", jsonResponse);
      if (response.status == 200) {
        navigate("/home");
      }
      else {
        navigate("/create-profile");
      }
    } catch (error) {
      console.error("Error while fetching user profile:", error);
      navigate("/create-profile"); // In case of an error, assume the user needs to create a profile
    }
  };
  // Callback function to handle the credential response
  const handleCredentialResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    // Decode the JWT token
    const userObject = jwtDecode(response.credential);
    console.log("Decoded User Info: ", userObject);
    // Extract email from the decoded token (assuming it's available in the token)
    const email = userObject.email; // Assuming `email` is part of the JWT token
    // Call the getUserProfileByEmail function with the extracted email
    getUserProfileByEmail(email);
  };
  useEffect(() => {
    // Load Google API client script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    // Set up onload handler to initialize Google Sign-In
    script.onload = () => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id: "61729881345-lhduvocsq48944422u7id4h8v9iohd58.apps.googleusercontent.com",
          callback: handleCredentialResponse,
        });
        setIsLibraryLoaded(true); // Indicate that the library has loaded
      } else {
        console.error("Google Sign-In library failed to load.");
      }
    };
    document.head.appendChild(script);
    return () => {
      // Clean up script from DOM if the component unmounts
      document.head.removeChild(script);
    };
  }, []);
  useEffect(() => {
    // Render the Google Sign-In button only if the library has loaded
    if (isLibraryLoaded) {
      window.google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size: "large" }  // Customize button options
      );
    }
  }, [isLibraryLoaded]);
  // Only render the div for the button if the library has loaded
  return isLibraryLoaded ? <div id="signInDiv"></div> : <p>Loading...</p>;
}
export default GoogleSignIn;
