const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

async function createVideo(imagePath, audioPath, outputPath = 'output.mp4') {
    return new Promise((resolve, reject) => {
        ffmpeg()
            .input(imagePath)
            .loop(5) // Adjust for longer videos
            .input(audioPath)
            .outputOptions('-c:v libx264', '-c:a aac', '-shortest')
            .save(outputPath)
            .on('end', () => {
                console.log(`✅ Video created: ${outputPath}`);
                resolve(outputPath);
            })
            .on('error', reject);
    });
}

module.exports = createVideo;
