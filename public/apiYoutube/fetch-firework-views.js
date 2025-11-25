const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.YOUTUBE_API_KEY;
const VIDEO_ID = 'QGJuMBdaqIw'; // Firework
const OUT_DIR = path.resolve(__dirname, 'data');
const OUT_FILE = path.join(OUT_DIR, 'views_firework.json');

// garante que a pasta "data" exista
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function fetchViews() {
  const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${VIDEO_ID}&key=${API_KEY}`;
  const res = await axios.get(url);
  const viewCount = res.data.items[0].statistics.viewCount;

  const record = {
    videoId: VIDEO_ID,
    timestamp: new Date().toISOString(),
    viewCount: Number(viewCount)
  };
  
  let data = [];
  if (fs.existsSync(OUT_FILE)) {
    data = JSON.parse(fs.readFileSync(OUT_FILE, 'utf8'));
  }
  data.push(record);
  fs.writeFileSync(OUT_FILE, JSON.stringify(data, null, 2));

  console.log(`✅ Views salvas: ${viewCount} (${new Date().toLocaleString()})`);
}

fetchViews();