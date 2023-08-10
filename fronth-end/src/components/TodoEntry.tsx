import { Button, Checkbox, Input, Tooltip, Typography } from "antd";
import { Todo } from "../types/types";
import { useState } from "react";
import { useAppDispatch } from "../store/store";
import { completeTodo, removeTodo, updateTodo } from "../actions/actionsTodo";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { Modal } from "antd";

export const TodoEntry = (todo: Todo) => {
  const dispatch = useAppDispatch();

  const [input, setInput] = useState(todo.todo);
  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    if (todo.completeDate !== undefined) {
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
    const execute = () => {
      dispatch(removeTodo(todo));
    };

    confirm(execute, "You want delete this TODO");
  };

  const handleComplete = (e: CheckboxChangeEvent) => {
    e.preventDefault();

    if (todo.completeDate !== undefined) {
      return;
    }

    const execute = () => {
      setEdit(false);
      dispatch(completeTodo({ ...todo, completeDate: new Date().getTime() }));
    };

    const editMessage = edit ? "The edited note has not been saved. " : "";

    confirm(execute, `${editMessage}You want to mark this TODO as complete?`);
  };

  const dateTooltip = () => {
    const create = moment(todo.createDate);
    const complete = todo.completeDate ? moment(todo.completeDate) : null;

    const strCreate = `Create: ${create.format("DD/MM/YYYY HH:mm:ss")}`;
    const strComplete = complete
      ? ` Complete: ${complete.format("DD/MM/YYYY HH:mm:ss")}`
      : "";

    return `${strCreate}${strComplete}`;
  };

  const confirm = (execute: () => void, message: string) => {
    Modal.confirm({
      title: "Confirmation",
      content: message,
      onOk() {
        execute();
      },
    });
  };

  return (
    <Tooltip title={dateTooltip()}>
      <div className="entry">
        <div className="entry__check box__center">
        <Checkbox
          checked={todo.completeDate !== undefined}
          onChange={handleComplete}
        />
        </div>
        <div className="box__center ml-1">
          {edit ? (
            <Input value={input} onChange={handleInputChange} />
          ) : (
            <Typography.Text
              style={{
                textDecoration:
                  todo.completeDate !== undefined ? "line-through" : "none",
              }}
            >
              {todo.todo}
            </Typography.Text>
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
    </Tooltip>
  );
};
