import React, { useState, useEffect } from 'react';
import css from '../css/get.module.css';
import api from '../services/api';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Get() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const apiAsync = async () => {
      try {
        const { data } = await api.get(`/cliente`);
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    apiAsync();
  }, []);
  return (
    <div>
      <div className="container">
        <div style={{ boxShadow: '10px 10px 10px', marginTop: '15px' }}>
          <h2>Cadastrar Cliente</h2>
        </div>
        <div style={{ marginBottom: '20px', marginTop: '20px' }}>
          <Link to="/cadastrarCliente">
            <button type="button" className="btn btn-primary">
              Adicionar
            </button>
          </Link>
        </div>
        <div
          className="table-responsive"
          style={{ boxShadow: '10px 10px 10px' }}
        >
          <table className="table table-hover table-dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Endereço</th>
                <th>Telefone</th>
                <th>Email</th>
                <th>Atualizar</th>
                <th>Deletar</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const { id, nome, end, telefone, email } = user;

                return (
                  <tr key={id}>
                    <td>{id} </td>
                    <td>{nome}</td>
                    <td>{end}</td>
                    <td>{telefone}</td>
                    <td>{email}</td>
                    <td>
                      <Link to={`/alterarCliente/${id}`}>
                        <button
                          type="button"
                          className="btn btn-warning"
                          style={{
                            color: 'white',
                            fontWeight: 'bold',
                          }}
                        >
                          Alterar
                        </button>
                      </Link>
                    </td>

                    <td>
                      <Link to={`/deletarCliente/${id}`}>
                        <button
                          type="button"
                          className="btn btn-danger"
                          style={{
                            color: 'white',
                            fontWeight: 'bold',
                          }}
                        >
                          Apagar
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
