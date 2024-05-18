# chatGPT-Clone

- Objectif:
  - create a chatgpt clone using React and the OpenAI API

1. Set up react project

   - in vs code terminal in the project directory run
     $ npm create vite@latest your-app-name -- --template react
     $ cd your-app-name
     $ npm install

2. Modify project stucture

   -
   - in the src folder delete the content of App.css and App.js
   - the main app folder clear index.css
   - in index.html, in the head, change title to the name of the app

3. Create the user interface; not to relevant how good it is; have a title, bot chat (incoming message), user chat(outgoing message), text input, and a send button.

4. Understanding how to integrate and make request to an API

   -
   - Integrating a third-party API into a React application involves several steps, including making HTTP requests, handling the data, and rendering it.
   - There are two different methods that can be used, 1) using the built in `fecth` or 2) using a library like `axios`.

   1. Using `fetch`:

   - fetch is a built-in JavaScript function for making HTTP requests.

   ```jsx
   useEffect(() => {
     fetch("https://api.example.com/data")
       .then((response) => {
         if (!response.ok) {
           throw new Error("Network response was not ok");
         }
         return response.json(); // Parse the JSON from the response
       })
       .then((data) => {
         setData(data); // Set the received data to state
         setLoading(false); // Set loading to false
       })
       .catch((error) => {
         setError(error); // Set the error to state
         setLoading(false); // Set loading to false
       });
   }, []); // Empty dependency array means this useEffect runs once after the initial render
   ```

   A complete example:
   Step-by-Step Explanation with fetch

   1. Initialize State: Use useState to create state variables fordata, loading, and error.
   2. Effect Hook: Use useEffect to fetch data when the componentmounts.
   3. Fetch Data: Use fetch to make the API request.
   4. Handle Response: Parse the response JSON and update the state.
   5. Error Handling: Catch any errors and update the error state.
   6. Render UI: Conditionally render the UI based on loading,error, and data states.

   ```jsx
   import React, { useState, useEffect } from "react";

   function App() {
     const [data, setData] = useState([]); // State for storing fetched data
     const [loading, setLoading] = useState(true); // State for loading status
     const [error, setError] = useState(null); // State for error

     useEffect(() => {
       fetch("https://api.example.com/data")
         .then((response) => {
           if (!response.ok) {
             throw new Error("Network response was not ok");
           }
           return response.json(); // Parse JSON from response
         })
         .then((data) => {
           setData(data); // Update data state
           setLoading(false); // Update loading state
         })
         .catch((error) => {
           setError(error); // Update error state
           setLoading(false); // Update loading state
         });
     }, []); // Empty dependency array means this effect runs once

     if (loading) return <div>Loading...</div>; // Show loading indicator
     if (error) return <div>Error: {error.message}</div>; // Show error message

     return (
       <div>
         <h1>Data from API</h1>
         <ul>
           {data.map((item) => (
             <li key={item.id}>{item.name}</li>
           ))}
         </ul>
       </div>
     );
   }

   export default App;
   ```

   Step-by-Step Explanation with axios

   1. Initialize State: Use useState to create state variables fodata, loading, and error.
   2. Effect Hook: Use useEffect to fetch data when the component mounts.
   3. Fetch Data: Use axios.get to make the API request.
   4. Handle Response: Access the response data and update thstate.
   5. Error Handling: Catch any errors and update the error state.
   6. Render UI: Conditionally render the UI based on loadingerror, and data states.

   ```jsx
   import React, { useState, useEffect } from "react";
   import axios from "axios";

   function App() {
     const [data, setData] = useState([]); // State for storing fetched data
     const [loading, setLoading] = useState(true); // State for loading status
     const [error, setError] = useState(null); // State for error

     useEffect(() => {
       axios
         .get("https://api.example.com/data")
         .then((response) => {
           setData(response.data); // Update data state
           setLoading(false); // Update loading state
         })
         .catch((error) => {
           setError(error); // Update error state
           setLoading(false); // Update loading state
         });
     }, []); // Empty dependency array means this effect runs once

     if (loading) return <div>Loading...</div>; // Show loading indicator
     if (error) return <div>Error: {error.message}</div>; // Show error message

     return (
       <div>
         <h1>Data from API</h1>
         <ul>
           {data.map((item) => (
             <li key={item.id}>{item.name}</li>
           ))}
         </ul>
       </div>
     );
   }

   export default App;
   ```

   Key Concepts to Understand:

   1. State Management
      Using useState to manage different states (data, loading, error) in your component.

   2. Side Effects
      Using useEffect to perform side effects such as data fetching. The empty dependency array [] means it runs only once after the initial render.

   3. Conditional Rendering
      Rendering different UI elements based on the state of the component (loading, error, and data states).

   4. Error Handling
      Handling errors gracefully by catching them and updating the error state.

   Note: Some API will require a unique key, API Key, to access them. Consult the company API documentation website on how to obtain this key.

5. Uderstanding the Application flow. Before writting the code, let's understand how the application will flow.

   Application Flow:

   1. Initial AI Message: Start with an initial hardcoded message from the AI displayed on the screen.
   2. User Input: The user types a message into the text input area.
   3. Send Message: The user sends the message by either clicking the send button or pressing the enter key.
   4. Send Request to OpenAI: The user input is sent to the GPT model via the OpenAI API.
   5. Receive AI Response: The model generates a response, which is sent back to the frontend.
   6. Display AI Response: The frontend processes the response and renders it on the screen as part of the chat history.
