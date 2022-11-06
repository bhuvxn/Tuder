import axios from 'axios';
import { useEffect } from 'react';
import './App.css';
function App() {

  useEffect(()=>{
    axios.get("http://localhost:5000/read", { mode: 'cors' })
    .then(res=> console.log(res.data)).catch(err=>console.log(err))
     
  }, []) 
  return (
    <div className="App">
      <h1>Lets test axios</h1>
    </div>
  );
}

export default App;
