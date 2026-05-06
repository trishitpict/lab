const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// a) Create Database called music
mongoose.connect('mongodb://localhost:27017/music')
    .then(() => console.log("Connected to music database"))
    .catch(err => console.error(err));

// b) Create a collection called songdetails
const songSchema = new mongoose.Schema({
    Songname: String,
    Film: String,
    Music_director: String,
    singer: String,
    Actor: String,
    Actress: String
});

const Song = mongoose.model('songdetails', songSchema);

// c) Insert array of 5 initial song documents
async function seedDatabase() {
    const count = await Song.countDocuments();
    if (count === 0) {
        const initialSongs = [
            { Songname: "ABC", Film: "DEF", Music_director: "GHI", singer: "JKL", Actor: "MNO", Actress: "PQR" },
            { Songname: "Song2", Film: "Film2", Music_director: "Director2", singer: "Singer2", Actor: "MNO", Actress: "Actress2" },
            { Songname: "Song3", Film: "Film3", Music_director: "Director2", singer: "Singer3", Actor: "Actor2", Actress: "PQR" },
            { Songname: "Song4", Film: "Film2", Music_director: "GHI", singer: "Singer2", Actor: "MNO", Actress: "PQR" },
            { Songname: "Song5", Film: "Film4", Music_director: "Director4", singer: "JKL", Actor: "Actor3", Actress: "Actress3" }
        ];
        await Song.insertMany(initialSongs);
        console.log("5 Initial songs inserted.");
    }
}
seedDatabase();

// d) List all documents and total count
app.get('/api/songs', async (req, res) => {
    const songs = await Song.find();
    const totalCount = await Song.countDocuments();
    res.json({ songs, totalCount });
});

// e) List specified Music Director songs
app.get('/api/songs/director/:name', async (req, res) => {
    const songs = await Song.find({ Music_director: req.params.name });
    res.json(songs);
});

// f) List specified Music Director songs sung by specified Singer
app.get('/api/songs/filter', async (req, res) => {
    const { director, singer } = req.query;
    const songs = await Song.find({ Music_director: director, singer: singer });
    res.json(songs);
});

// g) Delete the song which you don't like
app.delete('/api/songs/:id', async (req, res) => {
    await Song.findByIdAndDelete(req.params.id);
    res.send("Song deleted successfully.");
});

// h) Add new song
app.post('/api/songs', async (req, res) => {
    const newSong = new Song(req.body);
    await newSong.save();
    res.send("New song added.");
});

// i) List Songs sung by Specified Singer from specified film
app.get('/api/songs/search', async (req, res) => {
    const { singer, film } = req.query;
    const songs = await Song.find({ singer: singer, Film: film });
    res.json(songs);
});

// j) Update document by adding Actor and Actress name
app.put('/api/songs/update-actors', async (req, res) => {
    // Updating all current records with sample names as per the table requirement
    await Song.updateMany({}, { $set: { Actor: "MNO", Actress: "PQR" } });
    res.send("Documents updated with Actor and Actress names.");
});

app.listen(3000, () => console.log("Server running on port 3000"));