export type Todo = {
  id: number;
  todo: string;
  createDate: number;
  completeDate?: number;
};

export type State = { todos: Array<Todo>; activeTodos: Array<Todo> };

export enum ActionTypes {
  AddTodo,
  RemoveTodo,
  UpdateTodo,
  SetActiveTodos,
  SetTodos,
  CompleteTodo,
}

export type Action = {
  type: ActionTypes;
  payload: { todo?: Todo; todos?: Array<Todo> };
};
