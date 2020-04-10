import React, { useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [data, setData] = useState({});

  useEffect(() => {
    axios.get('localhost:5000/projects')
    .then(res => {
      console.log(res)
      setData(res.data)})
      .catch(err => console.log(err))
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <p>API Sprint - express, api, react-app</p>
      </header> 
      <div className="container">
        <ul>
          <li>List of things</li>
          {/* (data.map( (item) => {
              <li>{item.title}</li>
          })) */}
        </ul>
      </div>
    </div>
  );
}

export default App;
