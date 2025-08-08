import { useState } from "react";

export const ModalAddTask = ({ onClose, onSave }) => {
  const [task, setTask] = useState({
    title: "",
    label: "",
  })
  const [selectedCategories, setSelectedCategories] = useState([])

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [id]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ ...task, categories: selectedCategories })
    setTask({ title: "", label: "" })
    setSelectedCategories([])
    onClose()
  }


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg px-5 py-3 w-1/3">
        <div className="flex w-full justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Note</h2>
          <button
            onClick={onClose}
            className="hover:text-gray-500 text-gray-400 font-semibold px-2 cursor-pointer">X</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Task</label>
            <input
              className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              id="title"
              type="text"
              value={task.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="label" className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              id="label"
              rows={4}
              value={task.label}
              onChange={handleInputChange}
              className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-700">Add Task</button>
        </form>
      </div>
    </div>
  )
}