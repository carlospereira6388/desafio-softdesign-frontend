import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [authorFilter, setAuthorFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [page, setPage] = useState(0);
  const [size] = useState(10);

  const fetchBooks = async () => {
    try {
      const response = await api.get('/books', {
        params: {
          author: authorFilter,
          year: yearFilter,
          genre: genreFilter,
          page,
          size,
        },
      });
      setBooks(response.data.content);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [authorFilter, yearFilter, genreFilter, page, size]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Lista de Livros</h2>
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-2 mb-3">
            <div className="col-md-4">
              <input
                type="text"
                placeholder="Filtrar por autor"
                className="form-control"
                value={authorFilter}
                onChange={(e) => setAuthorFilter(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                placeholder="Filtrar por ano"
                className="form-control"
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                placeholder="Filtrar por gênero"
                className="form-control"
                value={genreFilter}
                onChange={(e) => setGenreFilter(e.target.value)}
              />
            </div>
          </div>
          <button onClick={fetchBooks} className="btn btn-primary">
            Filtrar
          </button>
        </div>
      </div>
      <div className="card">
        <div className="card-body p-0">
          <table className="table mb-0">
            <thead>
              <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>Ano</th>
                <th>Gênero</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.year}</td>
                  <td>{book.genre}</td>
                  <td>{translateStatus(book.status)}</td>
                  <td>
                    <Link to={`/books/${book.id}`} className="btn btn-sm btn-outline-primary">
                      Detalhar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="d-flex justify-content-between mt-3">
        <button onClick={() => setPage((p) => Math.max(p - 1, 0))} className="btn btn-secondary">
          Anterior
        </button>
        <button onClick={() => setPage((p) => p + 1)} className="btn btn-secondary">
          Próximo
        </button>
      </div>
    </div>
  );
};

export default BookList;
