import "./App.css";
import { useState } from "react";
import EmployeeProfile from "./EmployeeProfile";
import EmployeeForm from "./EmployeeForm";
import Logo from "./logo.jpeg";

const spreadsheetId = "1UfBkFat7x8t0-sLWKJl-0RHdqUEmvz1yy1kx0royhA4";
const apiKey = "AIzaSyC8xjZHz6OH180y-atrMxM_0YJuxBzHHuo";

const getEmployee = async (email) => {
  const resp = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Employees!A1:E150?key=${apiKey}`
  );

  const json = await resp.json();
  let titles = undefined;
  const employees = [];
  json.values.forEach((rowItems, index) => {
    if (index === 0) {
      titles = rowItems;
      return;
    }
    const empObject = {};
    rowItems.forEach((item, itemIndex) => {
      empObject[titles[itemIndex]] = item;
    });
    employees.push(empObject);
  });
  return employees.find((emp) => emp.email === email);
};

const getCourses = async ({ name: employeeName }) => {
  const resp = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Courses!1:1000?key=${apiKey}`
  );
  const json = await resp.json();
  const courses = [];

  const SEPARATOR = "***";
  const employeesStartIndex = json.values[0].findIndex((v) => v == SEPARATOR);
  const employeeIndex = json.values[0].findIndex((c) => c === employeeName);

  json.values.forEach((row, index) => {
    if (index > 0 && row[employeeIndex] !== "-") {
      const expiry = row[employeeIndex];
      const course = {
        expiry,
        name: row[1],
        desc: row[2],
      };
      courses.push(course);
    }
  });

  return courses;
};

function App() {
  const [employee, setEmployee] = useState(undefined);
  const [error, setError] = useState();

  async function fetchEmployeeWithCourses(email) {
    try {
      const employeeInfo = await getEmployee(email);
      debugger;
      if (!employeeInfo) throw new Error("Incorrect email");
      const courses = await getCourses(employeeInfo);
      const employee = { ...employeeInfo, courses };
      setEmployee(employee);
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="App">
      <div className="page-container">
        <header>
          <img className="company-logo" src={Logo} alt="company logo" />
          <h1>Employees Courses Portal</h1>
        </header>
        <main>
          {employee ? (
            <EmployeeProfile employee={employee} />
          ) : (
            <EmployeeForm
              onClick={(email) => fetchEmployeeWithCourses(email)}
              error={error}
              setError={setError}
            />
          )}
        </main>
        <footer>
          <p>Contact us at mohamed.omar@tq.com</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
