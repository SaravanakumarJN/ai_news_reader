const axios = require('axios');

async function summarizeNews(openAI, newsData) {
  const query = `${newsData}
  ${process.env.COMMAND_TO_SUMMARIZE}`;

  try {
    const response = await openAI.createCompletion({
      model: 'text-davinci-003',
      prompt: query,
      max_tokens: 3000,
    });

    return response?.data?.choices[0]?.text;
  } catch (error) {
    console.error(error?.response?.data || error?.message);
  }
}

const getNews = (query) => {
  let date = new Date();
  date = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;

  const reqConfig = {
    method: 'get',
    url: `${process.env.NEW_PROVIDER_ENDPOINT}search?q=${query}&lang=en&from=${date}&sort_by=rank`,
    headers: {
      'x-api-key': process.env.NEWS_PROVIDER_API_KEY,
    },
  };
  return axios(reqConfig).then((res) => res.data);
};

module.exports = {
  summarizeNews,
  getNews,
};
