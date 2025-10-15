"use client";

import { useState, useEffect } from "react";
import { authService } from "@/lib/auth";
import { storageService } from "@/lib/storage";
import FileUpload from "./FileUpload";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [avatar, setAvatar] = useState<string>("");

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

  const handleFileUploaded = (fileUrl: string) => {
    setAvatar(fileUrl);
    setShowFileUpload(false);
    // In a real app, you would update the user's avatar in the database
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
              <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
              <p className="text-gray-600">Manage your account settings</p>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/dashboard" className="text-gray-600 hover:text-gray-900">
                ← Back to Dashboard
              </a>
              <button onClick={handleSignOut} className="text-gray-600 hover:text-gray-900">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">User Information</h3>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <div className="mt-1 text-sm text-gray-900">{user.signInDetails?.loginId || "N/A"}</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">User ID</label>
                <div className="mt-1 text-sm text-gray-900">{user.userId || "N/A"}</div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-md font-medium text-gray-900 mb-4">Avatar Upload Demo</h4>

              {avatar && (
                <div className="mb-4">
                  <img src={avatar} alt="Avatar" className="h-20 w-20 rounded-full object-cover" />
                </div>
              )}

              {showFileUpload ? (
                <FileUpload onFileUploaded={handleFileUploaded} onCancel={() => setShowFileUpload(false)} />
              ) : (
                <button
                  onClick={() => setShowFileUpload(true)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Upload Avatar
                </button>
              )}
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-blue-900 mb-2">🚀 AWS S3 File Storage Demo</h4>
              <p className="text-sm text-blue-800">
                This demonstrates file upload to AWS S3 using Amplify Storage. Files are stored securely with private
                access level.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
