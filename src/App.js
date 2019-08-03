import React from 'react';
import './App.css';



class App extends React.Component{ 
  constructor(){
    super()
      this.state = {
        todos: []
      }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = (e) => {
    const newTodo = e.target.querySelector("input").value

    console.log(newTodo);
     
    this.setState(
       {
        todos: this.state.todos.concat({title: newTodo, id:this.state.todos.length + 1})
       }
    )

    e.preventDefault();
  }

  render(){
    console.log(this.state.todos)
      return (
        <div>
          <h2>Todo List</h2>
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="What needs to be done?" />
          </form>

          <ul>
          {this.state.todos.map(todo => {
            return( 
              <li key={todo.id}>{todo.title}</li>
            )
          })}
          </ul>
        </div>
      );
    }
  }  

export default App;
