import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PageLayout from "./layouts/PageLayout";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "./services/firebaseConfig";
import Dashboard from "./pages/Dashboard";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubcribe();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        {!user ? (
          <Route index element={<Home />} />
        ) : (
          <Route element={<PageLayout user={user} />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
