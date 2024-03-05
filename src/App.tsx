import { useState } from "react";
import "./App.css";

const DefaultList = [
  {
    key: 1,
    name: "bikin kopi",
    checked: false,
  },
];

function App() {
  const [lists, setLists] = useState([DefaultList]);

  function handleAddList(list) {
    setLists([...lists, list]);
  }
  function handleDeleteItem(id) {
    setLists((lists) => lists.filter((list) => list.id !== id));
  }
  function handleToggleItem(id) {
    setLists((lists) =>
      lists.map((list) =>
        list.id === id ? { ...list, checked: !list.checked } : list
      )
    );
  }

  return (
    <div className="app">
      <Header />
      <hr />
      <TodoList
        lists={lists}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Form onAddList={handleAddList} />
      <Footer lists={lists} />
      {/* <br />
      <br />
      <br />
      <br />
      <em>*This App will restart when page refreshes</em> */}
    </div>
  );
}

export default App;

function Header() {
  return <h1>To Do List</h1>;
}
function Form({ onAddList }) {
  const [todo, setTodo] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo) return;
    const newList = { id: Date.now(), todo, checked: false };
    onAddList(newList);
    console.log(newList);
    setTodo("");
  };
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Add to do</h3>
      <input
        type="text"
        placeholder="Write here.."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button>Add</button>
      <br />
      <br />
    </form>
  );
}

function TodoList({ lists, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {lists.map((items) => (
          <List
            items={items}
            key={items.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Footer({ lists }) {
  const checkedItems = lists.filter((list) => list.checked).length;

  return <footer className="stats">Done: {checkedItems}</footer>;
}

function List({ items, onDeleteItem, onToggleItem }) {
  return (
    <li key={items.id}>
      <input
        type="checkbox"
        checked={items.checked}
        onChange={() => onToggleItem(items.id)}
        className="checkbox"
      />
      <span style={items.checked ? { textDecoration: "line-through" } : {}}>
        {items.todo}
      </span>
      <button onClick={() => onDeleteItem(items.id)}>&times;</button>
    </li>
  );
}
