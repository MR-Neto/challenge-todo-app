import React, { Component, Fragment } from 'react'
import todoService from '../lib/todoService'
import Todo from '../components/Todo'
import FormTodo from '../components/FormTodo';
import { Button } from 'semantic-ui-react'
import './Home.css';


class Home extends Component {

  state = {
    todos: [],
    mode: "list",
    editTitle: "",
    editID: ""
  }

  componentDidMount = async () => {
    const todosList = await todoService.getAllTodos();
    this.setState({
      todos: todosList,
    })
  }

  setModeCreate = () => {
    this.setState({
      mode: "create",
    })
  }

  setModeEdit = (editTitle, editID, editBody) => {
    this.setState({
      mode: "edit",
      editTitle,
      editBody,
      editID
    })
  }

  handleCreate = async (newTodo) => {
    const createdTodo = await todoService.createTodo(newTodo);

    const todosList = await todoService.getAllTodos();
    this.setState({
      todos: todosList,
      mode: "list"
    })
  }

  handleEdit = async (editTodo) => {


    const { editID, title, body } = editTodo;
    const updatedTodo = await todoService.updateTodo(editID, title, body);

    const todosList = await todoService.getAllTodos();
    this.setState({
      todos: todosList,
      mode: "list"
    })
  }

  handleDelete = async (id) => {

    const deletedTodo = await todoService.deleteTodo(id);

    const todosList = await todoService.getAllTodos();
    this.setState({
      todos: todosList,
      mode: "list"
    })
  }

  handleDone = async (id, bool) => {
    const updatedTodo = await todoService.toggleDoneTodo(id, bool);

    const todosList = await todoService.getAllTodos();
    this.setState({
      todos: todosList,
      mode: "list"
    })
  }

  sortTodos = () => {
    const { todos } = this.state;

    const sortedArray = todos.sort((a, b) => {
      if (a.done === b.done) {
        return 0;
      }
      if (a.done) {
        return 1;
      } else {
        return -1;

      }
    }
    );

    this.setState({
      todos: sortedArray,
    })

  }

  renderTodos = () => {
    return this.state.todos.map((todo) => {
      return (
        <div className="card-element">
          <Todo
            key={todo._id}
            todo={todo}
            setModeEdit={this.setModeEdit}
            handlerDelete={this.handleDelete}
            handlerDone={this.handleDone}
          />
        </div>
      );
    });
  }


  render() {
    const { mode, editTitle, editID, editBody } = this.state;
    return (
      <div>
        {mode === "list" &&
          <Fragment>
            <div className="top-bar">
              <h1>List Todos</h1>
              <div>
                <Button primary onClick={this.setModeCreate}>
                  Create
              </Button>
                <Button secondary onClick={this.sortTodos}>
                  Sort Todos
              </Button>

              </div>
            </div>
            <div className="list">
              {this.renderTodos()}
            </div>
          </Fragment>
        }
        {mode === "create" && <FormTodo handleFormSubmit={this.handleCreate} />}
        {mode === "edit" && <FormTodo handleFormSubmit={this.handleEdit} editTitle={editTitle} editID={editID} editBody={editBody} />}
      </div>
    )
  }
}

export default Home;