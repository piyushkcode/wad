const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/student');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/student', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected."))
  .catch(err => console.log("MongoDB error:", err));

const sampleData = [
  { Name: "Alice", Roll_No: 1, WAD_Marks: 22, CC_Marks: 24, DSBDA_Marks: 30, CNS_Marks: 25, AI_marks: 21 },
  { Name: "Bob", Roll_No: 2, WAD_Marks: 19, CC_Marks: 15, DSBDA_Marks: 28, CNS_Marks: 29, AI_marks: 24 },
  { Name: "Charlie", Roll_No: 3, WAD_Marks: 26, CC_Marks: 26, DSBDA_Marks: 27, CNS_Marks: 27, AI_marks: 28 },
  { Name: "David", Roll_No: 4, WAD_Marks: 35, CC_Marks: 36, DSBDA_Marks: 37, CNS_Marks: 35, AI_marks: 38 },
  { Name: "Eve", Roll_No: 5, WAD_Marks: 40, CC_Marks: 41, DSBDA_Marks: 42, CNS_Marks: 43, AI_marks: 44 },
  { Name: "Frank", Roll_No: 6, WAD_Marks: 20, CC_Marks: 21, DSBDA_Marks: 22, CNS_Marks: 23, AI_marks: 24 },
  { Name: "Grace", Roll_No: 7, WAD_Marks: 30, CC_Marks: 31, DSBDA_Marks: 32, CNS_Marks: 33, AI_marks: 34 }
];

// Insert Sample Data if DB is empty
// Sample Data Insertion if DB is empty
app.get('/insert', async (req, res) => {
  const count = await Student.countDocuments();
  if (count === 0) {
    await Student.insertMany(sampleData);
    const students = await Student.find();
    const count = await Student.countDocuments();
    res.render('index', { students, count, heading: "Sample Data Inserted", isSample: true });
  } else {
    const students = await Student.find();
    const count = await Student.countDocuments();
    res.render('index', { students, count, heading: "Data Already Exists", isSample: false });
  }
});


// Home Route
app.get('/', async (req, res) => {
  const students = await Student.find();
  const count = await Student.countDocuments();
  res.render('index', { students, count, heading: "All Student Data", isSample: false });
});


// Filter Route
// Filter Route (multiple subject filtering)
app.get('/filter', async (req, res) => {
  const query = {};
  const opMap = { gt: "$gt", lt: "$lt", eq: "$eq" };

  Object.keys(req.query).forEach(key => {
    if (key.startsWith("subject")) {
      const index = key.replace("subject", "");
      const subject = req.query[`subject${index}`];
      const operator = req.query[`operator${index}`];
      const marks = req.query[`marks${index}`];

      if (subject && operator && marks) {
        query[subject] = { [opMap[operator]]: parseInt(marks) };
      }
    }
  });

  const students = await Student.find(query);
  res.render('index', { students, count: students.length, heading: "Filtered Student Data", isSample: false });
});


// Update Marks
app.post('/update-marks', async (req, res) => {
  const { Roll_No, subject, marks } = req.body;
  await Student.updateOne({ Roll_No: parseInt(Roll_No) }, { $set: { [subject]: parseInt(marks) } });
  res.redirect('/');
});


// Add Student (with Roll No Check)
app.post('/add', async (req, res) => {
  const { Name, Roll_No, WAD_Marks, CC_Marks, DSBDA_Marks, CNS_Marks, AI_marks } = req.body;

  const existingStudent = await Student.findOne({ Roll_No });
  if (existingStudent) {
    const students = await Student.find();
    const count = await Student.countDocuments();
    return res.render('index', { students, count, heading: "Error: Duplicate Roll Number!" });
  }

  const newStudent = new Student({ Name, Roll_No, WAD_Marks, CC_Marks, DSBDA_Marks, CNS_Marks, AI_marks });
  await newStudent.save();
  res.redirect('/');
});

// Delete Student
app.post('/delete-student', async (req, res) => {
  const { Roll_No } = req.body;
  await Student.deleteOne({ Roll_No });
  res.redirect('/');
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));