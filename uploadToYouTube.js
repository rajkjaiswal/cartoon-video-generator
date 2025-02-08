const { google } = require('googleapis');
const fs = require('fs');
require('dotenv').config();

async function uploadToYouTube(videoPath, title = 'Cartoon Video', description = 'Enjoy this fun animation!') {
    const auth = new google.auth.OAuth2(
        process.env.YOUTUBE_CLIENT_ID,
        process.env.YOUTUBE_CLIENT_SECRET,
        process.env.YOUTUBE_REDIRECT_URI
    );
    auth.setCredentials({ refresh_token: process.env.YOUTUBE_REFRESH_TOKEN });

    const youtube = google.youtube({ version: 'v3', auth });

    const response = await youtube.videos.insert({
        part: 'snippet,status',
        requestBody: { snippet: { title, description, categoryId: '1' }, status: { privacyStatus: 'public' } },
        media: { body: fs.createReadStream(videoPath) },
    });

    console.log(`✅ Video uploaded: https://youtu.be/${response.data.id}`);
}

module.exports = uploadToYouTube;
