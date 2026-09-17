const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "../mern-demo/.env" });
const mongoose = require("mongoose");
const Student = require("./models/Student");

const app = express();

app.use(cors({
    origin: "*"
}));

app.use(express.json());

// Kết nối MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB Atlas connected!");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error.message);
    });

app.get("/", (req, res) => {
    res.send("Student Management API is running!");
});

// Câu 36: GET danh sách sinh viên
app.get("/api/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({
            message: "Lỗi khi lấy danh sách sinh viên",
            error: error.message
        });
    }
});

// Câu 37: POST thêm sinh viên
app.post("/api/students", async (req, res) => {
    try {
        const student = await Student.create(req.body);

        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({
            message: "Lỗi khi thêm sinh viên",
            error: error.message
        });
    }
});

// Câu 38: PUT - Cập nhật sinh viên
app.put("/api/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!student) {
            return res.status(404).json({
                message: "Không tìm thấy sinh viên"
            });
        }

        res.json(student);
    } catch (error) {
        res.status(400).json({
            message: "Lỗi khi cập nhật sinh viên",
            error: error.message
        });
    }
});

// Câu 39: DELETE - Xóa sinh viên
app.delete("/api/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Không tìm thấy sinh viên"
            });
        }

        res.json({
            message: "Xóa sinh viên thành công",
            student: student
        });
    } catch (error) {
        res.status(400).json({
            message: "Lỗi khi xóa sinh viên",
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 5000;

app.get("/api/hello", (req, res) => {
  res.json({ message: "Backend đang hoạt động!" });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});