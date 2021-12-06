import React, { useState, useEffect } from 'react'
import './App.css'
import Todo from './Todo'
import { Button, FormControl, InputLabel, Input } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
//get data from local storage
const getData = () => {
  let todo = localStorage.getItem('todos');
  if (todo) {
    return JSON.parse(localStorage.getItem('todos'));
  } else {
    return []
  }
}
function App() {
  // useState([{ title: ['Add todo item'], desc: ['Add description'] }]);
  const [todos, setTodos] = useState(getData());
  const [inputTitle, setInputTitle] = useState('');
  const [inputDesc, setInputDesc] = useState('');

  const addTodo = (event) => {
    event.preventDefault();
    setTodos([{ title: [inputTitle], desc: [inputDesc] },...todos]);
    setInputTitle('');
    setInputDesc('')

  }
  const onDelete = (id) => {
    setTodos((todos) => {
      return todos.filter((arrItem, index) => {
        return index !== id;
      })
    })
  }
  const deleteAll = () => {
    setTodos([])
  }
  const notify = () => {
    function notifyMe() {
      if (!("Notification" in window)) {
        alert("This browser does not support system notifications");
      }
      else if (Notification.permission === "granted") {
        // notifyWater();
        // notifyScreen();
        granted();
      }
      else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
          if (permission === "granted") {
            // notifyWater();
            // notifyScreen();
            granted();
          }
        });
      }
      function granted() {
        setInterval(notifyWater, 3600000) // notifyWater()
        setInterval(() => {
          var interval = setInterval(notifyScreen, 3000000)
          setTimeout(() => clearInterval(interval), 3600000)
        }, 3600000) // notifyScreen()
      }
      function notifyWater() {
        var WATER = new Notification('DRINK WATER', {
          body: "Please go and drink atleast 1 glass of water!",
          icon: 'https://thumbs.dreamstime.com/b/glass-water-isolated-white-background-151821115.jpg',
        });
        setTimeout(WATER.close.bind(WATER), 5000);
      }
      function notifyScreen() {
        var SCREEN = new Notification('MOVE AWAY FROM SCREEN', {
          body: "Please move away from screen for 1 minute",
          icon: 'twitter profile.jpg',

        })
        setTimeout(SCREEN.close.bind(SCREEN), 5000);
      }

    }
    // setInterval(notifyMe, 10000)
    notifyMe();
  }
  // to save in local storage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])
  return (
    <div>
<button onClick={notify} style={{ position: 'absolute', fontSize: '2rem', margin: '10px' }}>Notify</button>
    <div className="app-container">
      <div className="app">
        <div className="head">
          <h1>Your Todo List</h1>
          <form className="formflex">
            <div >
              <FormControl >
                <InputLabel id="large">Write a Todo</InputLabel>
                <Input id="large" value={inputTitle} onChange={event => setInputTitle(event.target.value)}></Input>
              </FormControl><br /><br />
              <FormControl>
                <InputLabel id="large">Write description (optional)</InputLabel>
                <Input id="large" value={inputDesc} onChange={event => setInputDesc(event.target.value)}></Input>
              </FormControl>
            </div>


            <div><Button class="column" id="large" type="submit" disabled={!inputTitle} onClick={addTodo} variant="contained" color="primary">
              Add Todo
            </Button></div>
          </form>
        </div>
        <div onClick={deleteAll} className="delete"><DeleteForeverIcon id="delIcon" />
          <div className="deleteText">Delete All</div></div>
        <ul>

          {Object.keys(todos).map((key, index) => (

            <Todo title={todos[key].title} desc={todos[key].desc} onDelete={onDelete} id={index} />
          ))}
        </ul>
      </div>
    </div >
</div>
  )
}

export default App
