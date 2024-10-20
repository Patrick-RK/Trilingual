import axios from 'axios';

// Define the structure of the response you expect from the server
interface ChatGPTResponse {
  message: string; // Adjust this type based on the actual response structure
}

// Function that gets the ChatGPT response with TypeScript types
export const getChatGPTResponse = async (target: string): Promise<string[]> => {
  const prompt = `
    target language: Japanese
    context: supermarket
    If the context is unknown, please imply it.
    Take the following prompt parse it for a question or a statement that needs to be translated and function as if you are a translation teaching app:
    Your goal is to make this as easy to say as possible with the least amount of complication that still sounds natural in the target language. 
    the first line returned should be the original question translated into the target language.
    the second line returned should be the question in the original lanaguage.
    the third line should be and a follow-up response, or either a statement with a follow-up question that would keep the flow of the conversation going naturally in the target language.
    The fourth line should be a translation of the third line.
    the response should ONLY ever be returned with those 4 lines. It should be returned with new lines between each word and nothing.
    Do not include ANYTHING in the output except for the previously mentioned lines. No extra text, no explanation, no formalities, just the 4 sentences.

    Here's an example( 
    Input text: Where are the bananas?

    The response should be in the following format this is only an example, it's similar to a call and response where the second two sentences continue the conversation:
    "バナナはどこですか？"
    "Where are the bananas?"
    "バナナはあちらにあります。"
    "The bananas are over there.

    End of example)

    Target sentence for translation:`;

  const combinedPrompt = `${prompt} Input text: ${target}`;
  console.log(combinedPrompt);

  try {
    // Post request to your API
    const response = await axios.post<ChatGPTResponse>('http://192.168.50.30:8080/someOtherData', {
      prompt: combinedPrompt, // Send the prompt combined with user input in the body
    });

    const responseString = response.data.message;
    console.log(responseString); // Assuming 'message' contains the string you need

    // Split by new lines
    const response_list = responseString.split('\n');
    return response_list;
  } catch (error) {
    console.error('Error getting response from ChatGPT:', error);
    throw error;
  }
};

