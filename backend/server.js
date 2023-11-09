import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from "fs/promises"
import cors from 'cors';

const app = express();

app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mediaDirectory = path.join(__dirname, 'media');

app.get('/get-audio/:id', async (req, res) => {
    const { id } = req.params;
    if (id && /^\d+$/.test(id) && id >= 0 && id <= 9) {
        const audioFilePath = path.join(mediaDirectory, 'audio', `${id}.mp3`);
        
        // Use try-catch to handle any errors when sending the file
        try {
            res.sendFile(audioFilePath, (err) => {
                if (err) {
                    if (!res.headersSent) {
                        // Check if headers have been sent, and if not, send an error response
                        console.log(err);
                        return res.status(404).send('Audio file not found');
                    }
                }
            });
        } catch (err) {
            console.log(err);
            if (!res.headersSent) {
                // Check if headers have been sent, and if not, send an error response
                return res.status(500).send('Internal Server Error');
            }
        }
    } else {
        return res.status(404).send('Invalid ID');
    }
});

app.get('/get-image/:id', async (req, res) => {
    const { id } = req.params;
    const imageFilePath = path.join(mediaDirectory, 'images', `${id}.png`);

    if (id && /^\d+$/.test(id) && id >= 0 && id <= 9) {
        return res.sendFile(imageFilePath, (err) => {
            if (err) {
                return res.status(404).send('Image file not found');
            }
            return
        });
    } else {
        return res.status(404).send('Invalid ID');
    }
});

app.get('/data', async (req, res) => {
    const dataPath = path.join(__dirname, 'media','data.json');
    
    await fs.readFile(dataPath, 'utf-8')
      .then((data) => {
        return res.json(JSON.parse(data));
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).send('Internal Server Error');
      });
      return
  });


const port = 5000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});