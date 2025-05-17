import * as React from 'react';
import { Checkbox } from '../checkbox';
import { TodosContext } from '../../todo-context';
import './todo-list.scss';

export const TodoList = () => {
  const { todos, setTodos } = React.useContext(TodosContext);
  const [filter, setFilter] = React.useState('all');
  const [searchText, setSearchText] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const handleDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));    
  };

  const toggleCheck = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  const handleKeyUp = (e, id) => {
    if (e.keyCode === 13) {
      toggleCheck(id);
    }
  };

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === 'completed') return todo.checked;
      if (filter === 'incomplete') return !todo.checked;
      return true;
    })
    .filter((todo) => todo.label.toLowerCase().includes(searchText.toLowerCase()));

  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);
  const paginatedTodos = filteredTodos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="todo-list">
      <div className="todo-list-controls">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="todo-list-filters">
          <button onClick={() => setFilter('all')}>All</button>
          <button onClick={() => setFilter('completed')}>Completed</button>
          <button onClick={() => setFilter('incomplete')}>Incomplete</button>
        </div>
      </div>
      <span className="todo-list-title">Things to do:</span>
      {paginatedTodos.length ? (
        <div className="todo-list-content">
          {paginatedTodos.map((todoItem) => (
            <Checkbox
              key={todoItem.id}
              label={todoItem.label}
              checked={todoItem.checked}
              onChange={() => toggleCheck(todoItem.id)}
              onKeyUp={(e) => handleKeyUp(e, todoItem.id)}
              onDelete={() => handleDelete(todoItem.id)}
            />
          ))}
        </div>
      ) : (
        <div className="no-todos">No tasks found!</div>
      )}
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? 'active' : ''}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
