import React from "react";
import './App.css';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      students: [
        {
          id: 1,
          name: "John Klassen",
          subject: "Physics",
          marks: 73,
          passed: true
        },
        {
          id: 2,
          name: "Travis Scout",
          subject: "Maths",
          marks: 89,
          passed: true
        },
        {
          id: 3,
          name: "Michael Stokes",
          subject: "Chemistry",
          marks: 39,
          passed: false
        }
      ],
      newStudent: {
        name: "",
        subject: "",
        marks: ""
      }
    }
  }

  showAllStudents() {

    if (this.state.students.length == 0) {
      return (
        <div className="empty-state">
          <span>No students data found! Add student to see a student's list.</span>
        </div>
      )
    }

    return this.state.students.map(student => (
      <div className={`student-card ${student.passed ? "passed" : "failed"}`} key={student.id}>

        <div className="card-header">
          <h3>{student.name}</h3>
        </div>

        <div className="card-data">
          <p><strong>Subject: </strong>{student.subject}</p>
          <p><strong>Marks: </strong>{student.marks}</p>
          <p><strong>Result: </strong>{student.passed ? "Pass" : "Fail"}</p>
        </div>

        <div className="card-bottom">
          <button onClick={()=> this.handleDelete(student.id)}>Delete</button>
        </div>
      </div>
    ))
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const {name, subject, marks} = this.state.newStudent;

    // if any of the input in blank
    if(!name.trim() || !subject.trim() || !marks){
      console.log(name)
      console.log(subject)
      console.log(marks)
      alert("Please fill in all fields");
      return;
    }

    const convertedMarks = parseInt(marks, 10);

    if(isNaN(convertedMarks) || convertedMarks > 100 || convertedMarks < 0){
      alert("Please enter marks between 0 to 100 only");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: name.trim(),
      subject: subject,
      marks: convertedMarks,
      passed: convertedMarks >= 40
    }

    this.setState({
      students: [...this.state.students, newStudent],
      newStudent: {
        name: "",
        subject: "",
        marks: ""
      }
    })
  }

  handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this student ?")){
      this.setState({
        students: this.state.students.filter(student => student.id !== id)
      })
    }
  }

  handleInputChange = (event) => {
    const {name, value} = event.target;

    this.setState({
      newStudent: {
        ...this.state.newStudent,
        [name]: value
      }
    })
  }



  render() {
    // console.log(this.state.students)
    return (
      <div className="app">

        <header className="app-header">
          <h1>Student Grade Tracker</h1>
          <p>Student dashboard built with class based components</p>
        </header>

        <main className="app-main">

          <section>
            <h2>Student's List ({this.state.students.length})</h2>
            <div className="student-section">
              {this.showAllStudents()}
            </div>
          </section>

          <section>
            <h2>Add Student Form</h2>
            <form className="add-student-form" onSubmit={this.handleSubmit}>

              <div className="form-group">
                <label htmlFor="student-name">Full Name: </label>
                <input
                  type="text"
                  placeholder="Enter student name here..."
                  id="student-name"
                  name="name"
                  value={this.state.newStudent.name}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="student-subject">Subject: </label>
                <select
                 id="student-subject"
                 name="subject"
                 value={this.state.newStudent.subject}
                 onChange={this.handleInputChange}>
                  <option value="">Select a value</option>
                  <option value="physics">Physics</option>
                  <option value="chemistry">Chemistry</option>
                  <option value="maths">Maths</option>
                  <option value="english">English</option>
                  <option value="Economics">Economics</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="student-marks">Marks: </label>
                <input
                  type="number"
                  placeholder="Enter number between 0 to 100"
                  id="student-marks"
                  name="marks"
                  value={this.state.newStudent.marks}
                  onChange={this.handleInputChange}
                  min={0}
                  max={100}
                />
              </div>

              <button type="submit" className="submit-btn">Add Student</button>
            </form>
          </section>

        </main>
      </div>
    )
  }
}

export default App;