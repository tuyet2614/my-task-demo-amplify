'use client'

import { useState, useEffect } from 'react'
import { taskService } from '@/lib/api'
import { Task, TaskStatus } from '@/types'

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      setIsLoading(true)
      const taskList = await taskService.listTasks()
      setTasks(taskList)
    } catch (err: any) {
      setError(err.message || 'Failed to load tasks')
    } finally {
      setIsLoading(false)
    }
  }

  const toggleTaskStatus = async (task: Task) => {
    try {
      const newStatus = task.status === TaskStatus.TODO ? TaskStatus.DONE : TaskStatus.TODO
      await taskService.updateTask({
        id: task.id,
        status: newStatus,
      })
      loadTasks() // Reload tasks
    } catch (err: any) {
      setError(err.message || 'Failed to update task')
    }
  }

  const deleteTask = async (id: string) => {
    try {
      await taskService.deleteTask(id)
      loadTasks() // Reload tasks
    } catch (err: any) {
      setError(err.message || 'Failed to delete task')
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading tasks...</div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {tasks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No tasks yet. Create your first task!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 border rounded-lg ${
                task.status === TaskStatus.DONE
                  ? 'bg-green-50 border-green-200'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3
                    className={`text-lg font-medium ${
                      task.status === TaskStatus.DONE
                        ? 'line-through text-gray-500'
                        : 'text-gray-900'
                    }`}
                  >
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="mt-1 text-sm text-gray-600">{task.description}</p>
                  )}
                  <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                    <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                    {task.attachment && (
                      <span className="text-blue-600">📎 Has attachment</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleTaskStatus(task)}
                    className={`px-3 py-1 text-sm rounded ${
                      task.status === TaskStatus.TODO
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {task.status === TaskStatus.TODO ? 'Mark Done' : 'Mark Todo'}
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
