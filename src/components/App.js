import '../assets/styles/App.css';
import All from "./pages/All";
import Footer from "./Footer";
import Active from "./pages/Active";
import React from "react";
import Completed from "./pages/Completed";
import {Route, Routes} from "react-router-dom";

const data = [
    {
        _id: 124343351,
        title: 'не сделано1',
        isCompleted: false,
    },
    {
        _id: 124343355,
        title: 'не сделано2',
        isCompleted: false,
    },
    {
        _id: 12322,
        title: 'сделано1',
        isCompleted: true,
    },
    {
        _id: 12311,
        title: 'сделано2',
        isCompleted: true,
    }
]

function App() {
    const [todos, setTodos] = React.useState(data);
    const [title, setTitle] = React.useState("");
    const [checked, setChecked] = React.useState(true);
    const leftTodo = [...todos].filter(todo => todo.isCompleted === false);
    const doneTodo = [...todos].filter(todo => todo.isCompleted === true);

    const changeTodo = (id) => {
        const copy = [...todos];
        const current = copy.find(todo => todo._id === id);
        current.isCompleted = !current.isCompleted;
        setTodos(copy);
    }

    function checkAllTodos() {
        setChecked(!checked);
        todos.map(todo => todo.isCompleted = checked);
        setTodos(todos);
    }

    const removeTodo = (id) => {
        setTodos([...todos].filter(todo=>todo._id !== id));
    }

    const removeAllTodos = () => {
        setTodos(todos.filter(todo => todo.isCompleted === false));
        console.log('dfd')
    }

    const addTodo = (e) => {
        e.preventDefault();
        setTodos(prev => [
            {
                _id: Math.random(),
                title,
                isCompleted: false,
            },
            ...prev,
        ])
        setTitle('')
    }

    return (
        <div className="app">
            <header className="app__header">
                <h1 className="header">todos</h1>
            </header>
            <main className="app__main">
                <div className="main">
                    <form className="main__add" onSubmit={addTodo}>
                        <input className="check-all" type="button" onClick={checkAllTodos}/>
                        <input className="input-add" required onChange={e => setTitle(e.target.value)} value={title} type="text"
                               placeholder="What needs to be done?"/>
                    </form>
                    <Routes>
                        <Route path="/active" element={<Active leftTodo={leftTodo} changeTodo={changeTodo} removeTodo={removeTodo}/>}/>
                        <Route path="/completed" element={<Completed doneTodo={doneTodo} changeTodo={changeTodo} removeTodo={removeTodo}/>}/>
                        <Route exact path="/" element={<All todos={todos} changeTodo={changeTodo} removeTodo={removeTodo}/>}/>
                    </Routes>
                    <Footer leftTodo={leftTodo} removeAllTodos={removeAllTodos}/>
                </div>
            </main>
        </div>
    );
}

export default App;
