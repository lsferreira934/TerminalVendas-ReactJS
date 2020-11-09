import React, { useState, useEffect } from 'react';

import api from '../services/api';
import { Link } from 'react-router-dom';
import css from '../css/update.module.css';
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
          <div>
            <Link to="/cadastrarCliente">
              <button
                type="button"
                className="btn btn-primary"
                style={{
                  marginTop: '4px',
                  marginBottom: '4px',
                  fontWeight: 'bold',
                }}
              >
                Adicionar
              </button>
            </Link>
          </div>
        </div>
        <div
          className="table-responsive"
          style={{ boxShadow: '10px 10px 10px' }}
        >
          <table
            className="table table-hover table-dark"
            style={{ marginBottom: '0px' }}
          >
            <thead id={css.theadEdit}>
              <tr id={css.trEdit}>
                <th id={css.thEditId}>ID</th>
                <th id={css.thEdit}>Nome</th>
                <th id={css.thEdit}>Endereço</th>
                <th id={css.thEdit}>Telefone</th>
                <th id={css.thEdit}>Email</th>
                <th id={css.thEditAlt}>Alterar</th>
                <th id={css.thEditApg}>Apagar</th>
              </tr>
            </thead>
            <tbody id={css.tbodyEdit}>
              {users.map((user) => {
                const { id, nome, end, telefone, email } = user;

                return (
                  <tr id={css.trBodyEdit} key={id}>
                    <td id={css.tdBodyEdit}>{id} </td>
                    <td id={css.tdBodyEdit}>{nome}</td>
                    <td id={css.tdBodyEdit}>{end}</td>
                    <td id={css.tdBodyEdit}>{telefone}</td>
                    <td id={css.tdBodyEdit}>{email}</td>
                    <td id={css.tdBodyEditAlt}>
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

                    <td id={css.tdBodyEdit}>
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
