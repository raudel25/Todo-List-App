import { Button, Input, List, Select, Typography } from "antd";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import { TodoEntry } from "./TodoEntry";
import { useEffect, useState } from "react";
import {
  filterTodos,
  startAddTodo,
  startLoadTodos,
} from "../actions/actionsTodo";

const { Option } = Select;

export const TodoApp = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(startLoadTodos());
  }, [dispatch]);

  const { activeTodos, todos } = useSelector((state: RootState) => state);

  const [newTodo, setNewTodo] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<boolean | undefined>(undefined);

  const handleNew = () => {
    dispatch(
      startAddTodo({
        todoItem: newTodo,
        createDate: new Date().getTime(),
      })
    );
    setNewTodo("");
  };

  const handleNewTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewTodo(e.target.value);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.value === query) return;

    setQuery(e.target.value);
  };

  const handleFilterChange = (value: boolean | undefined) => {
    if (value === filter) return;

    setFilter(value);
  };

  useEffect(() => {
    dispatch(filterTodos(query, filter));
  }, [dispatch, todos, query, filter]);

  return (
    <div className="app__main">
      <div className="app__box">
        <div className="app__new-todo">
          <Button onClick={handleNew} type="primary" className="mr-1">
            Add
          </Button>
          <Input
            placeholder="Add new Todo"
            value={newTodo}
            onChange={handleNewTodoChange}
          />
        </div>
        <div className="app__list-todo mt-5 mb-5">
          <List
            dataSource={activeTodos}
            renderItem={(item) => (
              <div className="mt-1">
                <TodoEntry key={item.id} {...item} />
              </div>
            )}
          ></List>
        </div>

        <div className="app__filter-todo">
          <Typography.Text className="app__cant-todo box__center mr-1">{`Cant: ${todos.length}`}</Typography.Text>
          <Input
            value={query}
            onChange={handleQueryChange}
            className="mr-1"
            placeholder="Search"
          />
          <Select<boolean | undefined>
            allowClear
            onChange={handleFilterChange}
            placeholder="Filter"
          >
            <Option value={true}>Check</Option>
            <Option value={false}>No Check</Option>
          </Select>
        </div>
      </div>
    </div>
  );
};
