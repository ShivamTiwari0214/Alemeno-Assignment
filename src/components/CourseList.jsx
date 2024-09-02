import React, { useEffect, useState } from 'react';
import CourseCard from './CourseCard';

const CourseList = () => {
  const [courseDetails, setCourseDetails] = useState([]);
  const [searchedCourse, setSearchedCourses] = useState(null);
  const userInputRef = React.useRef();

  const fetchCourses = async () => {
    try {
      const response = await fetch('https://newproject-416616-default-rtdb.firebaseio.com/courses.json');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      console.log('Fetched Data:', data); // Log the fetched data
      return data;
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      return [];
    }
  };

  useEffect(() => {
    const loadCourses = async () => {
      const fetchedCourses = await fetchCourses();
      console.log('Courses to be displayed:', fetchedCourses); // Log courses to be displayed
      setCourseDetails(fetchedCourses);
    };
    loadCourses();
  }, []);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const userQuery = userInputRef.current.value.trim().toLowerCase();
    const targetCourse = courseDetails.filter((value) =>
      value.name.toLowerCase().includes(userQuery) ||
      value.instructor.toLowerCase().includes(userQuery)
    );
    setSearchedCourses(targetCourse.length ? targetCourse : null);
    userInputRef.current.value = '';
  };

  const onChangeHandler = (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (query === '') {
      setSearchedCourses(null);
    } else {
      const targetCourse = courseDetails.filter((value) =>
        value.name.toLowerCase().includes(query) ||
        value.instructor.toLowerCase().includes(query)
      );
      setSearchedCourses(targetCourse);
    }
  };

  return (
    <div className='bg-slate-300 text-white h-[90vh] overflow-scroll rounded-md flex flex-nowrap items-center flex-col gap-3 p-2 m-9 mb-0 w-[500px]'>
      <div className="bg-gray-600 w-[500px] p-1 flex gap-4 justify-between">
        <h5>Available courses</h5>
        <form onSubmit={onSubmitHandler}>
          <div className='flex justify-center items-center gap-4 px-2'>
            <input
              ref={userInputRef}
              onChange={onChangeHandler}
              type="text"
              className='h-4 text-black rounded-md w-[130px]'
              placeholder='Search courses'
            />
            <button type='submit' className='border-[1px] rounded-md h-5 px-3 text-xs border-red-100'>
              Search
            </button>
          </div>
        </form>
      </div>
      {searchedCourse ? (
        searchedCourse.map((value, index) => (
          <CourseCard key={index} courseCardDetials={value} />
        ))
      ) : (
        courseDetails.map((value, index) => (
          <CourseCard key={index} courseCardDetials={value} />
        ))
      )}
    </div>
  );
};

export default CourseList;
