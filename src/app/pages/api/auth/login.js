import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed', allowedMethods: ['POST'] });
  }
  const { email, password } = req.body;

  try {
    
    const response = await axios.post('http://localhost:3001/api/auth/login', {
      email,
      password,
    });

    const { token } = response.data;

  
    res.status(200).json({ token });
  } catch (error) {
    // Handle any errors, such as network errors or authentication failure
    console.error('Login failed:', error.message);
    res.status(500).json({ error: 'Login failed' });
  }
}
