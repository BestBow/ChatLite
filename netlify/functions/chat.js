// netlify/functions/chat.js
const { Configuration, OpenAIApi } = require("openai");

exports.handler = async (event) => {
  try {
    const { message } = JSON.parse(event.body);

    const config = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(config);

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: response.data.choices[0].message.content.trim() }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "Something went wrong. Please try again." }),
    };
  }
};
