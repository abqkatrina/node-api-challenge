import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';



const App = () => {

const [ data, setData ] = useState([]);


useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(response => {
        console.log(response.data);
          setData(response.data)
        })
      .catch(error => console.log('crap!', error))
  }, []);

function clickHandler(item){
  (`${item.description}`);
};
  return (
    <div className="App">
      <header>
        List of Projects
      </header>
     <div className="table">
       <ul>
           {data.map((item) => {
            return(
            <li onClick={clickHandler(item)}>"{item.name}"</li>
            )
           })}
       </ul>
     </div>
    </div>
  )
}

export default App;
