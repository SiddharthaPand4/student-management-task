import {useState, useEffect} from 'react'

export default function Content() {
    const [courses, setCourses] = useState({"": []})
    const [currentCourse, setCurrentCourse] = useState("")
    const [courseAddMode, setCourseAddMode] = useState(false)
    const [currentStudents, setCurrentStudents] = useState([])
    const [currentStudent, setCurrentStudent] = useState("")
    const [addStudentMode, setAddStudentMode] = useState(false)

    const handleCourseChange = e => {
        const course = e.target.value
        setCurrentCourse(course)
    }

    useEffect(()=> {
        setCurrentStudents(courses[currentCourse] || [])
    }, [currentCourse, courses])

    useEffect(()=> {
        if(!currentCourse) setAddStudentMode(false)
    }, [currentCourse])

    const handleCourseAdd = ()=> {
        if (!(currentCourse || currentCourse in courses)) {
            alert("Empty text ! or duplicate value in courses")
        } else {
            courses[currentCourse] = []
            setCourses({...courses})
            setCurrentCourse("")
            setAddStudentMode(false)
        }
    }

    const handleStudentAdd = ()=> {
        if (currentCourse && currentStudent) {
            courses[currentCourse] = [...currentStudents, currentStudent]
            setCourses({...courses})
            setCurrentStudent("")
        } else {
            alert("Empty text or course not selected")
        }
    }

    return (
        <div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div>
                    <b>Course</b>
                </div>
                <div>
                    <div>
                        <select style={{backgroundColor: 'blue'}} value={currentCourse} onChange={handleCourseChange}>
                            <option value={""}>Select Course</option>
                            {Object.keys(courses).filter(course => course).map(course =>
                                <option value={course} key={course}>{course}</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <button
                            onClick={()=> setCourseAddMode(true)}
                        >
                            Add Course
                        </button>
                    </div>
                    {courseAddMode &&
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div>
                            <input
                                value={currentCourse}
                                onChange={e => setCurrentCourse(e.target.value)}
                                placeholder={"course name"}
                            />
                        </div>
                        <div>
                            <button
                                onClick={()=> setCourseAddMode(false)}
                            >
                                Cancel
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={handleCourseAdd}
                            >
                                Add
                            </button>
                        </div>
                    </div>}
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div>
                    <b>Students</b>
                </div>
                <div>
                    <div>
                        <select style={{backgroundColor: 'blue'}} value={currentStudent} onChange={e => setCurrentStudent(e.target.value)}>
                            <option value={""}>Select Student</option>
                            {currentStudents.map(student =>
                                <option value={student} key={student}>{student}</option>
                            )}
                        </select>
                    </div>
                    <div>
                        {currentCourse &&
                        <button
                            onClick={()=> setAddStudentMode(true)}
                        >
                            Add Student
                        </button>
                        }
                    </div>
                    {addStudentMode &&
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div>
                            <input
                                value={currentStudent}
                                onChange={e => setCurrentStudent(e.target.value)}
                                placeholder={"Student Name"}
                            />
                        </div>
                        <div>
                            <button
                                onClick={()=> setAddStudentMode(false)}
                            >
                                Cancel
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={handleStudentAdd}
                            >
                                Add
                            </button>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}