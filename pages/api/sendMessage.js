import { WebClient } from '@slack/web-api';

const web = new WebClient(process.env.SLACK_API_TOKEN);

export default async function handler(req, res) {
  try {
    const selectedUserId = JSON.parse(req.query.users);
    //全プレイヤーへのメッセージ送信
    for (let user of selectedUserId) {
      let randomNumber;
      let generatedNumbers = new Set();

      do {
        randomNumber = Math.floor(Math.random() * 100) + 1;
      } while (generatedNumbers.has(randomNumber));

      generatedNumbers.add(randomNumber);

      const response = await web.chat.postMessage({
        channel: user,
        text: 'あなたの数字は' + randomNumber + 'です！',
      });
      console.log(response);
      res.status(200).send('ok');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error for sendMessage');
  }
}
