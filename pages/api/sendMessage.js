import { WebClient } from '@slack/web-api';

const web = new WebClient(process.env.SLACK_API_TOKEN);

export default async function handler(req, res) {
  try {
    const user = req.query.user;
    const msg = req.query.msg;
    const response = await web.chat.postMessage({
      channel: user,
      text: msg,
    });
    console.log(response);
    res.status(200).send('ok');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error for sendMessage');
  }
}

// export default async function handler(req, res) {
//   try {
//     const selectedUserId = JSON.parse(req.query.users);
//     const stage = req.query.stage;
//     const theme = req.query.theme;

//     //全プレイヤーへのメッセージ送信
//     let generatedNumbers = new Set();
//     for (let user of selectedUserId) {
//       let message = `ステージ${stage} : お題は「${theme}」\nあなたの数字は`;
//       for (let i = 1; i <= stage; i++) {
//         let randomNumber;
//         do {
//           randomNumber = Math.floor(Math.random() * 100) + 1;
//         } while (
//           generatedNumbers.has(randomNumber)
//         );
//         generatedNumbers.add(randomNumber);
//         message += randomNumber;
//         if (i != stage) {
//           message += ', ';
//         }
//       }
//       message += 'です！';

//       const response = await web.chat.postMessage({
//         channel: user,
//         text: message,
//       });
//       console.log(response);
//       res.status(200).send('ok');
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Internal Server Error for sendMessage');
//   }
// }
