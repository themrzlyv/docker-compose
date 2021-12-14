import './App.css';
import React from 'react';

function App() {

  const [todos,setTodos] = React.useState([]);
  const [form,setForm] = React.useState({title: '', description: ''});

  React.useEffect(() => {
    const getTodos = async () => {
      const res = await fetch('http://localhost:3050/');
      const data = await res.json();
      return setTodos(data);
    }
    getTodos();
  },[]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value}));
  }

  const onSubmit = async () => {
    const response = await fetch('http://localhost:3050/todo', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await response.json();
    console.log(data);
  }

  return (
    <div className="App">
      <div>
        <h4>Create Todo</h4>
        <input type="text" placeholder="Title" name="title" value={form.title} onChange={handleChange} />
        <input type="text" placeholder="Description" name="description" value={form.description} onChange={handleChange} />
        <button onClick={onSubmit}>Add</button>
      </div>
      <header className="App-header">
        <p>
          {todos && todos?.map(todo => (
            <div>
              <h4>{todo?.title}</h4>
              <p>{todo?.description}</p>
              <p>{todo?.created_at}</p>
            </div>
          ))}
        </p>
      </header>
    </div>
  );
}

export default App;
