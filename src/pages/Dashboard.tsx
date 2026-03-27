import { useState } from "react";
import TaskList from "../components/TaskList";
import NewTask from "../components/AddTaskForm";
import EditTask from "../components/EditTask";

export interface Task {
  id: number;
  title: string;
  description: string;
}

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const handleAddTask = (newTask: Omit<Task, "id">) => {
    const taskWithId: Task = {
      id: Date.now(),
      ...newTask,
    };

    setTasks((prev) => [...prev, taskWithId]);
    setShowAddModal(false);
  };

  const handleEditTask = (id: number, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task)),
    );
    setTaskToEdit(null);
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <section className="dashboard">
      <TaskList
        tasks={tasks}
        setShowModal={setShowAddModal}
        onEditClick={setTaskToEdit}
        onDeleteTask={handleDeleteTask}
      />

      {showAddModal && (
        <NewTask
          closeModal={() => setShowAddModal(false)}
          onAddTask={handleAddTask}
        />
      )}

      {taskToEdit && (
        <EditTask
          closeModal={() => setTaskToEdit(null)}
          onEditTask={handleEditTask}
          taskToEdit={taskToEdit}
        />
      )}
    </section>
  );
};

export default Dashboard;
