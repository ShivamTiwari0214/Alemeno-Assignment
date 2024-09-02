import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StudentDashboard = ({ enrolledCourses }) => {
  const [completedCourses, setCompletedCourses] = useState(new Set());

  useEffect(() => {
    const storedCompletedCourses = JSON.parse(localStorage.getItem('completedCourses')) || [];
    setCompletedCourses(new Set(storedCompletedCourses));
  }, []);

  useEffect(() => {
    localStorage.setItem('completedCourses', JSON.stringify([...completedCourses]));
  }, [completedCourses]);

  const toggleCompletion = (courseId) => {
    setCompletedCourses((prev) => {
      const updated = new Set(prev);
      if (updated.has(courseId)) {
        updated.delete(courseId);
      } else {
        updated.add(courseId);
      }
      return updated;
    });
  };

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Your Enrolled Courses</h1>
        {/* Back to Home Button */}
        <Link to="/" className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'>
          Back to Home
        </Link>
      </div>

      <div className='space-y-4'>
        {enrolledCourses.length ? (
          enrolledCourses.map(course => (
            <div key={course.id} className='bg-white p-4 rounded-lg shadow-md flex flex-col gap-3'>
              <h3 className='text-xl font-semibold'>{course.name}</h3>
              <p className='text-gray-700'><strong>Instructor:</strong> {course.instructor}</p>
              <p className='text-gray-700'><strong>Due Date:</strong> {course.dueDate}</p>
              <div className='relative'>
                <div className='bg-gray-200 h-2 rounded-full'>
                  <div 
                    className='bg-blue-500 h-full rounded-full'
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <p className='absolute right-0 top-0 text-xs text-gray-500'>{course.progress}%</p>
              </div>
              <button 
                onClick={() => toggleCompletion(course.id)}
                className={`py-2 px-4 rounded-md ${completedCourses.has(course.id) ? 'bg-green-500' : 'bg-gray-500'} text-white`}
              >
                {completedCourses.has(course.id) ? 'Completed' : 'Mark as Completed'}
              </button>
            </div>
          ))
        ) : (
          <p className='text-gray-500'>No enrolled courses</p>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
