import useAuthStore from "../store/useAuthStore";
import { useState} from "react";
import "./css/registerpage.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [name, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register, isLoading } = useAuthStore();
  const navigate =  useNavigate();

  const validateForm = () => {
    if (!name || !email || !password) {
      setError("Complete os campos");
      return false
    }
    if (password.length < 6) {
      setError("A senha deve conter no minimo 6 carateres");
      return false
    }

    setError('');
    return true;
  }



  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
        const data = await register(name, email, password) 
        console.log(data);
        console.log(name, email, password);
        navigate('/login');
    }
  
  

  const handleChange = (e) => {
    const {name, value} = e.target;
    if (name == 'name') setUserName(value);
    if (name == 'email') setEmail(value);
    if (name == 'password') setPassword(value);
  }




  return (
    <main className="register-background">
      <section className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2 className="register-form-tittle">Crie sua conta</h2>
          <div className="form-input-container register-form-name">
            <input className="form-input" type="text" placeholder="Digite seu nome" name="name" id="name" value={name} onChange={handleChange} required/>
          </div>
          <div className="form-input-container register-form-email">
            <input className="form-input" type="email" placeholder="Digite seu email" name="email" id="email" value={email} onChange={handleChange} required/>
          </div>
          <div className="form-input-container register-form-password">
            <input className="form-input" type="password" placeholder="Digite sua senha" name="password" id="password" value={password} onChange={handleChange} required/>
          </div>
          <button className="form-btn-submit" type="submit" disabled={isLoading} >Cadastrar</button>
          {error && <p>{error}</p>}
          <Link className="form-link-login" to="/login">Já tem conta?</Link>
        </form>
        <div className="aside-image"></div>
      </section>

    </main>
  )
}

