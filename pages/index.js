import { useRef, useState } from 'react';

function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState([]);
  // State to store the list of feedbacks

  const emailInputRef = useRef();
  const feedbackInputRef = useRef();
  // Refs to access the input fields directly

  function submitFormHandler(event) {
    event.preventDefault(); // Prevent page reload on form submission

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;
    // Reading values from the input fields using refs

    const reqBody = { email: enteredEmail, text: enteredFeedback };
    // Creating the request payload

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFeedbackItems(data.feedback);
        // Updating the state with the feedback returned from the server
      });
  }

  function loadFeedbackHandler() {
    fetch('/api/feedback')
      .then((response) => response.json())
      .then((data) => {
        setFeedbackItems(data.feedback);
        // Fetching stored feedbacks from the backend and updating the UI
      });
  }

  return (
    <div>
      <h1>The Home Page</h1>

      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
          {/* Input field for user's email with a ref */}
        </div>

        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef}></textarea>
          {/* Textarea for user feedback with a ref */}
        </div>

        <button>Send Feedback</button>
        {/* Submit button for sending the feedback */}
      </form>

      <hr />

      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      {/* Button to manually fetch and display feedbacks */}

      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>{item.text}</li>
          // Displaying each feedback item as a list element
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
