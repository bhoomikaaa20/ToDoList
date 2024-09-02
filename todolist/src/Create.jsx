import React, { useState } from "react";
import axios from "axios";
import "./App.css";
function Create() {
  const [task, setTask] = useState();

  const handleadd = () => {
    axios
      .post("https://todolist-dpu4.onrender.com/add", { task: task })
      .then((result) => location.reload())
      .catch((error) => console.log(error));
  };
  return (
    <div className="create_form">
      <input
        type="text"
        name=""
        id=""
        placeholder="Add a task"
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="button" onClick={handleadd}>
        ADD
      </button>
    </div>
  );
}

export default Create;
