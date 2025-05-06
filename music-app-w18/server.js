const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Song = require('./models/Song');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/music', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected")).catch(err => console.log(err));

// Insert initial songs only once (optional)
const insertInitialSongs = async () => {
  const count = await Song.countDocuments();
  if (count === 0) {
    await Song.insertMany([
      { Songname: "Tum Hi Ho", Film: "Aashiqui 2", Music_director: "Mithoon", singer: "Arijit Singh" },
      { Songname: "Kal Ho Na Ho", Film: "Kal Ho Na Ho", Music_director: "Shankar-Ehsaan-Loy", singer: "Sonu Nigam" },
      { Songname: "Kun Faya Kun", Film: "Rockstar", Music_director: "A.R. Rahman", singer: "Mohit Chauhan" },
      { Songname: "Tujh Mein Rab Dikhta Hai", Film: "Rab Ne Bana Di Jodi", Music_director: "Salim-Sulaiman", singer: "Roop Kumar Rathod" },
      { Songname: "Channa Mereya", Film: "Ae Dil Hai Mushkil", Music_director: "Pritam", singer: "Arijit Singh" },
      { Songname: "Raabta", Film: "Agent Vinod", Music_director: "Pritam", singer: "Arijit Singh" },
      { Songname: "Agar Tum Saath Ho", Film: "Tamasha", Music_director: "A.R. Rahman", singer: "Alka Yagnik" },
      { Songname: "Pani Da Rang", Film: "Vicky Donor", Music_director: "Rochak Kohli", singer: "Ayushmann Khurrana" },
      { Songname: "Dil Dhadakne Do", Film: "Zindagi Na Milegi Dobara", Music_director: "Shankar-Ehsaan-Loy", singer: "Shankar Mahadevan" },
      { Songname: "Jeene Laga Hoon", Film: "Ramaiya Vastavaiya", Music_director: "Sajid-Wajid", singer: "Arijit Singh" }
    ]);
    console.log("Songs inserted successfully.");
  } 
};
insertInitialSongs();

// Display total count and all songs
app.get('/', async (req, res) => {
    const { music_director, singer, film, filter } = req.query;  // Get filter parameters
    let filterConditions = {};
    let error = null;
  
    // Only show the error if the filter button is clicked without filling any fields
    if (filter) {
      if (!music_director && !singer && !film) {
        error = "Please fill at least one of the fields to filter songs.";
      }
    }
  
    // Apply filter based on the filled fields
    if (music_director) filterConditions.Music_director = music_director;
    if (singer) filterConditions.singer = singer;
    if (film) filterConditions.Film = film;
  
    // Query songs based on the filter conditions
    const songs = await Song.find(filterConditions);
    const count = await Song.countDocuments(filterConditions);
  
    // Render the page with the filtered results
    res.render('index', { songs, count, music_director, singer, film, error });
});
  
  

// Add a new song
app.post('/add', async (req, res) => {
  const { Songname, Film, Music_director, singer } = req.body;
  try {
    const newSong = new Song({ Songname, Film, Music_director, singer });
    await newSong.save();
    res.redirect('/');
  } catch (error) {
    res.status(500).send("Error adding song.");
  }
});

// Update Actor/Actress for a song
app.post('/update', async (req, res) => {
  const { Songname, Actor, Actress } = req.body;
  try {
    const song = await Song.findOneAndUpdate(
      { Songname },
      { Actor, Actress },
      { new: true }
    );
    if (!song) {
      res.status(404).send("Song not found.");
    } else {
      res.redirect('/');
    }
  } catch (error) {
    res.status(500).send("Error updating song.");
  }
});

// Delete a song by Songname
app.get('/delete/:Songname', async (req, res) => {
  const { Songname } = req.params;
  try {
    await Song.findOneAndDelete({ Songname });
    res.redirect('/');
  } catch (error) {
    res.status(500).send("Error deleting song.");
  }
});

app.listen(3007, () => console.log("Server running at http://localhost:3007"));
