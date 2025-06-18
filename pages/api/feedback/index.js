import fs from 'fs';
import path from 'path';

export function buildFeedbackPath() {
  // Build the absolute path to the feedback.json file inside the "data" folder
  return path.join(process.cwd(), 'data', 'feedback.json');
}

export function extractFeedback(filePath) {
  const fileData = fs.readFileSync(filePath); // Read the contents of the feedback.json file
  const data = JSON.parse(fileData); // Parse the file data from JSON string into a JavaScript array
  return data;
}

function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email; // Extract the 'email' field from the request body
    const feedbackText = req.body.text; // Extract the 'text' field from the request body

    const newFeedback = {
      id: new Date().toISOString(), // Generate a unique ID using the current timestamp in ISO format
      email, // Store the email address
      text: feedbackText, // Store the feedback text
    };

    // store that in a database or in a file
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);

    data.push(newFeedback); // Add the new feedback object to the array
    fs.writeFileSync(filePath, JSON.stringify(data)); // Write the updated array back to the file as a JSON string

    res.status(201).json({ message: 'Success!', feedback: newFeedback }); // Send a 201 (Created) response with a success message and the new feedback
  } else {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    res.status(200).json({ feedback: data }); // For non-POST requests, send a simple success message
  }
}

export default handler;
