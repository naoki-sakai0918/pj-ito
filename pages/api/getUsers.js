import { WebClient } from '@slack/web-api';

const web = new WebClient(process.env.SLACK_API_TOKEN);

export default async function handler(req, res) {
  try {
    const users = await web.users.list();
    const activeUsers = users.members
      .filter(user => !user.deleted && user.name !== 'slackbot' && !user.is_bot && !user.is_restricted)
      .map(user => ({ id: user.id, name: user.name }));
    res.status(200).json(activeUsers);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error for getUsers');
  }
}
