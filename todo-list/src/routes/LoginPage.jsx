import useAuthStore from "../store/useAuthStore";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading, isAuthenticated } = useAuthStore();
  const navigate =  useNavigate();

  const validateForm = () => {
    if (!email || !password) {
      setError("Complete os campos");
      return false
    }

    setError('');
    return true;
  }

  useEffect(() => {
    if (isAuthenticated()) {
        navigate('/');
    }
  })


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
        const data = await login(email, password) 
        console.log(data);
        console.log(email, password);
    }
  
  

  const handleChange = (e) => {
    const {name, value} = e.target;
    if (name == 'email') setEmail(value);
    if (name == 'password') setPassword(value);
  }




  return (
      <section className="container">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="email">
            <input type="email" placeholder="Digite seu email" name="email" id="email" value={email} onChange={handleChange} required/>
          </div>
          <div className="password">
            <input type="password" placeholder="Crie sua senha" name="password" id="password" value={password} onChange={handleChange} required/>
          </div>
            <button type="submit" disabled={isLoading} >Entrar</button>
            {error && <p>{error}</p>}
        </form>
          <Link id="link" to="/register">Ainda não tem conta?</Link>
      </section>
  )
}