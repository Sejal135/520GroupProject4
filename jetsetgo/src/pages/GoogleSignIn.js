import React, { useEffect, useState } from 'react';

function GoogleSignIn() {
  const [isLibraryLoaded, setIsLibraryLoaded] = useState(false);

  /* Callback function to handle the credential response */
  const handleCredentialResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    // Here, you would send the JWT ID token to your server for verification
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
