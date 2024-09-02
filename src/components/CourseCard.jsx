import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ courseCardDetials }) => {
  return (
    <Link to={`/${courseCardDetials.id}`}>
      <div className='bg-slate-600 w-[400px] p-3 rounded-md flex'>
        <div>
          <img
            src={courseCardDetials.thumbnail}
            alt={courseCardDetials.name}
            className='max-h-10'
          />
        </div>
        <div className='flex flex-col justify-between flex-grow px-3'>
          <div className='flex justify-between items-center'>
            <h5 className='text-white'>{courseCardDetials.name}</h5>
            <p className='text-white text-right'>{courseCardDetials.instructor}</p>
          </div>
          <div className='flex justify-between items-center text-xs text-white'>
            <p>{courseCardDetials.enrollmentStatus}</p>
            <p>{courseCardDetials.duration}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
