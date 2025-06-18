import { useState } from 'react';
import { buildFeedbackPath, extractFeedback } from '../api/feedback';

function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState();

  function loadFeedbackHandler(id) {
    fetch(`/api/feedback/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFeedbackData(data.feedback);
      }); // /api/some-feedback-id
  }

  return (
    <>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {/* Render each feedback item as a list element */}
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              Show Detail
            </button>
          </li> // Use item ID as key, display feedback text
        ))}
      </ul>
    </>
  );
}

// This function runs at build time (SSG - Static Site Generation)
export async function getStaticProps() {
  // Build the path to the feedback JSON file
  const filePath = buildFeedbackPath();
  // Extract the feedback data from the file
  const data = extractFeedback(filePath);

  // Return the data as props to the page component
  return {
    props: {
      feedbackItems: data, // Pass feedback items to the component as props
    },
  };
}

export default FeedbackPage;
