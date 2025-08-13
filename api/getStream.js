const ytdl = require('ytdl-core');

export default async function handler(req, res) {
  try {
    const videoId = req.query.videoId;
    if (!videoId) {
      return res.status(400).json({ error: 'Video ID is required' });
    }

    const videoInfo = await ytdl.getInfo(videoId);
    // Find an audio-only format, preferring one with a high bitrate
    const audioFormat = ytdl.chooseFormat(videoInfo.formats, {
      quality: 'highestaudio',
      filter: 'audioonly',
    });

    if (!audioFormat) {
      throw new Error('No suitable audio format found');
    }

    // Set headers to allow cross-origin requests
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.status(200).json({ streamUrl: audioFormat.url });

  } catch (error) {
    console.error('Error fetching stream:', error);
    res.status(500).json({ error: 'Failed to get audio stream URL.' });
  }
}
