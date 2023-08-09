import { Action, State } from "../types/types";

const initialState = { todos: [], activeTodos: [] };

export const todoReducer = (
  state: State = initialState,
  action: Action
): State => {
  return state;
};
