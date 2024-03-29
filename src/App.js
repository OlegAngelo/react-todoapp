import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component{ 
  constructor(){
    super()
      this.state = {
        todos: [],
        isFetching: true
      }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
//fetching api
  componentDidMount() {
    fetch("https://todoapp-react-angelo.herokuapp.com/todos")
      .then(response => response.json())
      .then(todos =>
        this.setState({
          todos: todos,
          isFetching: false
        })
      );
  }

//handles adding lists
  handleSubmit = e => {
    const newTodo = e.target.querySelector("input").value
    e.target.querySelector("input").value = "";

    axios
      .post("https://todoapp-react-angelo.herokuapp.com/todos", {title: newTodo})
      .then(response => response.data)
      .then(addedTodo =>
        this.setState({
          todos: [
            ...this.state.todos,
            {
              id: addedTodo.id,
              title: addedTodo.title
            }
          ]
        })
      );
    //prevents loading browsers
    e.preventDefault(); 
  }

//handles delete button
  handleDelete(id) {
    axios
      .delete("https://todoapp-react-angelo.herokuapp.com/todos/" + id)
      .then(response => response.data)
      .then(deletedTodo => {
        this.setState({
          todos: this.state.todos.filter(todo => todo.id !== deletedTodo.id)
        });
      });
  }

//UI
  render(){
    console.log(this.state.todos)
      return (
        <div>
          <h2>Todo List</h2>
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="What needs to be done?" />
          </form>


          {this.state.isFetching ? (
          <p>Please wait...</p>
          ) : (
            <ul>
              {this.state.todos.map(todo => (
                  <li key={todo.id}>
                    {todo.title}{" "}
                    <button onClick = {e => this.handleDelete(todo.id)}>DELETE</button>
                  </li> 
              ))}
            </ul>
          )}
        </div>
      );
    }
  }  

export default App;
