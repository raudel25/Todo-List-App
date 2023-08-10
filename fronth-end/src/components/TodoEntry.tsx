import { Button, Checkbox, Input } from "antd";
import { Todo } from "../types/types";
import { useState } from "react";
import { useAppDispatch } from "../store/store";
import { completeTodo, removeTodo, updateTodo } from "../actions/actionsTodo";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

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

    setEdit(false);
    dispatch(completeTodo(todo));
  };

  return (
    <div className="entry">
      <Checkbox checked={todo.complete} onChange={handleComplete} />
      <div className="entry__todo ml-1">
        {edit ? (
          <Input value={input} onChange={handleInputChange} />
        ) : (
          <span
            className="entry__todo"
            style={{ textDecoration: todo.complete ? "line-through" : "none" }}
          >
            {todo.todo}
          </span>
        )}
      </div>
      <div className="ml-1">
        <Button type="dashed" className="entry__btn" onClick={handleEdit}>
          {edit ? <CheckOutlined /> : <EditOutlined />}
        </Button>
        <Button
          type="dashed"
          className="entry__btn ml-1"
          danger={true}
          onClick={handleRemove}
        >
          <DeleteOutlined />
        </Button>
      </div>
    </div>
  );
};
