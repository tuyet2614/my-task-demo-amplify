"use client";

import { useState, useEffect } from "react";
import { authService } from "@/lib/auth";
import TaskForm from "./tasks/TaskForm";
import TaskList from "./tasks/TaskList";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error("Failed to load user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      window.location.href = "/login";
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  const handleTaskCreated = () => {
    setShowTaskForm(false);
    // TaskList will automatically reload
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Please sign in</h2>
          <a href="/login" className="text-indigo-600 hover:text-indigo-500">
            Go to login page
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
              <p className="text-gray-600">Welcome back, {user.signInDetails?.loginId || "User"}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowTaskForm(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                + New Task
              </button>
              <button onClick={handleSignOut} className="text-gray-600 hover:text-gray-900">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showTaskForm ? (
          <div className="max-w-2xl mx-auto">
            <TaskForm onTaskCreated={handleTaskCreated} onCancel={() => setShowTaskForm(false)} />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <TaskList />
          </div>
        )}
      </main>
    </div>
  );
}
