import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';

const BookForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState<number | ''>('');
  const [genre, setGenre] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/books', { title, author, year: Number(year), genre });
      navigate('/books');
    } catch (error) {
      console.error('Erro ao cadastrar livro:', error);
      alert('Erro ao cadastrar livro.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: '600px' }}>
        <div className="card-header">
          <h2>Cadastrar Livro</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Título</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Autor</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Autor"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Ano</label>
              <input 
                type="number" 
                className="form-control" 
                placeholder="Ano"
                value={year}
                onChange={(e) => setYear(e.target.value ? Number(e.target.value) : '')}
                required 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Gênero</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Gênero"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Cadastrar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookForm;
