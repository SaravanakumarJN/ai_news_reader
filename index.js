const dotenv = require('dotenv');
dotenv.config();

const { openAI } = require('./config.js');
const { summarizeNews, getNews } = require('./utils.js');

async function runScript() {
  try {
    const { articles } = await getNews('crypto');
    const response = await Promise.all(
      articles.map(async (ele) => {
        const { summary, link, twitter_account, published_date, _score, rank } =
          ele;
        let data = await summarizeNews(openAI, summary);
        // let [news, sentiment_and_reason, predicted_impact] = data
        //   .split('\n')
        //   .filter((ele) => ele.trim() != '')
        //   .map((ele) => ele.split(': ')[1]);
        const payload = {
          // data: { news, sentiment_and_reason, predicted_impact },
          data,
          link,
          published_date,
          source_website_rank: rank,
          // highest score is more related to query
          news_reliability_score: _score,
          ...(twitter_account && { twitter_account }),
        };
        return payload;
      })
    );

    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

runScript();
