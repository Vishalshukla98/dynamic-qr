import fs from 'fs';
import path from 'path';

export default function handler(req, res) {

  const { code } = req.query;

  // Read links.json file
  const filePath = path.join(process.cwd(), 'links.json');

  const data = JSON.parse(
    fs.readFileSync(filePath, 'utf8')
  );

  // Find matching URL
  const redirectUrl = data[code];

  // Redirect user
  if (redirectUrl) {

    res.writeHead(302, {
      Location: redirectUrl,
    });

    res.end();

  } else {

    res.status(404).send('QR Not Found');

  }
}