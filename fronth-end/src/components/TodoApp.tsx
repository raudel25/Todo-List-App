import { Button, Input, List, Select } from "antd";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import { TodoEntry } from "./TodoEntry";
import { useEffect, useState } from "react";
import { addTodo, filterTodos } from "../actions/actionsTodo";

const { Option } = Select;

export const TodoApp = () => {
  const { activeTodos, todos } = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  const [newTodo, setNewTodo] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<boolean | null>(null);

  const handleNew = () => {
    dispatch(addTodo({ id: 1, todo: newTodo, complete: false }));
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
    dispatch(filterTodos(e.target.value, filter));
  };

  const handleFilterChange = (value: boolean | null) => {
    if (value === filter) return;

    setFilter(value);
    dispatch(filterTodos(query, value));
  };

  useEffect(() => {
    dispatch(filterTodos(query, filter));
  }, [dispatch, todos]);

  return (
    <div>
      <div>
        <Button onClick={handleNew}>Add</Button>
        <Input
          placeholder="Add"
          value={newTodo}
          onChange={handleNewTodoChange}
        />
      </div>
      <div>
        <List
          dataSource={activeTodos}
          renderItem={(item) => <TodoEntry key={item.id} {...item} />}
        ></List>
      </div>

      <div>
        <Input value={query} onChange={handleQueryChange} />
        <Select<boolean | null>
          allowClear
          onChange={handleFilterChange}
          placeholder="Filtrar por estado"
        >
          <Option value={true}>Completado</Option>
          <Option value={false}>No completado</Option>
        </Select>
      </div>
    </div>
  );
};
