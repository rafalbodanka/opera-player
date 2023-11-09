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

app.get('/get-audio/:id', (req, res) => {
    const { id } = req.params;
    const audioFilePath = path.join(mediaDirectory, 'audio', `${id}.mp3`);

    if (id && /^\d+$/.test(id) && id >= 0 && id <= 9) {
        res.sendFile(audioFilePath, (err) => {
            if (err) {
                res.status(404).send('Audio file not found');
                return
            }
            return
        });
    } else {
        res.status(404).send('Invalid ID');
        return
    }
});

app.get('/get-image/:id', (req, res) => {
    const { id } = req.params;
    const imageFilePath = path.join(mediaDirectory, 'images', `${id}.png`);

    if (id && /^\d+$/.test(id) && id >= 0 && id <= 9) {
        res.sendFile(imageFilePath, (err) => {
            if (err) {
                res.status(404).send('Image file not found');
                return
            }
            return
        });
    } else {
        res.status(404).send('Invalid ID');
        return
    }
});

app.get('/data', async (req, res) => {
    const dataPath = path.join(__dirname, 'media','data.json');
    
    try {
        const data = await fs.readFile(dataPath, 'utf-8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


const port = 5000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});