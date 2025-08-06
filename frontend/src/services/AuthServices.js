export const loginService = async (email, password) => {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    if (!response.ok) {
      throw new Error('Login failed')
    }
    const data = await response.json()
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
    if (!response.ok) {
      throw new Error('Registration failed')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error during registration:', error)
    throw error
  }
}