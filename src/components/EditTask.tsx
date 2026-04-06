import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Task } from "../pages/Dashboard";

type EditTaskProps = {
  closeModal: () => void;
  onEditTask: (id: string, updates: Partial<Task>) => void;
  taskToEdit: Task;
};

const EditTask = ({ closeModal, onEditTask, taskToEdit }: EditTaskProps) => {
  const [updates, setUpdates] = useState<Partial<Task>>({
    title: taskToEdit.title,
    description: taskToEdit.description,
  });

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
    <aside className="modal-overlay">
      <section className="modal">
        <h2>Edit Task</h2>

        <form onSubmit={handleSubmit} className="new-task">
          <article>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={updates.title ?? ""}
              onChange={handleChange}
              placeholder="What do you want to call it?"
            />
          </article>

          <article>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={updates.description ?? ""}
              onChange={handleChange}
              placeholder="Write something about this task"
            />
          </article>

          <article className="btn-container">
            <button type="submit">Save Task</button>
            <button type="button" onClick={closeModal}>
              Cancel
            </button>
          </article>
        </form>
      </section>
    </aside>
  );
};

export default EditTask;
