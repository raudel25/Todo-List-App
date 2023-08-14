import { fetchTodo } from "../helpers/fetch";
import { AppDispatch, RootState } from "../store/store";
import { Action, ActionTypes, Filter, Todo, TodoNoId } from "../types/types";
import { Modal } from "antd";

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

export const filterTodos = (query: string, filter: Filter) => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const filterTodo = (todoComplete: number | undefined) => {
      switch (filter) {
        case Filter.All:
          return true;

        case Filter.Check:
          return todoComplete !== undefined;

        case Filter.NoCheck:
          return todoComplete === undefined;
      }
    };
    const newActives = getState()
      .todos.filter(
        (todo) =>
          todo.todoItem.startsWith(query) && filterTodo(todo.completeDate)
      )
      .sort((t1, t2) => {
        if (t1.completeDate === t2.completeDate) {
          if (t1.completeDate !== undefined)
            return t2.completeDate! - t1.completeDate;
          return t1.createDate - t2.createDate;
        }

        if (t1.completeDate === undefined) return -1;
        return 1;
      });

    dispatch(setActiveTodos(newActives));
  };
};

export const startLoadTodos = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const resp = await fetchTodo("todo", {}, "GET");

      const body = await resp.json();

      if (resp.ok) {
        const todos = body.map(
          (t: {
            id: number;
            createDate: number;
            completeDate: null | number;
          }) => ({
            ...t,
            completeDate: t.completeDate ? t.completeDate : undefined,
          })
        );

        dispatch(setTodos(todos));
      } else {
        Modal.error({
          title: "Error",
          content: "Connection error",
        });
      }
    } catch {
      Modal.error({
        title: "Error",
        content: "Connection error",
      });
    }
  };
};

export const startAddTodo = (todo: TodoNoId) => {
  return async (dispatch: AppDispatch) => {
    try {
      const request = todo.completeDate
        ? todo
        : { ...todo, completeDate: null };

      const resp = await fetchTodo("todo", request, "POST");

      const body = await resp.json();

      if (resp.ok) {
        dispatch(addTodo({ ...todo, id: body }));
      } else {
        Modal.error({
          title: "Error",
          content: "Connection error",
        });
      }
    } catch {
      Modal.error({
        title: "Error",
        content: "Connection error",
      });
    }
  };
};

export const startUpdateTodo = (todo: Todo) => {
  return async (dispatch: AppDispatch) => {
    try {
      const request = todo.completeDate
        ? todo
        : { ...todo, completeDate: null };

      const resp = await fetchTodo("todo", request, "PUT");

      if (resp.ok) {
        dispatch(updateTodo(todo));
      } else {
        Modal.error({
          title: "Error",
          content: "Connection error",
        });
      }
    } catch {
      Modal.error({
        title: "Error",
        content: "Connection error",
      });
    }
  };
};

export const startRemoveTodo = (todo: Todo) => {
  return async (dispatch: AppDispatch) => {
    try {
      const resp = await fetchTodo(`todo/${todo.id}`, {}, "DELETE");

      if (resp.ok) {
        dispatch(removeTodo(todo));
      } else {
        Modal.error({
          title: "Error",
          content: "Connection error",
        });
      }
    } catch {
      Modal.error({
        title: "Error",
        content: "Connection error",
      });
    }
  };
};
