# 520 Group Project 4
## Overview of Project: 
520 Group Project Team 4 - Travel Social Media Web Application: JetSetGo

This web application focuses on building a community-driven platform for sharing travel experiences which allow users to personalize their profiles with bios, photos, and travel histories as well as enable them to share reviews, trip itineraries, photos, and videos. Through this application, we aim to facilitate connection through travel groups and following like-minded travelers, bringing them under one umbrella. Hence, creating an engaging and efficient platform for personalized travel planning.

We aim to have 5 main features in our application as listed below:

1. User Profiles

  Profiles will include the following information/statistics:
    1. A name chosen by the user.
    2. A profile picture chosen by the user.
    3. A bio written by the user.
    4. The reviews left by the user’s and rating history for their visited locations.
    5. The user’s follower count.

2. Reviews

  Reviews will include the following information:
    1. A title for the review.
    2. The contents of the review itself.
    3. The name of the reviewer.
    4. The time at which review was posted.
    5. A +1 count (each user reading the review can +1 it or not).

3. Saving Favorite Destinations

   Users can do the following with the list: 
     1. Reference the list for their own later use.
     2. Share a subset of their destinations with a subset of people (everyone, trusted individuals, etc.).

4. User Registration

   Registration and Authentication will support the following methods:
     1. Username/Password.
     2. Authentication via Google Account.
     3. OpenID Connect | Authentication | Google for Developers

5. Travel Group Chat

     Travel groups will allow users to do the following:
       1. Connect with like-minded people.
       2. Share locations in which people may have a common interest.
       3. Chat with other people in the travel group to share travel ideas and plans.


   ## Tech Stack:
   <img width="769" alt="Screenshot 2024-12-10 at 9 02 18 PM" src="https://github.com/user-attachments/assets/f6ec5ae5-87fa-4e7f-98fd-d7c3e3aa66d4">
   
   ## API Documentation:
   View here: https://docs.google.com/document/d/1LLIWDP5s1EmTmkEg3Y5JPKoTGApa3UXphFSGHcDCjoc/edit?usp=sharing

   ## Backend Testing:

   JUnit test were written to test all database operations in our codebase. H2 was used to serve as an in-memory database in the testing environment.
   
   ## Frontend Testing:
   Given the project's timeline, our team prioritized core functionality over automated testing to ensure the application met its key deliverables.

   ### Sign In:
   ![image](https://github.com/user-attachments/assets/94f2b37d-0f10-44d8-b0f7-ecfaf483a2b3)
   ![image](https://github.com/user-attachments/assets/0b723ec2-53df-4f77-8cf4-35fab9c30f04)
   
     Upon Sign In:
     - Prompt new users to the Create Profile page.
     - Direct existing users to the Home page. 

    ## Create Profile Page:
   ![image](https://github.com/user-attachments/assets/0d35f415-209b-4531-947e-3cf3fe5a012c)
 
   

    ## 
   ### Seeing all Saved Destinations:
   ![image](https://github.com/user-attachments/assets/fe2d8c29-5041-4217-868d-3a73b7296c67)
   Category-wise:
   ![image](https://github.com/user-attachments/assets/6427a279-7d4f-4f12-b5d4-9660df8c9be5)

  ### Navigating to view your own profile, and your chats and to log out: 
  ![image](https://github.com/user-attachments/assets/ce88d158-909b-41ea-94db-51974a0ea98a)

  ### Profile:
  Similar to other social media platforms, users will have their own profile.
  Profiles will include the following information/statistics:
  * Name
  * User’s Profile Picture
  * User Bio
  * Follower Count
  * Number of Reviews Made
  * Travel Preferences
  <img width="1391" alt="Screenshot 2024-12-10 at 9 10 53 PM" src="https://github.com/user-attachments/assets/9c207034-3f27-4600-bdfc-a1d5cf4be9ab">

  

  
  ### Edit Profile:
  Navigate using 'Edit Profile' from Profile page. 
   - Name and Date of Birth cannot be modified.
   - Current Bio and Location should populate based on whats's in the database for you currently (current profile information). 
   ![image](https://github.com/user-attachments/assets/d680d4ea-ad63-45c2-bb73-14b02caf53a6)


## Installation Instructions
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Sejal135/520GroupProject4.git
   ```

2. **Navigate to the Project Directory:**
   ```bash
   cd jetsetgo
   ```

3. **Install Dependencies:**
   - For the backend:
     ```bash
     cd backend
     mvn clean install
     ```
   - For the frontend:
     ```bash
     cd frontend
     npm install
     ```

4. **Start the Application:**
   - Start the backend server:
     ```bash
     mvn spring-boot:run
     ```
   - Start the frontend development server:
     ```bash
     npm start
     ```

## Configuration
### Backend Configuration:
1. **Environment Variables**
  - Add `TRAVEL_APP_DATABASE_CONNECTION_STRING` to the environment variables on your system. This should take the place of a connection string to a PostgreSQL database.

### Frontend Configuration:
1. **Environment Variables:**
   - Create a `.env` file in the `frontend` directory.
   - Add the following variables:
     ```env
     PORT=8080
     ```

---

### Example Run:
To run the entire project:
1. Start the backend server in one terminal:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

2. Start the frontend in another terminal:
   ```bash
   cd frontend
   npm start
   ```

Visit `http://localhost:8080` to access the application.
