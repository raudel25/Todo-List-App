import { AppDispatch, RootState } from "../store/store";
import { Action, ActionTypes, Todo } from "../types/types";

export const addTodo = (todo: Todo): Action => ({
  type: ActionTypes.AddTodo,
  payload: { todo },
});

export const removeTodo = (todo: Todo): Action => ({
  type: ActionTypes.RemoveTodo,
  payload: { todo },
});

export const updateTodo = (todo: Todo): Action => ({
  type: ActionTypes.UpdateTodo,
  payload: { todo },
});

export const setActiveTodos = (todos: Array<Todo>): Action => ({
  type: ActionTypes.SetActiveTodos,
  payload: { todos },
});

export const setTodos = (todos: Array<Todo>): Action => ({
  type: ActionTypes.SetTodos,
  payload: { todos },
});

export const completeTodo = (todo: Todo): Action => ({
  type: ActionTypes.CompleteTodo,
  payload: { todo },
});

export const filterTodos = (query: string,filter:boolean|null) => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const newActives = getState().todos.filter((todo) =>
      todo.todo.startsWith(query) && (filter === null||filter===todo.complete)
    );

    dispatch(setActiveTodos(newActives));
  };
};
