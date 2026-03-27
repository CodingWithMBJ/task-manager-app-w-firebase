import { useState, type ChangeEvent, type FormEvent } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

type NewTaskForm = {
  title: string;
  description: string;
};

type NewTaskProps = {
  closeModal: () => void;
};

const AddTaskForm = ({ closeModal }: NewTaskProps) => {
  const [task, setTask] = useState<NewTaskForm>({
    title: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!task.title.trim() || !task.description.trim()) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      await addDoc(collection(db, "tasks"), {
        title: task.title.trim(),
        description: task.description.trim(),
        createdAt: new Date(),
      });

      setTask({
        title: "",
        description: "",
      });

      closeModal();
    } catch (err) {
      console.error("Error adding task:", err);
      setError("Failed to save task.");
    } finally {
      setIsSubmitting(false);
    }
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

          {error && <p>{error}</p>}

          <div className="btn-container">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Add Task"}
            </button>
            <button type="button" onClick={closeModal} disabled={isSubmitting}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;
