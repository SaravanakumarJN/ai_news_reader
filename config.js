const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.AI_API_KEY,
});
const openAI = new OpenAIApi(configuration);

module.exports = { openAI };
