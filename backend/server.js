import {OpenAI_API_KEY } from '@env';


const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');
const bodyParser = require('body-parser'); // For handling POST requests

const app = express();
const PORT = process.env.PORT || 8080;

// Use CORS and body-parser
app.use(cors());
app.use(bodyParser.json());

const client = new OpenAI({
  apiKey: OpenAI_API_KEY, // Use the environment variable
});

// Declare the prompt correctly
const prompt = `
target language: Japanese
context: supermarket
If the context is unknown, please imply it.
Take the following prompt and remove the interrogative quality and function as if you are a translation teaching app: Your goal is to make this as easy to say as possible with the least amount of complication that still sounds natural in the target language. You should have the original question and a follow-up response, or either a statement with a follow-up question. The text should ONLY ever be returned with nothing else. It should be returned with new lines between each word and nothing. Do not include ANYTHING in the output except for the previously mentioned lines. No extra text, no explanation, no formalities, just the 4 sentences.

Input text: Where are the bananas?

The response should be in the following format this is only an example and if there:
"バナナはどこですか？"
"Where are the bananas?"
"バナナはあちらにあります。"
"The bananas are over there.
Target sentence for translation:"
`;

// GET route to fetch data
app.get('/someData', async (req, res) => {
  try {
    const completion = await client.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4', // Correct model
    });

    const response = completion.choices[0].message.content;
    console.log(response);

    res.json({ message: response });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error fetching data from OpenAI' });
  }
});

// POST route to handle combined prompt and target
app.post('/someotherData', async (req, res) => {
  try {
    // Extract prompt and target from the POST body
    const { prompt, target } = req.body;

    // Combine the prompt and target
    const combinedPrompt = `${prompt} ${target}`;

    // Make the OpenAI API call
    const completion = await client.chat.completions.create({
      messages: [{ role: 'user', content: combinedPrompt }],
      model: 'gpt-4o',
    });

    const response = completion.choices[0].message.content;
    res.json({ message: response });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error fetching data from OpenAI' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
