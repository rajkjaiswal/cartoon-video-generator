const axios = require('axios');
require('dotenv').config();
const fs = require('fs');

async function generateImage(prompt, outputPath = 'image.png') {
    const response = await axios.post(
        'https://api.openai.com/v1/images/generations',
        { prompt, n: 1, size: '512x512' },
        { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    );

    const imageUrl = response.data.data[0].url;
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    fs.writeFileSync(outputPath, imageResponse.data);
    console.log(`✅ Cartoon image saved as: ${outputPath}`);
}

module.exports = generateImage;
