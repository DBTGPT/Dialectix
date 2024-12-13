const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env

async function getGPTResponse(userInput) {
    const endpoint = `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_MODEL}/completions?api-version=2024-10-01`;

    const headers = {
        "Content-Type": "application/json",
        "api-key": process.env.AZURE_OPENAI_KEY,
    };

    const body = {
        prompt: userInput, // The user input or system prompt
        max_tokens: 800,   // Adjust as needed for response length
        temperature: 0.7,  // Controls response randomness
    };

    try {
        const response = await axios.post(endpoint, body, { headers });
        return response.data.choices[0].text; // Return GPT-4o's response
    } catch (error) {
        console.error("Error calling Azure OpenAI API:", error.message);
        throw new Error("Failed to fetch GPT response");
    }
}

module.exports = { getGPTResponse };
