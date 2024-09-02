import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCourses } from './store/courseSlice';
import CourseList from './components/CourseList';
import CourseDetails from './components/CourseDetails';
import StudentDashboard from './components/StudentDashboard';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const enrolledCourses = useSelector((state) => state.courses);

  // Fetch courses and update Redux store
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('https://newproject-416616-default-rtdb.firebaseio.com/courses.json');
        const data = await response.json();
        dispatch(setCourses(data));
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [dispatch]);

  const homeRouteElements = (
    <div className="flex justify-center flex-col items-center">
      <nav className="bg-gray-600 w-full flex justify-end p-4">
        <Link
          to="/dashboard"
          className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md"
        >
          Go to Dashboard
        </Link>
      </nav>
      <CourseList />
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={homeRouteElements} />
        <Route path="/:id" element={<CourseDetails />} />
        <Route path="/dashboard" element={<StudentDashboard enrolledCourses={enrolledCourses} />} />
      </Routes>
    </Router>
  );
}

export default App;
