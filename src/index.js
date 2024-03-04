const express = require('express');
const Shorturly = require('shorturly');

const app = express();
const shortener = new Shorturly();

// Middleware to parse JSON bodies
app.use(express.json());

// Route to shorten a URL
app.post('/shorten', (req, res) => {
    const originalUrl = req.body.url;
    if (!originalUrl) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const shortUrl = shortener.shortenUrl(originalUrl);
    res.json({ shortUrl });
});

// Route to expand a short URL
app.get('/:shortCode', (req, res) => {
    const shortUrl = req.params.shortCode;
    const expandedUrl = shortener.expandUrl(shortUrl);
    if (expandedUrl === 'Short URL not found') {
        return res.status(404).json({ error: 'Short URL not found' });
    }

    res.redirect(expandedUrl);
});

// Start the server
const startServer = (port = 3000) => {
    app.listen(port, () => {
        console.log(`Shortener Server is running on port ${port}`);
    });
};

module.exports = startServer;

// Start the server if file is executed directly
if (require.main === module) {
    startServer();
}
