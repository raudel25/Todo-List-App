import { Action, ActionTypes, State } from "../types/types";

const initialState = { todos: [], activeTodos: [] };

export const todoReducer = (
  state: State = initialState,
  action: Action
): State => {
  switch (action.type) {
    case ActionTypes.AddTodo:
      return { ...state, todos: state.todos.concat([action.payload.todo!]) };

    case ActionTypes.RemoveTodo:
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.payload.todo!.id),
      };

    case ActionTypes.UpdateTodo:
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload.todo!.id ? action.payload.todo! : t
        ),
      };

    case ActionTypes.CompleteTodo:
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload.todo!.id ? { ...action.payload.todo! } : t
        ),
      };

    case ActionTypes.SetTodos:
      return {
        ...state,
        todos: action.payload.todos!,
      };

    case ActionTypes.SetActiveTodos:
      return {
        ...state,
        activeTodos: action.payload.todos!,
      };

    default:
      return state;
  }
};
