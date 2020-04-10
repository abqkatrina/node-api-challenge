import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';


const App = () => {

const [ data, setData ] = useState([]);
const [ actions, setActions ] = useState([]);
const [open, setOpen] = useState(false);



useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(response => {
        console.log(response.data);
          setData(response.data)
        })
      .catch(error => console.log('crap!', error))
  }, []);


function clickHandler(e){
  axios.get('http://localhost:5000/api/actions/{e.target.value}/actions')
  .then(response => {
    console.log(response.data);
    setActions(response.data);
    setOpen(true);
  })
  .catch(error => console.log('crap!', error))
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
            <li
             value={item.id} onClick={clickHandler}
            >"{item.name}":{item.description}</li>
            )})}
            { open && (<ul>{actions.map(action  => <li>{action.description}</li>)}</ul>)}
      </ul>
 
     </div>
    </div>
  )
}

export default App;
