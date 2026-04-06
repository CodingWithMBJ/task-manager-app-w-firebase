import type { Task } from "../pages/Dashboard";

type TaskListProps = {
  tasks: Task[];
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onEditClick: (task: Task) => void;
  onDeleteTask: (id: string) => void;
};

const TaskList = ({
  tasks,
  setShowModal,
  onEditClick,
  onDeleteTask,
}: TaskListProps) => {
  return (
    <article className="task-list">
      <h2>Task List</h2>

      <section className="tasks">
        {tasks.length === 0 ? (
          <p>No tasks yet</p>
        ) : (
          <article className="task-container">
            {tasks.map((task) => (
              <section key={task.id} className="task-card">
                <article className="task-header">
                  <h3>{task.title}</h3>
                </article>{" "}
                <article className="task-body">
                  <p className="task-description">{task.description}</p>
                </article>
                <article className="btn-container">
                  <button
                    type="button"
                    className="edit-btn btn"
                    onClick={() => onEditClick(task)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="del-btn btn"
                    onClick={() => onDeleteTask(task.id)}
                  >
                    Delete
                  </button>
                </article>
              </section>
            ))}
          </article>
        )}
      </section>

      <button
        type="button"
        className="add-btn"
        onClick={() => setShowModal(true)}
      >
        Add Task
      </button>
    </article>
  );
};

export default TaskList;
