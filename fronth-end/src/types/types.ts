export type Todo = { id: number; todo: string; complete: boolean };

export type State = { todos: Array<Todo>; activeTodos: Array<Todo> };

export enum ActionTypes {
  AddTodo,
  RemoveTodo,
  UpdateTodo,
  SetActiveTodos,
  SetTodos,
}

export type Action = {
  type: ActionTypes;
  payload: { todo?: Todo; todos?: Array<Todo> };
};
