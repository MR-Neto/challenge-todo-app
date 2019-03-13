import axios from 'axios';

class TodoService {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:4000/api/v1',
      withCredentials: true
    })
  }

  getAllTodos() {
    return this.api.get('/todos')
      .then(({ data }) => data)
      .catch((err) => console.log("Error: ", err));
  }

  getTodoById(id) {
    return this.api.get(`/todos/${id}`)
      .then(({ data }) => data)
      .catch((error) => console.log(error));
  }

  toggleDoneTodo(id,bool) {
    return this.api.post(`/todos/${id}`,{done:bool})
      .then(({ data }) => data)
      .catch((error) => console.log(error));
  }

  createTodo(newTodo) {
    return this.api.post(`/todos`, newTodo)
      .then(({ data }) => data)
      .catch((error) => console.log(error));
  }

  updateTodo(id, title, body) {
    return this.api.put(`/todos/${id}`, { title, body })
      .then(({ data }) => data )
      .catch((error) => console.log(error));
  }

  deleteTodo(id) {
    return this.api.delete(`/todos/${id}`)
      .then(({ data }) => data)
      .catch((error) => console.log(error));
  }
}

const todoService = new TodoService();

export default todoService;