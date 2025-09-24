import useAuthStore from "../store/useAuthStore";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import './css/loginpage.css'

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

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
  }



  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name == 'email') setEmail(value);
    if (name == 'password') setPassword(value);
  }




  return (
    <main className="login-background">
      <section className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-form-tittle">Login</h2>
          <div className="form-input-container email">
            <input className="form-input" type="email" placeholder="Digite seu email" name="email" id="email" value={email} onChange={handleChange} required />
          </div>
          <div className="form-input-container password">
            <input className="form-input" type="password" placeholder="Digite sua senha" name="password" id="password" value={password} onChange={handleChange} required />
          </div>
          <button className="form-btn-submit" type="submit" disabled={isLoading} >Entrar</button>
          {error && <p>{error}</p>}
          <Link className="form-link-login" to="/register">Ainda não tem conta?</Link>
        </form>
        <div className="aside-image"></div>
      </section>
    </main>
  )
}