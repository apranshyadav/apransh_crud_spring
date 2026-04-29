import { useEffect, useState } from "react";

function App() {

  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    course: ""
  });

  const [editId, setEditId] = useState(null);

  const url = "http://localhost:8080/students";

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = () => {
    fetch(url)
      .then(res => res.json())
      .then(data => setStudents(data));
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const addStudent = () => {
    fetch(url, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(form)
    }).then(() => {
      clearForm();
      loadStudents();
    });
  };

  const updateStudent = () => {
    fetch(url + "/" + editId, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(form)
    }).then(() => {
      clearForm();
      loadStudents();
    });
  };

  const deleteStudent = (id) => {
    fetch(url + "/" + id, {
      method: "DELETE"
    }).then(() => {
      loadStudents();
    });
  };

  const editStudent = (s) => {
    setForm({
      name: s.name,
      email: s.email,
      course: s.course
    });
    setEditId(s.id);
  };

  const clearForm = () => {
    setForm({ name: "", email: "", course: "" });
    setEditId(null);
  };

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>

      <h2>Student Management</h2>
      <p>Project by Apransh</p>

      <div style={{ marginBottom: "20px" }}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="course" placeholder="Course" value={form.course} onChange={handleChange} />

        <br /><br />

        {editId === null ? (
          <button onClick={addStudent}>Add Student</button>
        ) : (
          <>
            <button onClick={updateStudent}>Update Student</button>
            <button onClick={clearForm}>Cancel</button>
          </>
        )}
      </div>

      <table border="1" style={{ margin: "auto", width: "80%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.course}</td>
              <td>
                <button onClick={() => editStudent(s)}>Edit</button>
                <button onClick={() => deleteStudent(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default App;