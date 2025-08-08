export const loginService = async (email, password) => {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json()

    if (!response.ok) {
      // Lanza el error con el mensaje específico del backend
      throw new Error(data.message || 'Login failed')
    }

    return data
  } catch (error) {
    console.error('Error during login:', error)
    throw error
  }
}

export const registerService = async (username, email, password) => {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    })

    const data = await response.json()

    if (!response.ok) {
      // Lanza el error con el mensaje específico del backend
      throw new Error(data.message || 'Registration failed')
    }

    return data
  } catch (error) {
    console.error('Error during registration:', error)
    throw error
  }
}

export const logoutService = async () => {
  try {
    const token = localStorage.getItem('taskToken')
    const response = await fetch('http://127.0.0.1:5000/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Logout failed')
    }

    return data
  } catch (error) {
    console.error('Error during logout:', error)
    throw error
  }
}