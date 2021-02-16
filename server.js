// A very basic express server for local development.
const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.static('build'));
const port = process.env.PORT || 3030;
app.listen(port, () => {
    console.log(`Dev server running at http://localhost:${port}`);
});
