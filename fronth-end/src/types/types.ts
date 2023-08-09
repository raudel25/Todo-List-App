export type Todo = { id: number; todo: string; complete: boolean };

export type State = { todos: Array<Todo>; activeTodos: Array<Todo> };

export type Action= {}