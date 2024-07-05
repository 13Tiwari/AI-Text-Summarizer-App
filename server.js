const express = require('express');
const generateImage = require('./generateImage');
const app = express();
const port = 3000;
const path = require('path');

app.get('/', (req, res) => {
  res.send('<form action="/generate" method="get"><input type="text" name="prompt" /><button type="submit">Generate Image</button></form>');
});

app.get('/generate', async (req, res) => {
  const prompt = req.query.prompt;
  try {
    const imagePath = await generateImage(prompt);
    res.send(`<img src="/image" alt="Generated Image" />`);
  } catch (error) {
    res.status(500).send('Failed to generate image');
  }
});

app.get('/image', (req, res) => {
  const imagePath = path.join(__dirname, 'generated_image.png');
  res.sendFile(imagePath);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
