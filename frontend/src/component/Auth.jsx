import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Auth = ({ type }) => {
    const { login, register } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: '', password: '', username: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (type === 'login') {
            await login(formData.email, formData.password);
        } else {
            await register(formData.username, formData.email, formData.password);
        }
    };
    const navigate=useNavigate();
    return (
        <form onSubmit={handleSubmit}>
            {type === 'register' && (
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />
            )}
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
            />
            <button type="submit">{type === 'login' ? 'Login' : 'Register'}</button>
            {type === 'login' ? <div className='small'>New user? <span className="cursor-pointer" onClick={()=>navigate("/register")}><a>{" "}Create Account</a></span></div> : 
            <div className='small'>already have account?<span className="cursor-pointer" onClick={()=>navigate("/")}><a>{"  "}Login</a></span></div>}
        </form>
    );
};

export default Auth;
