import React, { useState, useEffect } from 'react';

import api from '../services/api';
import { Link } from 'react-router-dom';
import css from '../css/update.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Get() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const apiAsync = async () => {
      try {
        const { data } = await api.get(`/produto`);

        setProducts(data);
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
          <h2>Cadastrar Produto</h2>
        </div>
        <div style={{ marginBottom: '20px', marginTop: '20px' }}>
          <div>
            <Link to="/cadastrarProduto">
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
                <th id={css.thEdit}>Quantidade</th>
                <th id={css.thEdit}>Valor de Custo</th>
                <th id={css.thEdit}>Valor de Venda</th>
                <th id={css.thEditAlt}>Alterar</th>
                <th id={css.thEditApg}>Apagar</th>
              </tr>
            </thead>
            <tbody id={css.tbodyEdit}>
              {products.map((product) => {
                const {
                  id,
                  nome,
                  qtd_estoque,
                  valor_custo,
                  valor_venda,
                } = product;
                return (
                  <tr id={css.trBodyEdit} id={css.tdBodyEdit} key={id}>
                    <td id={css.tdBodyEdit}>{id}</td>
                    <td id={css.tdBodyEdit}>{nome}</td>
                    <td id={css.tdBodyEdit}>{qtd_estoque}</td>
                    <td id={css.tdBodyEdit}>
                      {valor_custo.toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </td>
                    <td id={css.tdBodyEdit}>
                      {valor_venda.toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </td>
                    <td id={css.tdBodyEditAlt}>
                      <Link to={`/alterarProduto/${id}`}>
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
                      <Link to={`/deletarProduto/${id}`}>
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
