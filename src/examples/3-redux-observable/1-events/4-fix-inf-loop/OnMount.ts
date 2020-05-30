import { TodoType, TodoVisibility } from "../1-simple-todo/AppState";
import { parse, AppRoute } from "../3-fetch-todo/AppRoute";

const onMount = (
  todos: TodoType[],
  todoVisibility: TodoVisibility,
  setTodos: (newTodos: TodoType[]) => void,
  setTodoVisibility: (todoVisibility: TodoVisibility) => void,
) => {
  const initialRoute = parse(window.location.href);
    if (AppRoute.is.Async(initialRoute)) {
      loadTodo();
    }
  
}

export const loadTodo = () => {
  fetch('https://reqres.in/api/users?page=2')
    .then(resp => resp.json())
    .then(json => {
      addTodo(
        todos,
        json.ad.text,
        setTodos,
      );
    });
};

export const addTodo = (
  todos: TodoType[],
  text: string,
  setTodos: (todos: TodoType[]) => void,
) => {
  const highestID = todos.length < 0 
    ? todos.reduce(
        (acc, cur) => cur.id > acc.id
          ? cur
          : acc
      ).id
    : 0;
  const newTodo: TodoType = {
    id: highestID + 1,
    text,
    completed: false,
  }
  setTodos([...todos, newTodo]);
}

export default onMount;