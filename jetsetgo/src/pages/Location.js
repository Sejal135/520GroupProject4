// import React, { useState, useEffect } from "react";

// // Review component for displaying individual reviews
// const Review = ({
//   title,             // Title of the review
//   reviewerName,      // Name of the reviewer
//   reviewText,        // Text of the review
//   plusOneCount,      // Number of "plus one" votes
//   profilePic,        // URL of the reviewer's profile picture
//   reviewId,          // Unique ID of the review
//   userId,            // ID of the current user
//   handlePlusOne,     // Function to handle the plus one feature
// }) => (
//   <div className="bg-[#001530] p-4 rounded-lg mb-4">
//     <div className="flex items-center gap-3 mb-4">
//       <img
//         src={profilePic || "/default-avatar.png"} // Default avatar if no profile picture
//         alt={reviewerName} // Alt text for the image
//         className="w-10 h-10 rounded-full"
//       />
//       <div>
//         <h3 className="font-semibold text-[#FFDD00]">{reviewerName}</h3>
//       </div>
//     </div>
//     <h4 className="text-lg font-bold text-[#FFB300] mb-2">{title}</h4>
//     <p className="text-white mb-4">{reviewText}</p>
//     <div className="flex items-center gap-4 text-[#FFDD00]">
//       <button
//         className="flex items-center gap-1 hover:text-[#FFB300]"
//         onClick={() => handlePlusOne(reviewId, userId)} // Trigger plus one on click
//       >
//         +1 ({plusOneCount})
//       </button>
//     </div>
//   </div>
// );

// // Main LocationPage component for displaying location details and reviews
// function LocationPage({
//   query = "Amherst House of Pizza",
//   selectedPlaceId = 4,
//   userId = 40,
// }) {
//   const [locations, setLocations] = useState([]);    // State for storing locations
//   const [reviews, setReviews] = useState([]);        // State for storing reviews
//   const [newTitle, setNewTitle] = useState("");      // State for the new review title
//   const [newComment, setNewComment] = useState("");  // State for the new review comment
//   const [message, setMessage] = useState("");        // State for feedback message

//   // Fetch locations based on the search query
//   useEffect(() => {
//     const fetchLocations = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:8081/GetPlacesByPlacename?placename=${query}&resultsPerPage=5&page=1`
//         );
//         if (response.ok) {
//           const data = await response.json(); // Parse the response as JSON
//           setLocations(data);                  // Update the locations state
//         } else {
//           console.error("Failed to fetch locations");
//         }
//       } catch (error) {
//         console.error("Error fetching locations:", error);
//       }
//     };
//     fetchLocations(); // Call fetch function on component mount
//   }, [query]); // Dependency array to re-fetch when the query changes

//   // Fetch reviews for the selected place
//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:8081/GetAllReviewsForAPlace?placeId=${selectedPlaceId}&resultsPerPage=5&page=1&datePosted=2025-12-10T18:22:57.000-00:00`
//         );
//         if (response.ok) {
//           const data = await response.json(); // Parse the response as JSON
//           setReviews(data);                     // Update the reviews state
//         } else {
//           console.error("Failed to fetch reviews");
//         }
//       } catch (error) {
//         console.error("Error fetching reviews:", error);
//       }
//     };
//     fetchReviews(); // Call fetch function on component mount or place ID change
//   }, [selectedPlaceId]); // Dependency array to re-fetch when the selected place ID changes

//   // Handle review submission
//   const handleSubmitComment = async (e) => {
//     e.preventDefault(); // Prevent default form submission

//     // Check if both title and comment are provided
//     if (!newTitle.trim() || !newComment.trim()) {
//       setMessage("Title and comment are required.");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `http://localhost:8081/AddReviewToDatabase?title=${encodeURIComponent(
//           newTitle
//         )}&userId=${userId}&placeId=${selectedPlaceId}&reviewContents=${encodeURIComponent(
//           newComment
//         )}`,
//         { method: "POST" }
//       );

//       if (response.ok) {
//         setMessage("Review Submitted"); // Success message
//         setNewTitle("");                // Clear title input
//         setNewComment("");              // Clear comment input
//       } else {
//         const errorData = await response.json();
//         console.error("Failed to add review:", errorData);
//         setMessage("Failed to submit the review.");
//       }
//     } catch (error) {
//       console.error("Error adding review:", error);
//       setMessage("An error occurred while submitting the review.");
//     }
//   };

//   // Handle Plus One functionality
//   const handlePlusOne = async (reviewId, userId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:8081/IncrementPlusOne?reviewId=${reviewId}&userId=${userId}`
//       );
//       if (response.ok) {
//         const updatedCount = await response.json(); // Get updated count from the server
//         setReviews((prevReviews) =>
//           prevReviews.map((review) =>
//             review.reviewId === reviewId
//               ? { ...review, plusOneCount: updatedCount } // Update the plus one count for the review
//               : review
//           )
//         );
//       } else {
//         console.error("Failed to increment +1");
//       }
//     } catch (error) {
//       console.error("Error incrementing +1:", error);
//     }
//   };

//   // JSX for the page layout and rendering reviews
//   return (
//     <div className="min-h-screen bg-[#000080] text-white p-6">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-4xl font-bold text-[#FFDD00] mb-4">{query}</h1>

//         {/* Review Submission Section */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-semibold text-[#FFDD00] mb-4">
//             Write a Review
//           </h2>
//           <form onSubmit={handleSubmitComment} className="space-y-4">
//             <input
//               type="text"
//               value={newTitle}
//               onChange={(e) => setNewTitle(e.target.value)}
//               placeholder="Title of your review"
//               className="w-full p-3 rounded-lg bg-[#001530] text-white border border-[#FFDD00] focus:outline-none focus:border-[#FFB300]"
//             />
//             <textarea
//               value={newComment}
//               onChange={(e) => setNewComment(e.target.value)}
//               placeholder="Share your experience..."
//               className="w-full p-3 rounded-lg bg-[#001530] text-white border border-[#FFDD00] focus:outline-none focus:border-[#FFB300]"
//               rows="4"
//             />
//             <button
//               type="submit"
//               className="bg-[#FFB300] text-[#000080] px-6 py-2 rounded-lg hover:bg-[#FFDD00]"
//             >
//               Submit Review
//             </button>
//           </form>
//           {message && <p className="text-center mt-4">{message}</p>}
//         </div>

//         {/* Reviews Section */}
//         <div>
//           <h2 className="text-2xl font-semibold text-[#FFDD00] mb-4">
//             User Reviews
//           </h2>
//           {reviews.length === 0 ? (
//             <p className="text-center text-gray-500">
//               No reviews found for this location.
//             </p>
//           ) : (
//             reviews.map((review) => (
//               <Review
//                 key={review.reviewId}
//                 title={review.title}
//                 reviewerName={review.reviewerId.username}
//                 reviewText={review.review}
//                 plusOneCount={review.plusOneCount}
//                 profilePic={review.reviewerId.profilePic}
//                 reviewId={review.reviewId}
//                 userId={userId}
//                 handlePlusOne={handlePlusOne}
//               />
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LocationPage;


import React, { useState, useEffect } from "react";

// Review component for displaying individual reviews
const Review = ({
  title,             // Title of the review
  reviewerName,      // Name of the reviewer
  reviewText,        // Text of the review
  plusOneCount,      // Number of "plus one" votes
  profilePic,        // URL of the reviewer's profile picture
  reviewId,          // Unique ID of the review
  userId,            // ID of the current user
  handlePlusOne,     // Function to handle the plus one feature
}) => (
  <div className="bg-[#001530] p-4 rounded-lg mb-4">
    <div className="flex items-center gap-3 mb-4">
      <img
        src={profilePic || "/default-avatar.png"} // Default avatar if no profile picture
        alt={reviewerName} // Alt text for the image
        className="w-10 h-10 rounded-full"
      />
      <div>
        <h3 className="font-semibold text-[#FFDD00]">{reviewerName}</h3>
      </div>
    </div>
    <h4 className="text-lg font-bold text-[#FFB300] mb-2">{title}</h4>
    <p className="text-white mb-4">{reviewText}</p>
    <div className="flex items-center gap-4 text-[#FFDD00]">
      <button
        className="flex items-center gap-1 hover:text-[#FFB300]"
        onClick={() => handlePlusOne(reviewId, userId)} // Trigger plus one on click
      >
        +1 ({plusOneCount})
      </button>
    </div>
  </div>
);

// Main LocationPage component for displaying location details and reviews
function LocationPage({
  query = "Amherst House of Pizza",
  selectedPlaceId = 1,
  userId = 49,
}) {
  const [locations, setLocations] = useState([]);    // State for storing locations
  const [reviews, setReviews] = useState([]);        // State for storing reviews
  const [newTitle, setNewTitle] = useState("");      // State for the new review title
  const [newComment, setNewComment] = useState("");  // State for the new review comment
  const [message, setMessage] = useState("");        // State for feedback message

  // Fetch locations based on the search query
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/GetPlacesByPlacename?placename=${query}&resultsPerPage=5&page=1`
        );
        if (response.ok) {
          const data = await response.json(); // Parse the response as JSON
          setLocations(data);                  // Update the locations state
        } else {
          console.error("Failed to fetch locations");
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations(); // Call fetch function on component mount
  }, [query]); // Dependency array to re-fetch when the query changes

  // Fetch reviews for the selected place
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/GetAllReviewsForAPlace?placeId=${selectedPlaceId}&resultsPerPage=5&page=1&datePosted=2025-12-10T18:22:57.000-00:00`
        );
        if (response.ok) {
          const data = await response.json(); // Parse the response as JSON
          setReviews(data);                     // Update the reviews state
        } else {
          console.error("Failed to fetch reviews");
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews(); // Call fetch function on component mount or place ID change
  }, [selectedPlaceId]); // Dependency array to re-fetch when the selected place ID changes

  // Handle review submission
  const handleSubmitComment = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Check if both title and comment are provided
    if (!newTitle.trim() || !newComment.trim()) {
      setMessage("Title and comment are required.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8081/AddReviewToDatabase?title=${encodeURIComponent(
          newTitle
        )}&userId=${userId}&placeId=${selectedPlaceId}&reviewContents=${encodeURIComponent(
          newComment
        )}`,
        { method: "POST" }
      );

      if (response.ok) {
        setMessage("Review Submitted"); // Success message
        setNewTitle("");                // Clear title input
        setNewComment("");              // Clear comment input
      } else {
        const errorData = await response.json();
        console.error("Failed to add review:", errorData);
        setMessage("Failed to submit the review.");
      }
    } catch (error) {
      console.error("Error adding review:", error);
      setMessage("An error occurred while submitting the review.");
    }
  };

  // Handle Plus One functionality
  const handlePlusOne = async (reviewId, userId) => {
    try {
      const response = await fetch(
        `http://localhost:8081/IncrementPlusOne?reviewId=${reviewId}&userId=${userId}`
      );
      if (response.ok) {
        const updatedCount = await response.json(); // Get updated count from the server
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review.reviewId === reviewId
              ? { ...review, plusOneCount: updatedCount } // Update the plus one count for the review
              : review
          )
        );
      } else {
        console.error("Failed to increment +1");
      }
    } catch (error) {
      console.error("Error incrementing +1:", error);
    }
  };

  // JSX for the page layout and rendering reviews
  return (
    <div className="min-h-screen bg-[#000080] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#FFDD00] mb-4">{query}</h1>

        {/* Review Submission Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#FFDD00] mb-4">
            Write a Review
          </h2>
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Title of your review"
              className="w-full p-3 rounded-lg bg-[#001530] text-white border border-[#FFDD00] focus:outline-none focus:border-[#FFB300]"
            />
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your experience..."
              className="w-full p-3 rounded-lg bg-[#001530] text-white border border-[#FFDD00] focus:outline-none focus:border-[#FFB300]"
              rows="4"
            />
            <button
              type="submit"
              className="bg-[#FFB300] text-[#000080] px-6 py-2 rounded-lg hover:bg-[#FFDD00]"
            >
              Submit Review
            </button>
          </form>
          {message && <p className="text-center mt-4">{message}</p>}
        </div>

        {/* Reviews Section */}
        <div>
          <h2 className="text-2xl font-semibold text-[#FFDD00] mb-4">
            User Reviews
          </h2>
          {reviews.length === 0 ? (
            <p className="text-center text-gray-500">
              No reviews found for this location.
            </p>
          ) : (
            reviews.map((review) => (
              <Review
                key={review.reviewId}
                title={review.title}
                reviewerName={review.reviewerId.username}
                reviewText={review.review}
                plusOneCount={review.plusOneCount}
                profilePic={review.reviewerId.profilePic}
                reviewId={review.reviewId}
                userId={userId}
                handlePlusOne={handlePlusOne}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default LocationPage;
