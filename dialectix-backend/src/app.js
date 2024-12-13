const { getGPTResponse } = require("./speech");

const express = require("express");
const app = express();

app.use(express.json()); // To parse JSON request bodies

app.post("/api/diary", async (req, res) => {
    const { input } = req.body;

    try {
        const response = await getGPTResponse(input);
        res.json({ response }); // Send GPT-4o's response back to the frontend
    } catch (error) {
        console.error("Error processing user input:", error.message);
        res.status(500).send("An error occurred while processing the request.");
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
