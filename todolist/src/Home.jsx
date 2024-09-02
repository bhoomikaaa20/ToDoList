import React, { useEffect, useState } from "react";
import {
  BsCircleFill,
  BsFillCheckCircleFill,
  BsFillTrashFill,
} from "react-icons/bs"; // Import the icons
import Create from "./Create";
import "./App.css";
import axios from "axios";

function Home() {
  const [todos, setTodos] = useState([]);

  const handleedit = (id) => {
    axios
      .put(`https://todolist-dpu4.onrender.com/update/${id}`)
      .then((result) => location.reload())
      .catch((error) => console.log(error));
  };

  const handledelete = (id) => {
    axios
      .delete(`https://todolist-dpu4.onrender.com/delete/${id}`)
      .then((result) => location.reload())
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .get("https://todolist-dpu4.onrender.com/get")
      .then((result) => setTodos(result.data))
      .catch((error) => console.log(error));
  }, []); // <-- Empty dependency array to run the effect once

  return (
    <div className="home">
      <h1>TODO LIST</h1>
      <Create />
      <div className="todo-list">
        {todos.length === 0 ? (
          <div>
            <h1>
              <center>No Records</center>
            </h1>
          </div>
        ) : (
          todos.map((todo) => (
            <div className="task" key={todo._id}>
              <div className="checkbox" onClick={() => handleedit(todo._id)}>
                {todo.done ? (
                  <BsFillCheckCircleFill className="icon-done" />
                ) : (
                  <BsCircleFill className="icon" />
                )}
                <div className={`todo-item ${todo.done ? "done" : ""}`}>
                  {todo.task}
                </div>
              </div>
              <span>
                <BsFillTrashFill
                  className="icon"
                  onClick={() => handledelete(todo._id)}
                />
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
