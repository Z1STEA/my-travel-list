
import { useState } from "react";

// Initial packing items
const initialItems = [
  { id: 1, description: "Shirt", quantity: 5, packed: false },
  { id: 2, description: "Pants", quantity: 2, packed: false },
];

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form(props) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (description.trim() === "") {
      return;
    }

    const newItem = {
      id: Date.now(),
      description: description,
      quantity: quantity,
      packed: false,
    };

    props.onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>

      <select
        value={quantity}
        onChange={function (e) {
          setQuantity(Number(e.target.value));
        }}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>

      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={function (e) {
          setDescription(e.target.value);
        }}
      />

      <button type="submit">ADD</button>
    </form>
  );
}

function Item(props) {
  let textStyle = {};

  if (props.item.packed) {
    textStyle.textDecoration = "line-through";
  }

  return (
    <li>
      <input
        type="checkbox"
        checked={props.item.packed}
        onChange={function () {
          props.onUpdateItem(props.item.id);
        }}
      />

      <span style={textStyle}>
        {props.item.quantity} {props.item.description}
      </span>

      <button
        type="button"
        onClick={function () {
          props.onDeleteItem(props.item.id);
        }}
      >
        ❌
      </button>
    </li>
  );
}

function PackingList(props) {
  return (
    <div className="list">
      <ul>
        {props.items.map(function (item) {
          return (
            <Item
              item={item}
              onUpdateItem={props.onUpdateItem}
              onDeleteItem={props.onDeleteItem}
              key={item.id}
            />
          );
        })}
      </ul>
    </div>
  );
}

function Stats(props) {
  const totalItems = props.items.length;

  const packedItems = props.items.filter(function (item) {
    return item.packed;
  }).length;

  let percentage = 0;

  if (totalItems > 0) {
    percentage = Math.round((packedItems / totalItems) * 100);
  }

  return (
    <footer className="stats">
      <em>
        {totalItems === 0
          ? "Start adding some items to your packing list!"
          : `You have ${totalItems} items in the list. You already packed ${packedItems} (${percentage}%).`}
      </em>
    </footer>
  );
}

function App() {
  const [items, setItems] = useState(initialItems);

  function handleAddItems(newItem) {
    setItems(function (previousItems) {
      return [...previousItems, newItem];
    });
  }

  function handleUpdateItem(id) {
    setItems(function (previousItems) {
      return previousItems.map(function (item) {
        if (item.id === id) {
          return { ...item, packed: !item.packed };
        }

        return item;
      });
    });
  }

  function handleDeleteItem(id) {
    setItems(function (previousItems) {
      return previousItems.filter(function (item) {
        return item.id !== id;
      });
    });
  }

  return (
    <div className="app">
      <Logo />

      <Form onAddItems={handleAddItems} />

      <PackingList
        items={items}
        onUpdateItem={handleUpdateItem}
        onDeleteItem={handleDeleteItem}
      />

      <Stats items={items} />
    </div>
  );
}

export default App;
