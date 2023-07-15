import fs from 'fs';
import csv from 'csv-parser';

export default function handler(req, res) {
  try {
    const results = [];
    fs.createReadStream('ito_theme.csv')
      .pipe(csv({ headers: ['theme'] }))
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', () => {
        const randomTheme = results[Math.floor(Math.random() * results.length)].theme;
        res.status(200).json(randomTheme);
      });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error for getRandomTheme');
  }
}
