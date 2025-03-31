import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { useAuthStore } from '../../store/authStore';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/register', { name, email, password });
      const { token, user } = response.data;
      setAuth(token, user);
      navigate('/books');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      alert('Erro no cadastro.');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card w-50">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Registrar</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nome</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">E-mail</label>
              <input 
                type="email" 
                className="form-control" 
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Senha</label>
              <input 
                type="password" 
                className="form-control" 
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <button type="submit" className="btn btn-success w-100">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
