//GET ALL TASKS FROM A USER
export const getTasks = async () => {
  try {
    const token = localStorage.getItem('taskToken')
    const response = await fetch('http://127.0.0.1:5000/api/tasks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    if (!response.ok) {
      throw new Error('Failed to fetch tasks')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching tasks:', error)
    throw error
  }
}

//CREATE A NEW TASK
export const createTask = async (title, label, completed) => {
  try {
    const token = localStorage.getItem('taskToken')
    const response = await fetch('http://127.0.0.1:5000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title, label, completed })
    })

    if (!response.ok) {
      throw new Error('Failed to create task')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error creating task:', error)
    throw error
  }
}

//UPDATE A TASK
export const updateTask = async (taskId, title, label, completed) => {
  try {
    const token = localStorage.getItem('taskToken')
    const response = await fetch(`http://127.0.0.1:5000/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title, label, completed })
    })

    if (!response.ok) {
      throw new Error('Failed to update task')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error updating task:', error)
    throw error
  }
}

//DELETE A TASK
export const deleteTask = async (taskId) => {
  try {
    const token = localStorage.getItem('taskToken')
    const response = await fetch(`http://127.0.0.1:5000/api/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to delete task')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error deleting task:', error)
    throw error
  }
}
