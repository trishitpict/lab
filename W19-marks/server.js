const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// a) Create a Database called student
mongoose.connect('mongodb://localhost:27017/student')
    .then(() => console.log("Connected to 'student' database"))
    .catch(err => console.error(err));

// b) Create a collection called studentmarks
const studentSchema = new mongoose.Schema({
    Name: String,
    Roll_No: Number,
    WAD_Marks: Number,
    CC_Marks: Number,
    DSBDA_Marks: Number,
    CNS_Marks: Number,
    AI_marks: Number,
    Maths_Marks: Number,   // Added for task (h)
    Science_Marks: Number  // Added for task (h)
});

const Student = mongoose.model('studentmarks', studentSchema);

// c) Insert array of documents
async function seedData() {
    const count = await Student.countDocuments();
    if (count === 0) {
        const students = [
            { Name: "ABC", Roll_No: 111, WAD_Marks: 25, CC_Marks: 25, DSBDA_Marks: 25, CNS_Marks: 25, AI_marks: 25, Maths_Marks: 35, Science_Marks: 35 },
            { Name: "John", Roll_No: 112, WAD_Marks: 30, CC_Marks: 30, DSBDA_Marks: 22, CNS_Marks: 28, AI_marks: 26, Maths_Marks: 45, Science_Marks: 42 },
            { Name: "Jane", Roll_No: 113, WAD_Marks: 20, CC_Marks: 15, DSBDA_Marks: 18, CNS_Marks: 12, AI_marks: 14, Maths_Marks: 30, Science_Marks: 30 },
            { Name: "Bob", Roll_No: 114, WAD_Marks: 45, CC_Marks: 48, DSBDA_Marks: 42, CNS_Marks: 40, AI_marks: 44, Maths_Marks: 50, Science_Marks: 50 }
        ];
        await Student.insertMany(students);
        console.log("Initial data seeded.");
    }
}
seedData();

// d) Display total count and list all documents
app.get('/api/students', async (req, res) => {
    const students = await Student.find();
    const count = await Student.countDocuments();
    res.json({ students, count });
});

// e) Names of students who got more than 20 in DSBDA
app.get('/api/students/dsbdahigh', async (req, res) => {
    const names = await Student.find({ DSBDA_Marks: { $gt: 20 } }, 'Name');
    res.json(names);
});

// f) Update marks of specified student by 10 (Increments WAD_Marks)
app.put('/api/students/update/:roll', async (req, res) => {
    await Student.updateOne(
        { Roll_No: req.params.roll },
        { $inc: { WAD_Marks: 10, CC_Marks: 10, DSBDA_Marks: 10, CNS_Marks: 10, AI_marks: 10 } }
    );
    res.send("Marks updated by 10.");
});

// g) Names who got more than 25 in ALL subjects
app.get('/api/students/allpass', async (req, res) => {
    const students = await Student.find({
        WAD_Marks: { $gt: 25 },
        CC_Marks: { $gt: 25 },
        DSBDA_Marks: { $gt: 25 },
        CNS_Marks: { $gt: 25 },
        AI_marks: { $gt: 25 }
    }, 'Name');
    res.json(students);
});

// h) Names who got less than 40 in both Maths and Science
app.get('/api/students/lowmathscience', async (req, res) => {
    const students = await Student.find({
        Maths_Marks: { $lt: 40 },
        Science_Marks: { $lt: 40 }
    }, 'Name');
    res.json(students);
});

// i) Remove specified student document
app.delete('/api/students/:roll', async (req, res) => {
    await Student.deleteOne({ Roll_No: req.params.roll });
    res.send("Student removed.");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));