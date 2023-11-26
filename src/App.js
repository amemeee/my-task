import { useState } from "react";

const  noteList = [
  {
    id:1,
    name: 'workout',
    checked: true,
  },
  {
    id:2,
    name: 'study',
    checked: false,
  },
];

export default function App() {

const [items,setItems] = useState(noteList);

function handleAddItem(item){
  setItems([...items,item]);
}

function handleDeleteItem(id){
  setItems((items) => items.filter((item) => item.id !== id));
}

function handleToggleItem(id){
  setItems((items) => items.map((item) => (item.id === id ? {...item,checked: !item.checked} : 
  item)));
}

function handleClearItems(){
  setItems([]);
}

  return (
    <div className="app">
   <Header />
    <Form onAddItem={handleAddItem} />
    <List items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onClearItems={handleClearItems} />
    <Footer  items={items} />
  </div>
  );
}

function Header(){
  return <div className="title">
  <h1>MY TASK</h1>
  </div>;
}

function Form({onAddItem}){

  const [name,setName] = useState('');

  function handleSubmit(e){
    e.preventDefault();

    if(!name){
      alert('Please add!');
      return;
    }

    alert(name + ' item successfully added!');
    const newItem = {name,checked:false,id:Date.now()};
    onAddItem(newItem);

    console.log(newItem);
    setName('');

  }



  return <form className="add-form" onSubmit={handleSubmit} > 
      <div className="actions" >
        <input type="text" placeholder="add something to do..." value={name} onChange={(e) => setName(e.target.value)}/>
        <button><b>+</b></button>
      </div>
    </form>
}

function List({items,onDeleteItem,onToggleItem,onClearItems}){

const [sortBy, setSortBy] = useState('input');
let sortedItems;


if(sortBy === 'input'){
  sortedItems = items;
}

if(sortBy === 'name'){
  sortedItems = items.slice().sort((a,b) => a.name.localeCompare(b.name));
}

if(sortBy === 'checked'){
  sortedItems = items.slice().sort((a,b) => a.checked - b.checked);
}



return (
  <>
  <div className="list">
  <ul className="item-list">
      
    {sortedItems.map((item) => (
      <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />
    ))}


    </ul>
  </div>
  <div className="actions">
    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
      <option value="input">Sort by Input</option>
      <option value="name">Sort by Task</option>
      <option value="checked">Sort By Checklist</option>
    </select>
    <button onClick={onClearItems}>Clear Task</button>
  </div>
  </>
)
}

function Item({item,onDeleteItem,onToggleItem}){
  return (
    <li key={item.id}>
      <input type="checkbox" checked={item.checked} onChange={() => onToggleItem(item.id)} />
      <span style={  item.checked ? {textDecoration:'line-through'  } : {}}>
        {item.name}
      </span>
      <button class="remove" onClick={() =>onDeleteItem(item.id)}>&times;</button>
    </li>
    );
}

function Footer({items}){

  if(items.length === 0) return <footer className="stats"> DATA ISNT AVAILABLE</footer>

  const totalItems = items.length;
  const checkedItems = items.filter((item) => item.checked).length;
  const percentage = Math.round((checkedItems / totalItems) * 100);
 return <footer className="stats">{totalItems} task(s) added. <br/>{checkedItems} task(s) completed!</footer>
}

