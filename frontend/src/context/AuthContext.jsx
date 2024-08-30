import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const navigate=useNavigate()
  const [auth, setAuth] = useState({ token: null, user: null });

  const login = async (email, password) => {
    const res = await axios.post(apiUrl+'/api/auth/login', { email, password });
    setAuth({ token: res.data.token, user: res.data.user });
    if(res.data?.token){
      localStorage.setItem('authToken', res.data.token);
      navigate("/tasks")
    }
  };

  const register = async (username, email, password) => {
    let result=await axios.post(apiUrl+'/api/auth/register', { username, email, password });
    if(result.data?.message==="User registered successfully"){
      navigate("/")
    }else{
    
    }
  };

  const logout = () => {
    setAuth({ token: null, user: null });
    localStorage.removeItem('authToken');
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuth({ ...auth, token });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
