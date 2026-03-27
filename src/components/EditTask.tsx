import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Task } from "../pages/Dashboard";

type EditTaskProps = {
  closeModal: () => void;
  onEditTask: (id: number, updates: Partial<Task>) => void;
  taskToEdit: Task;
};

const EditTask = ({ closeModal, onEditTask, taskToEdit }: EditTaskProps) => {
  const [updates, setUpdates] = useState<Partial<Task>>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setUpdates((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEditTask(taskToEdit.id, updates);
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Task</h2>

        <form onSubmit={handleSubmit} className="new-task">
          <div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={updates.title ?? taskToEdit.title}
              onChange={handleChange}
              placeholder="What do you want to call it?"
            />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={updates.description ?? taskToEdit.description}
              onChange={handleChange}
              placeholder="Write something about this task"
            />
          </div>

          <div className="btn-container">
            <button type="submit">Save Task</button>
            <button type="button" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
