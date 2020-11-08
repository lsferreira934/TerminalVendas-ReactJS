import React, { useState, useEffect } from 'react';
import css from '../css/get.module.css';
import api from '../services/api';
import { Link } from 'react-router-dom';

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
          <Link to="/cadastrarProduto">
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
                <th>Quantida</th>
                <th>Valor de custo</th>
                <th>Valor de Venda</th>
                <th>Atualizar</th>
                <th>Deletar</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const {
                  id,
                  nome,
                  qtd_estoque,
                  valor_custo,
                  valor_venda,
                } = product;
                return (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{nome}</td>
                    <td>{qtd_estoque}</td>
                    <td>
                      {valor_custo.toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </td>
                    <td>
                      {valor_venda.toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </td>
                    <td>
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

                    <td>
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
