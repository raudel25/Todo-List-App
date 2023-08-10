import { Button, Checkbox, Input } from "antd";
import { Todo } from "../types/types";
import { useState } from "react";
import { useAppDispatch } from "../store/store";
import { completeTodo, removeTodo, updateTodo } from "../actions/actionsTodo";
import { CheckboxChangeEvent } from "antd/es/checkbox";

export const TodoEntry = (todo: Todo) => {
  const dispatch = useAppDispatch();

  const [input, setInput] = useState(todo.todo);
  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    if (todo.complete) {
      return;
    }

    if (edit) {
      dispatch(updateTodo({ ...todo, todo: input }));
    }

    setEdit(!edit);
    setInput(todo.todo);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setInput(e.target.value);
  };

  const handleRemove = () => {
    dispatch(removeTodo(todo));
  };

  const handleComplete = (e: CheckboxChangeEvent) => {
    e.preventDefault();

    if (todo.complete) {
      return;
    }

    dispatch(completeTodo(todo));
  };

  return (
    <div>
      <Checkbox checked={todo.complete} onChange={handleComplete}></Checkbox>
      {edit ? (
        <Input value={input} onChange={handleInputChange} />
      ) : (
        <span>{todo.todo}</span>
      )}
      <Button onClick={handleEdit}></Button>
      <Button onClick={handleRemove}></Button>
    </div>
  );
};
