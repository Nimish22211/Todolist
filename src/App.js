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
    setTodos([...todos, { title: [inputTitle], desc: [inputDesc] }]);
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
  // to save in local storage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])
  return (
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
  )
}

export default App
