import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);

  // Câu 48: React State cho Form
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/students")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Không thể kết nối Backend");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Dữ liệu:", data);
        setStudents(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Câu 49: Gửi dữ liệu POST lên Backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: studentId,
          name: name,
          email: email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert("Lỗi: " + data.message);
        return;
      }

      // Thêm sinh viên mới vào danh sách
      setStudents([...students, data]);

      // Xóa nội dung form
      setStudentId("");
      setName("");
      setEmail("");

      alert("Thêm sinh viên thành công!");
    } catch (error) {
      console.error(error);
      alert("Không thể kết nối Backend!");
    }
  };

  return (
    <div>
      <h1>Quản lý sinh viên</h1>

      {/* Câu 48 + Câu 49 */}
      <h2>Thêm sinh viên</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="MSSV"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />

        <input
          type="text"
          placeholder="Họ tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Thêm sinh viên</button>
      </form>

      {/* Câu 47 */}
      <h2>Danh sách sinh viên</h2>

      {students.length === 0 ? (
        <p>Đang tải dữ liệu hoặc chưa có sinh viên...</p>
      ) : (
        students.map((student) => (
          <div key={student._id}>
            <p>MSSV: {student.studentId}</p>
            <p>Họ tên: {student.name}</p>
            <p>Email: {student.email}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default App;