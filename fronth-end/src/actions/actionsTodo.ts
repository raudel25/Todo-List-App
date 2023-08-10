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

export const setActives = (todos: Array<Todo>): Action => ({
  type: ActionTypes.SetActiveTodos,
  payload: { todos },
});

export const setTodos = (todos: Array<Todo>): Action => ({
  type: ActionTypes.SetTodos,
  payload: { todos },
});
