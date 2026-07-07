import React from "react";
import './App.css';
import Card from "./Card";


class App extends React.Component {

  constructor(props) {
    super(props);
    console.log("1. Constructor called")
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
      },
      SelectedFilter: 'All',
      SortBy: '',
      isEditing: false,
      editingStudentID: null,
      editMarks: ''
    }
  }

  componentDidMount() {
    console.log("2. ComponentDidMount is called")
  }

  componentDidUpdate() {
    console.log("3. ComponentDidUpdate is called")
  }

  componentWillUnmount() {
    console.log("4. ComponentWillUnmount is called")
  }

  handleEdit = (id) => {
    const student = this.state.students.find(s => s.id === id);
    this.setState({
      isEditing: true,
      editingStudentID: id,
      editMarks: student.marks
    });
  }

   handleEditSave = () => {

    const marks = Number(this.state.editMarks)

    if(isNaN(marks) || marks < 0 || marks > 100){
      alert('Please enter marks between 0 and 100 only')
      return;
    }

    this.setState(prev => ({
      students: prev.students.map(student =>
        student.id === prev.editingStudentID
          ? {
             ...student, 
             marks: marks,
             passed: marks >= 40
            }
          : student
      ),
      isEditing: false,
      editingStudentID: null,
      editMarks: ''
    }));
  }

  handleCancelEdit = () => {
    this.setState({
      isEditing: false,
      editingStudentID: null,
      editMarks: ''
    })
  }

  filterOptions = ["All", "Passed Only", "Failed Only"];



  setFilter = () => {

    if (this.state.SelectedFilter === 'Passed Only') {
      return this.state.students.filter(student => student.passed);
    } else if (this.state.SelectedFilter === 'Failed Only') {
      return this.state.students.filter(student => !student.passed);
    }
    return [...this.state.students];
  }

  sortStudents = () => {
    const tempStudents = this.setFilter();

    tempStudents.sort((a, b) => {
      switch (this.state.SortBy) {
        case 'highToLow':
          return b.marks - a.marks;
        case 'lowToHigh':
          return a.marks - b.marks;
        default:
          return 0;
      }
    })
    return tempStudents;
  }

  clearFilter = () => {
    this.setState({
      SortBy: '',
      SelectedFilter: 'All'
    })
  }

  showAllStudents = () => {

    const tempStudents = this.sortStudents();

    if (tempStudents.length === 0) {
      return (
        <div className="empty-state">
          <span>No students data found! Add students or try by changing filters</span>
        </div>
      )
    }

    return tempStudents.map(student => (
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
          <button className="delete-btn" onClick={() => this.handleDelete(student.id)}>Delete</button>
          <button className="edit-btn" onClick={() => this.handleEdit(student.id)}>Edit</button>
        </div>
      </div>
    ))
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { name, subject, marks } = this.state.newStudent;

    // if any of the input in blank
    if (!name.trim() || !subject.trim() || !marks) {
      console.log(name)
      console.log(subject)
      console.log(marks)
      alert("Please fill in all fields");
      return;
    }

    const convertedMarks = parseInt(marks, 10);

    if (isNaN(convertedMarks) || convertedMarks > 100 || convertedMarks < 0) {
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
    if (window.confirm("Are you sure you want to delete this student ?")) {
      this.setState({
        students: this.state.students.filter(student => student.id !== id)
      })
    }
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      newStudent: {
        ...this.state.newStudent,
        [name]: value
      }
    })
  }


  render() {

    return (
      <div className="app">

        <header className="app-header">
          <h1>Student Grade Tracker</h1>
          <p>Student dashboard built with class based components</p>
        </header>

        <main className="app-main">

          <section>
            {this.state.isEditing && (
              <div className="pop-up">
                <div className='edit-card'>

                  <div className="edit-card-header">
                    <h3>Edit Marks</h3>
                    <button className="close-btn" onClick={this.handleCancelEdit}>x</button>
                  </div>

                  <div className="edit-card-data">
                    <label htmlFor="edited-marks">Marks: </label>
                    <input
                      type="number"
                      placeholder="Enter new marks (0 to 100 only)"
                      id="edited-marks"
                      value={this.state.editMarks}
                      onChange={(e) => this.setState({ editMarks: e.target.value })}
                      min={0}
                      max={100}
                    />
                  </div>

                  <div className="edit-card-bottom">
                    <button className="edit-btn" onClick={this.handleEditSave}>Save</button>
                    <button className="delete-btn" onClick={this.handleCancelEdit}>Cancel</button>
                  </div>
                </div>
              </div>
            )}
            <h2>Student's List ({this.state.students.length})</h2>
            <div className="filter-section">

              <div className="left-group">

                {this.filterOptions.map((option, index) => (
                  <button key={option} className={`filter-btn ${option === this.state.SelectedFilter ? 'active' : ''}`} onClick={() => this.setState({
                    SelectedFilter: option
                  })}>
                    {option}
                  </button>
                ))}

                <select
                  value={this.state.SortBy}
                  onChange={(e) => this.setState({
                    SortBy: e.target.value
                  })}
                >
                  <option>--Sort By Grades--</option>
                  <option value='highToLow'>High to Low</option>
                  <option value='lowToHigh'>Low to High</option>
                </select>

              </div>

              <div className="right-group">
                {(this.state.SortBy !== '' || this.state.SelectedFilter !== 'All') &&
                  <button className='clear-btn' onClick={this.clearFilter}>Clear All Filters</button>
                }
              </div>

            </div>
            <div className="student-section">
              {this.showAllStudents()}
              {/* <Card />    adding or removing this component will invoke componentWillUnmount */}
            </div>
          </section>

          <section className="add-student">
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