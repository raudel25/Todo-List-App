import { Button, Checkbox, Input, Tooltip, Typography } from "antd";
import { Todo } from "../types/types";
import { useState } from "react";
import { useAppDispatch } from "../store/store";
import { startRemoveTodo, startUpdateTodo } from "../actions/actionsTodo";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";

export const TodoEntry = (todo: Todo) => {
  const dispatch = useAppDispatch();

  const [input, setInput] = useState(todo.todoItem);
  const [edit, setEdit] = useState(false);

  const { t } = useTranslation();

  const handleEdit = () => {
    if (todo.completeDate !== undefined) {
      return;
    }

    if (edit) {
      dispatch(startUpdateTodo({ ...todo, todoItem: input }));
    }

    setEdit(!edit);
    setInput(todo.todoItem);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setInput(e.target.value);
  };

  const handleRemove = () => {
    const execute = () => {
      dispatch(startRemoveTodo(todo));
    };

    confirm(execute, t("You want delete this TODO"));
  };

  const handleComplete = (e: CheckboxChangeEvent) => {
    e.preventDefault();

    if (todo.completeDate !== undefined) {
      return;
    }

    const execute = () => {
      setEdit(false);
      dispatch(
        startUpdateTodo({ ...todo, completeDate: new Date().getTime() })
      );
    };

    const editMessage = edit ? t("The edited TODO has not been saved. ") : "";

    confirm(
      execute,
      `${editMessage}${t("You want to mark this TODO as complete")}?`
    );
  };

  const dateTooltip = () => {
    const create = moment(todo.createDate);
    const complete = todo.completeDate ? moment(todo.completeDate) : null;

    const strCreate = `${t("Create")}: ${create.format("DD/MM/YYYY HH:mm:ss")}`;
    const strComplete = complete
      ? ` ${t("Complete")}: ${complete.format("DD/MM/YYYY HH:mm:ss")}`
      : "";

    return `${strCreate}${strComplete}`;
  };

  const confirm = (execute: () => void, message: string) => {
    Modal.confirm({
      title: t("Confirmation"),
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
              {todo.todoItem}
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
