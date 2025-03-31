import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { translateStatus } from '../../utils/translateStatus';

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  genre: string;
  status: string;
}

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const navigate = useNavigate();

  const fetchBook = async () => {
    try {
      const response = await api.get(`/books/${id}`);
      setBook(response.data);
    } catch (error) {
      console.error('Erro ao buscar detalhes do livro:', error);
    }
  };

  const handleRentToggle = async () => {
    try {
      const response = await api.patch(`/books/${id}/rent`);
      setBook(response.data);
    } catch (error) {
      console.error('Erro ao alterar status do livro:', error);
      alert('Operação não permitida');
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/books/${id}`);
      navigate('/books');
    } catch (error) {
      console.error('Erro ao excluir livro:', error);
      alert('Não é possível excluir um livro alugado.');
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  if (!book) {
    return <div className="container mt-5">Carregando...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: '600px' }}>
        <div className="card-header">
          <h2 className="mb-0">{book.title}</h2>
        </div>
        <div className="card-body">
          <p><strong>Autor:</strong> {book.author}</p>
          <p><strong>Ano:</strong> {book.year}</p>
          <p><strong>Gênero:</strong> {book.genre}</p>
          <p><strong>Status:</strong> {translateStatus(book.status)}</p>
          <div className="d-flex justify-content-between mt-4">
            <button 
              onClick={handleRentToggle} 
              className="btn btn-primary"
            >
              {book.status === 'AVAILABLE' ? 'Alugar' : 'Devolver'}
            </button>
            {book.status === 'AVAILABLE' && (
              <button 
                onClick={handleDelete} 
                className="btn btn-danger"
              >
                Excluir
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
