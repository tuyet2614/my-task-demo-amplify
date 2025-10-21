"use client";

import { useState, useEffect } from "react";
import { authService } from "@/lib/auth";
import { storageService } from "@/lib/storage";
import FileUpload from "./FileUpload";

interface UploadedFile {
  key: string;
  lastModified: Date | undefined;
  size: number | undefined;
  url?: string;
}

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [avatar, setAvatar] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);

  useEffect(() => {
    loadUser();
    loadUploadedFiles();
    // Load saved avatar from localStorage
    const savedAvatar = localStorage.getItem("userAvatar");
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
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

  const loadUploadedFiles = async () => {
    setIsLoadingFiles(true);
    try {
      const files = await storageService.listFiles();
      const filesWithUrls = await Promise.all(
        files.map(async (file) => {
          try {
            const url = await storageService.getFileUrl(file.path);
            return {
              key: file.path,
              lastModified: file.lastModified,
              size: file.size,
              url: url,
            };
          } catch (error) {
            console.error(`Failed to get URL for file ${file.path}:`, error);
            return {
              key: file.path,
              lastModified: file.lastModified,
              size: file.size,
              url: undefined,
            };
          }
        })
      );
      setUploadedFiles(filesWithUrls);
    } catch (error) {
      console.error("Failed to load uploaded files:", error);
    } finally {
      setIsLoadingFiles(false);
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
    localStorage.setItem("userAvatar", fileUrl);
    setShowFileUpload(false);
    // Reload the files list to show the new upload
    loadUploadedFiles();
  };

  const handleSetAvatar = (fileUrl: string) => {
    setAvatar(fileUrl);
    localStorage.setItem("userAvatar", fileUrl);
  };

  const handleDeleteFile = async (fileKey: string) => {
    try {
      await storageService.deleteFile(fileKey);
      // Remove from local state
      setUploadedFiles((prev) => prev.filter((file) => file.key !== fileKey));
      // If this was the current avatar, clear it
      if (avatar && uploadedFiles.find((f) => f.key === fileKey)?.url === avatar) {
        setAvatar("");
        localStorage.removeItem("userAvatar");
      }
    } catch (error) {
      console.error("Failed to delete file:", error);
    }
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
              <h4 className="text-md font-medium text-gray-900 mb-4">File Management</h4>

              {/* Current Avatar */}
              {avatar && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Current Avatar</h5>
                  <img src={avatar} alt="Avatar" className="h-20 w-20 rounded-full object-cover" />
                </div>
              )}

              {/* Upload Button */}
              {showFileUpload ? (
                <FileUpload onFileUploaded={handleFileUploaded} onCancel={() => setShowFileUpload(false)} />
              ) : (
                <button
                  onClick={() => setShowFileUpload(true)}
                  className="mb-6 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Upload New File
                </button>
              )}

              {/* Files List */}
              <div className="mt-6">
                <h5 className="text-sm font-medium text-gray-700 mb-4">Uploaded Files</h5>

                {isLoadingFiles ? (
                  <div className="text-gray-500">Loading files...</div>
                ) : uploadedFiles.length === 0 ? (
                  <div className="text-gray-500">No files uploaded yet.</div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {uploadedFiles.map((file) => (
                      <div key={file.key} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h6 className="text-sm font-medium text-gray-900 truncate">{file.key.split("/").pop()}</h6>
                          <div className="flex space-x-1">
                            {file.url && (
                              <button
                                onClick={() => handleSetAvatar(file.url!)}
                                className={`text-xs px-2 py-1 rounded ${
                                  avatar === file.url
                                    ? "bg-indigo-100 text-indigo-700"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                              >
                                {avatar === file.url ? "Avatar" : "Set Avatar"}
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteFile(file.key)}
                              className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                            >
                              Delete
                            </button>
                          </div>
                        </div>

                        {file.url && (
                          <div className="mb-2">
                            <img
                              src={file.url}
                              alt="Uploaded file"
                              className="w-full h-24 object-cover rounded"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = "none";
                              }}
                            />
                          </div>
                        )}

                        <div className="text-xs text-gray-500">
                          <div>Size: {file.size ? (file.size / 1024).toFixed(1) : "Unknown"} KB</div>
                          <div>
                            Uploaded: {file.lastModified ? new Date(file.lastModified).toLocaleDateString() : "Unknown"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
