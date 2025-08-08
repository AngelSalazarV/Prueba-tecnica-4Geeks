import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModalAddTask } from "../components/ModalAddTask"
import { ModalEditTask } from "../components/ModalEditTask"
import { getTasks } from "../services/TaskServices";
import { createTask } from "../services/TaskServices";
import { deleteTask } from "../services/TaskServices";
import { updateTask } from "../services/TaskServices";
import { logoutService } from "../services/AuthServices";
import { TaskCard } from "../components/TaskCard";

export function HomePage() {

  const [tasks, setTasks] = useState([]);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false)
  const [isModalEditOpen, setIsModalEditOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)

  const navigate = useNavigate()

  const fetchTasks = async () => {
    try {
      const data = await getTasks()
      setTasks(data)
    } catch (error) {
      console.error("Error fetching tasks:", error)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleAddTask = async (newTask) => {
    try {
      const createdTask = await createTask(newTask.title, newTask.label, newTask.completed)
      setTasks([...tasks, createdTask])
      setIsModalAddOpen(false)
    } catch (error) {
      console.error("Error adding task:", error)
    }
  }

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId)
      setTasks(tasks.filter(task => task.id !== taskId))
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }

  const handleToggleComplete = async (taskId) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === taskId)
      if (!taskToUpdate) return

      await updateTask(taskId, taskToUpdate.title, taskToUpdate.label, !taskToUpdate.completed)
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      )
    } catch (error) {
      console.error("Error toggling task completion:", error)
    }
  }

  const handleEditTask = (task) => {
    setSelectedTask(task)
    setIsModalEditOpen(true)
  }

  const handleSaveEditedTask = async ({ title, label, completed }) => {
    if (!selectedTask) return
    try {
      await updateTask(selectedTask.id, title, label, completed)
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === selectedTask.id ? { ...task, title, label, completed } : task
        )
      )
    } catch (error) {
      console.error("Error saving edited task:", error)
    }
  }

  const handleLogout = async () => {
    try {
      await logoutService()
      localStorage.removeItem('taskToken')
      navigate("/login")
    } catch (error) {
      console.error("Error during logout:", error)
      localStorage.removeItem('taskToken')
      navigate("/login")
    }
  }

  return (
    <>
      {isModalAddOpen && (
        <ModalAddTask
          onClose={() => setIsModalAddOpen(false)}
          onSave={handleAddTask}
        />
      )}
      {isModalEditOpen && (
        <ModalEditTask
          isOpen={isModalEditOpen}
          onClose={() => setIsModalEditOpen(false)}
          task={selectedTask}
          onSave={handleSaveEditedTask}
        />
      )}
      <main className="flex flex-col items-center justify-center h-screen">
        <div className="border-2 border-gray-300 rounded-lg bg-white w-[90%] h-[85%] overflow-scroll scrollbar-hide">
          <header className="flex stiky top-0 gap-x-10 items-center p-3 justify-between bg-gray-200">
            <div className="flex w-full gap-x-10 items-center">
              <div className="text-3xl font-semibold text-gray-700">Notes</div>
              <div>
                <button
                  className="bg-blue-700 text-md px-3 py-2 text-center text-white font-semibold rounded-sm cursor-pointer hover:bg-blue-600"
                  onClick={() => setIsModalAddOpen(true)}
                >
                  Add Task
                </button>
              </div>
            </div>
            <div>
              <button
                className="w-20px bg-red-500 px-5 py-3 rounded-sm font-semibold text-white cursor-pointer hover:bg-red-400"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </header>
          <div className="grid grid-cols-5 gap-4 p-4">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                label={task.label}
                completed={task.completed}
                onDelete={handleDeleteTask}
                onComplete={handleToggleComplete}
                onEdit={() => handleEditTask(task)}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}