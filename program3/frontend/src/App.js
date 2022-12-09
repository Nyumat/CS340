import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);

  const [filter, setFilter] = useState({
    project: 'All',
    pno: -1
  });
  const [search, setSearch] = useState('');

  const [toggle, setToggle] = useState(0);

  const getEmployees = async () => {
    try {
      const response = await axios.get('/api/employee/');
      const employeeRes = response.data;
      let res = JSON.parse(employeeRes);
      setEmployees(res);
    }
    catch (err) {
      console.error(err.message);
    }
  };

  const getProjects = async () => {
    try {
      const response = await axios.get('/api/employee/projects');
      const projRes = response.data;
      let res = JSON.parse(projRes);
      setProjects(res);
      res.unshift({ Pname: 'All' });
    }
    catch (err) {
      console.error(err.message);
    }
  };

  const handleFilter = async (e) => {
    setToggle(1);
    const pno = mapProjectNameToPno(e.target.value);
    if (pno === -1) {
      clearFilter();
      return;
    }
    try {
      const response = await axios.get(`/api/employee/${pno}`);
      const filtered = response.data;
      let res = JSON.parse(filtered);
      setEmployees(res);
    }
    catch (err) {
      console.error(err.message);
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search === '') {
      alert('Please enter a name to search for!');
      clearFilter();
      return;
    } 
    setToggle(2);
    let name = search;
    let first = name.charAt(0);
    let firstChar = first.toUpperCase();
    try {
      const response = await axios.get(`/api/employee/search/${name}`);
      const searched = response.data;
      let res = JSON.parse(searched);
      if (res.length === 0) {
        alert('No employees found with that character in their name!');
        setTimeout(() => {
          clearFilter();
        }, 2500);
        return;
      }
      setEmployees(res);
    }
    catch (err) {
      console.error(err.message);
    }
  }





  const clearFilter = () => {
    setToggle(0);
    setSearch('');
    getEmployees();
    setFilter({
      project: 'All',
      pno: -1
    });

  }

  const mapProjectNameToPno = (pname) => {
    if (pname === 'All') return -1;
    const project = projects.find((project) => project.Pname === pname);
    setFilter({
      project: pname,
      pno: project.Pnumber
    });
    return project.Pnumber;
  }

  useEffect(() => {
    getEmployees()
    getProjects()
  }, []);

  return (
    <div className="App">
      <img src={logo}
        className="App-logo"
        alt="logo" />
      <header className="App-header">
        <h2>Company Database</h2>
        <h2>Current Employees:</h2>
        {toggle === 1 ? (
        <div className='box'>
          <p>Project Name: {filter.pno === -1 ? ' None' : filter.project + " in Corvallis"}<br></br>
          Project Number: {filter.pno === -1 ? 'None' : filter.pno}</p>
        </div>
        ) : null}

        {toggle === 2 ? (
        <div className='box'>
          <p>Search by first name starting with: {search.split('')[0].toUpperCase() + search.slice(1)}</p>
        </div>
        ) : null}

        {toggle === 0 ? (
        <div className='box'>
          <p>Showing all employees</p>
        </div>
        ) : null}


        <table>
          <thead>
            <tr className='cats'>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Salary</th>
              <th>Dno</th>
            </tr>
            {employees.map((row, i) => (
              <tr key={i}>
                <td>{row.Fname}</td>
                <td>{row.Lname}</td>
                <td>{row.Salary}</td>
                <td>{row.Dno}</td>
              </tr>
            ))}
          </thead>
        </table>

        <div className='box'>
          <p style={{
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            marginRight: '20px'
          }}>Filter By Project:</p>

          <select onChange={handleFilter} default={filter.project} value={filter.project}>
            {projects.map((row, i) => (
              <option key={i}>
                {row.Pname}
              </option>
            ))}
          </select>

          <div className='box clear'>
            <button onClick={clearFilter}>
              Clear Filters
            </button>
          </div>
        </div>

        <div className='box'>
          <p style={{
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            marginRight: '20px'
          }}>Search for employee with first name starting with:</p>
          <form onSubmit={handleSearch} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
          <input type="text" name="fname" value={search} onChange={(e) => setSearch(e.target.value)}></input>
          <button onClick={handleSearch} style={{
            marginLeft: '20px'
          }}>Search</button>
          </form>
        </div>


      </header>
      <footer>
        <p>Created by: <span style={{
          fontWeight: 'bold',
          color: 'rgb(255, 111, 0)'
        }}>nyumat</span></p>
      </footer>
    </div>
  );
}

export default App;
