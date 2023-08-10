import { Button, Input, List, Select } from "antd";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import { TodoEntry } from "./TodoEntry";
import { useEffect, useState } from "react";
import { addTodo, filterByText, filterByType } from "../actions/actionsTodo";

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

    setQuery(e.target.value);
    dispatch(filterByText(e.target.value));
  };

  const handleFilterChange = (value: boolean | null) => {
    setFilter(value);
    if (value === null) return;

    dispatch(filterByType(value));
  };

  useEffect(() => {
    dispatch(filterByText(query));
    
    if (filter !== null) {
      dispatch(filterByType(filter));
    }
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
