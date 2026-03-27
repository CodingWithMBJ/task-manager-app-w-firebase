type TaskListProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const TaskList = ({ setShowModal }: TaskListProps) => {
  return (
    <div className="task-list">
      <h2>Task List</h2>

      <div className="tasks">
        <p>Your tasks will go here</p>
      </div>

      <button type="button" onClick={() => setShowModal(true)}>
        Add Task
      </button>
    </div>
  );
};

export default TaskList;
