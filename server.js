// cat distribution network (cdn) :3

const express = require("express");

const app = express();
const PORT = 4343;

app.get("/", async (req, res) => res.redirect("https://catbox.moe"))

app.get("/:filename", async (req, res) => {
    const { filename } = req.params;
    const videoUrl = `https://files.catbox.moe/${filename}`;
    const userAgent = req.headers['user-agent'] || '';

    try {
        const response = await fetch(videoUrl, { method: 'HEAD' });
        const isDiscord = userAgent.includes('Discordbot');

        if (!response.ok) { console.log("no cat found in box"); return res.redirect(videoUrl); }

        if (isDiscord) {
            res.set('Content-Type', 'text/html');
            
            return res.send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">

                    <meta property="og:site_name" content="lunaui's catbox boxer">
                    <meta property="og:title" content="${filename}">
                    <meta property="og:type" content="video.other">
                    
                    <meta property="og:video" content="${videoUrl}">
                    <meta property="og:video:url" content="${videoUrl}">
                    <meta property="og:video:secure_url" content="${videoUrl}">
                    <meta property="og:video:type" content="video/mp4">
                    <meta property="og:video:width" content="1280">
                    <meta property="og:video:height" content="720">
                    <meta property="og:image" content="${videoUrl}">

                    <meta name="twitter:card" content="player">
                    <meta name="twitter:player" content="${videoUrl}">
                    <meta name="twitter:player:width" content="1280">
                    <meta name="twitter:player:height" content="720">
                    
                    <meta name="theme-color" content="#a4eaed">
                </head>
                
                <body></body>
                
                </html>
            `);
        }

        res.redirect(videoUrl);

    } catch (err) { console.error("cat didn't unbox properly:", err); return res.redirect(videoUrl); }
});

app.listen(PORT, () => {
    console.log(`cat being unboxed on port ${PORT}`);
});