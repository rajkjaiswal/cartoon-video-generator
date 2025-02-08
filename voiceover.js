const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
require('dotenv').config();

const client = new textToSpeech.TextToSpeechClient();

async function generateVoiceover(text, outputPath = 'voiceover.mp3') {
    const request = {
        input: { text },
        voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
        audioConfig: { audioEncoding: 'MP3' },
    };

    const [response] = await client.synthesizeSpeech(request);
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(outputPath, response.audioContent, 'binary');
    console.log(`✅ Voiceover saved as: ${outputPath}`);
}

module.exports = generateVoiceover;
