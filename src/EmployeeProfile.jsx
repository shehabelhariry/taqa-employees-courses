import React from "react";
import { ReactComponent as UserImg } from "./user.svg";

const EmployeeProfile = ({ employee, onClick }) => {
  const { name, Title: title, id, courses = [] } = employee || {};

  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-icon">
          <UserImg />
        </div>
        <div>
          <h1 className="profile-name">{name}</h1>
          <div className="profile-info">
            <p>
              <span>Title:</span> {title}
            </p>
          </div>
          <div className="profile-info">
            <p>
              <span>ID:</span> {id}
            </p>
          </div>
        </div>
      </div>
      <div className="profile-details">
        <div className="profile-courses">
          <div className="profile-courses-heading">
            <h2>Completed Courses:</h2>
          </div>
          <ul className="course-list">
            {courses.map((course, index) => (
              <li className="course" key={index}>
                <div className="course-info">
                  <h3>{course.name}</h3>
                  <p>{course.desc}</p>
                  <p>
                    <b>Expiry:</b> {course.expiry}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
