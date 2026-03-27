import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Task } from "../pages/Dashboard";

type NewTaskProps = {
  closeModal: () => void;
  onAddTask: (newTask: Omit<Task, "id">) => void;
};

const AddTaskForm = ({ closeModal, onAddTask }: NewTaskProps) => {
  const [task, setTask] = useState<Omit<Task, "id">>({
    title: "",
    description: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddTask(task);
    setTask({ title: "", description: "" });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Task</h2>

        <form onSubmit={handleSubmit} className="new-task">
          <div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={task.title}
              onChange={handleChange}
              placeholder="What do you want to call it?"
            />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={task.description}
              onChange={handleChange}
              placeholder="Write something about this task"
            />
          </div>

          <div className="btn-container">
            <button type="submit">Add Task</button>
            <button type="button" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;
