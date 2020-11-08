import React, { useState, useEffect } from 'react';
import css from '../css/get.module.css';
import api from '../services/api';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Requests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const apiAsync = async () => {
      try {
        const { data } = await api.get(`/agrupamento`);
        const dataMap = data.map(
          ({
            Codigo_Pedido,
            Cliente,
            produtos,
            valor_unitario,
            quantidade_respectiva,
            faturamento,
            Data_Pedido,
            Observação,
          }) => {
            return {
              Codigo_Pedido,
              Cliente,
              prvlqt: valor_unitario.split(',').map((vl, i) => {
                return {
                  qtd: quantidade_respectiva.split(',')[i],
                  vl: Number(vl).toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  }),
                  produto: produtos.split(',')[i],
                };
              }),
              faturamento,
              Data_Pedido,
              Observação,
            };
          }
        );

        setRequests(dataMap);

        console.log(dataMap);
      } catch (error) {
        console.log(error);
      }
    };
    apiAsync();
  }, []);
  return (
    <>
      <div className="container">
        <div style={{ boxShadow: '10px 10px 10px', marginTop: '15px' }}>
          <h2>Pedidos</h2>
        </div>

        <Link to="/novopedido">
          <button type="button" className="btn btn-success">
            Novo pedido
          </button>
        </Link>
        <div
          className="row"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          {requests.map((order) => {
            const {
              Codigo_Pedido,
              Cliente,
              prvlqt,
              faturamento,
              Data_Pedido,
              Observação,
            } = order;

            return (
              <div
                className="col-7 col-sm-5 col-md-4 col-lg-3 col-xl-2"
                style={{
                  marginBottom: '10px',
                  marginTop: '20px',
                }}
              >
                <div
                  key={Codigo_Pedido}
                  className="card"
                  style={{
                    width: '18rem',
                    borderRadius: '10px',
                    boxShadow: '10px 10px 10px',
                  }}
                >
                  <div class="card-header">
                    <div>
                      <h4>
                        <strong>Pedido Nº {Codigo_Pedido}</strong>
                      </h4>
                    </div>
                    <div>
                      <h5>
                        <div>Data {Data_Pedido}</div>
                      </h5>
                    </div>
                    <div>
                      <h4 className="card-tittle">Cleinte: {Cliente}</h4>
                    </div>
                  </div>
                  <div className="card-body" style={{ padding: '5px' }}>
                    <p
                      className="card "
                      style={{
                        backgroundColor: 'antiquewhite',
                        borderRadius: '8px',
                        padding: '10px',
                      }}
                    >
                      {prvlqt.map((item) => {
                        const { qtd, produto, vl } = item;
                        return (
                          <p
                            style={{
                              fontWeight: 'bold',
                              color: 'black',
                              fontSize: '9pt',
                              marginBottom: '4px',
                            }}
                          >
                            {qtd} x {produto} - {vl}
                          </p>
                        );
                      })}
                    </p>
                  </div>
                  <div
                    class="card "
                    style={{
                      backgroundColor: 'aliceblue',
                      borderRadius: '8px',
                      padding: '10px',
                      marginTop: '4px',
                      margin: '4px',
                    }}
                  >
                    <h4>Valor total R$: {faturamento}</h4>

                    <button
                      className="btn btn-warning"
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                    >
                      Alterar
                    </button>

                    <button
                      className="btn btn-danger"
                      style={{
                        marginTop: '4px',
                        marginBottom: '4px',
                        fontWeight: 'bold',
                      }}
                    >
                      Apagar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
