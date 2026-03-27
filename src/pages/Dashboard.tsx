import { useState } from "react";
import TaskList from "../components/TaskList";
import NewTask from "../components/AddTaskForm";

export interface Task {
  id: string;
  title: string;
  description: string;
}

const Dashboard = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <section className="dashboard">
      <TaskList setShowModal={setShowAddModal} />

      {showAddModal && <NewTask closeModal={() => setShowAddModal(false)} />}
    </section>
  );
};

export default Dashboard;
