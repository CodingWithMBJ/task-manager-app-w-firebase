import type { Task } from "../pages/Dashboard";

type TaskListProps = {
  tasks: Task[];
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onEditClick: (task: Task) => void;
  onDeleteTask: (id: number) => void;
};

const TaskList = ({
  tasks,
  setShowModal,
  onEditClick,
  onDeleteTask,
}: TaskListProps) => {
  return (
    <div className="task-list">
      <h2>Task List</h2>

      <div className="tasks">
        {tasks.length === 0 ? (
          <p>No tasks yet</p>
        ) : (
          <ul className="task-ul">
            {tasks.map((task) => (
              <li key={task.id}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>

                <div className="task-actions">
                  <button type="button" onClick={() => onEditClick(task)}>
                    Edit
                  </button>
                  <button type="button" onClick={() => onDeleteTask(task.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button type="button" onClick={() => setShowModal(true)}>
        Add Task
      </button>
    </div>
  );
};

export default TaskList;
