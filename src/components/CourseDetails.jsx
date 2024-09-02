import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CourseDetails = () => {
    const [syllabusExpanded, setSyllabusExpanded] = useState(false);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch(`https://newproject-416616-default-rtdb.firebaseio.com/courses/${id}.json`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setCourse(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id]);

    const exploreSyllabusHandler = () => {
        setSyllabusExpanded(currState => !currState);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!course) return <p>No course found</p>;

    return (
        <div className="flex justify-center m-6 border-[2px] rounded-md flex-row flex-wrap px-10 gap-6 md:gap-9">
            <h4 className="text-white text-xl font-bold text-left">Course Details</h4>
            <div className="flex w-full gap-6 md:gap-9 text-white">
                <div>
                    <img className="h-24" src={course.thumbnail} alt="" />
                </div>
                <div className="flex w-full flex-wrap flex-col text-white">
                    <div className="flex items-center">
                        <h3 className="md:text-2xl">Name: </h3>
                        <p className="md:text-xl"> {course.name}</p>
                    </div>
                    <div className="flex items-center">
                        <h3 className="md:text-2xl">By: </h3>
                        <p className="md:text-xl"> {course.instructor}</p>
                    </div>
                    <hr className="bg-white mt-3" />
                    <div className="flex items-center">
                        <h3 className="md:text-2xl">Description: </h3>
                        <p className="md:text-xl mt-3"> {course.description}</p>
                    </div>
                    <div className="flex items-center">
                        <h3 className="md:text-2xl">Enrollment Status: </h3>
                        <p className="md:text-xl mt-3">
                            {course.enrollmentStatus}
                        </p>
                    </div>
                    <div className="flex items-center">
                        <h3 className="md:text-2xl">Course Duration: </h3>
                        <p className="md:text-xl mt-3"> {course.duration}</p>
                    </div>
                    <div className="flex items-center">
                        <h3 className="md:text-2xl">Schedule: </h3>
                        <p className="md:text-xl mt-3"> {course.schedule}</p>
                    </div>
                    <div className="flex items-center">
                        <h3 className="md:text-2xl">Location: </h3>
                        <p className="md:text-xl mt-3"> {course.location}</p>
                    </div>
                    <div className="flex items-center">
                        <h3 className="md:text-2xl">Pre-requisites: </h3>
                        <p className="md:text-xl mt-3"> {course.prerequisites}</p>
                    </div>
                    <div className="flex flex-wrap">
                        <h3 className="md:text-2xl">Syllabus: </h3>
                        <div className="bg-slate-500 p-4 rounded-md">
                            {!syllabusExpanded &&
                                <p className="md:text-xl mt-3">
                                    Week {course.syllabus[0].week}: {course.syllabus[0].topic}....
                                </p>
                            }
                            {syllabusExpanded &&
                                course.syllabus.map((value, index) => (
                                    <div key={index}>
                                        <p className="md:text-xl mt-3">
                                            Week {value.week}: {value.topic}
                                        </p>
                                    </div>
                                ))
                            }
                            <button onClick={exploreSyllabusHandler}>
                                {syllabusExpanded ? 'Hide' : 'Show More'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
