const generateVoiceover = require('./voiceover');
const generateImage = require('./generateImages');
const createVideo = require('./videoProcessor');
const uploadToYouTube = require('./uploadToYouTube');

async function main() {
    console.log('🎬 Starting cartoon video generation...');
    
    const text = "Once upon a time, in a magical land, a small rabbit discovered a hidden treasure.";
    await generateVoiceover(text, 'voiceover.mp3');
    
    await generateImage("A cartoon rabbit finding treasure in a forest", 'image.png');

    await createVideo('image.png', 'voiceover.mp3', 'cartoon.mp4');

    await uploadToYouTube('cartoon.mp4', 'Amazing Cartoon Video', 'Enjoy this AI-generated animation!');
}

main().catch(console.error);
