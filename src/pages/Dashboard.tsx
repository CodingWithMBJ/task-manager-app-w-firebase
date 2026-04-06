import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import TaskList from "../components/TaskList";
import AddTaskForm from "../components/AddTaskForm";
import EditTask from "../components/EditTask";
import { db } from "../services/firebaseConfig";

export interface Task {
  id: string;
  title: string;
  description: string;
}

const Dashboard = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const tasksRef = collection(db, "tasks");
    const q = query(tasksRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskData: Task[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();

        return {
          id: docSnap.id,
          title: data.title ?? "",
          description: data.description ?? "",
        };
      });

      setTasks(taskData);
    });

    return () => unsubscribe();
  }, []);

  const handleEditTask = async (id: string, updates: Partial<Task>) => {
    try {
      const taskRef = doc(db, "tasks", id);

      await updateDoc(taskRef, {
        title: updates.title ?? "",
        description: updates.description ?? "",
      });

      setTaskToEdit(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      const taskRef = doc(db, "tasks", id);
      await deleteDoc(taskRef);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
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
        <AddTaskForm closeModal={() => setShowAddModal(false)} />
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
