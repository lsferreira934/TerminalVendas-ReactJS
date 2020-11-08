import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form } from '@unform/web';
import Input from '../Form/Input';
import api from '../services/api';

import 'bootstrap/dist/css/bootstrap.min.css';
import css from '../css/get.module.css';
import { FaTrash } from 'react-icons/fa';

export default function Create() {
  const [numberOrder, setNumberOrder] = useState();
  const [redirectCheck, setRedirecCheck] = useState(false);
  const [selectUser, setSelectUser] = useState([]);
  const [valueTotal, setValueTotal] = useState();
  const [userId, setUserId] = useState();

  const [getOrderId, setGetOrderId] = useState([]);
  const [userComplete, setUserComplete] = useState();
  const [loadPage, setLoadePage] = useState(false);

  useEffect(() => {
    try {
      const apiAsync = async () => {
        const { data } = await api.get(`/todospedidos`);

        if (data.length === 0) {
          const newData = {
            obs: '333-999',
          };
          await api.post(`/novopedido`, { ...newData });
        }
      };
      apiAsync();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Campo Numero do pedido
  useEffect(() => {
    try {
      const apiAsync = async () => {
        const { data } = await api.get(`/todospedidos`);
        // setAllRequests(data);

        const mapPedido = data.map((pedido) => pedido.id_pedido);
        let number = Math.max.apply(null, mapPedido);

        if (number === -Infinity) number = 1;
        setNumberOrder(number);
      };
      apiAsync();
    } catch (error) {
      console.log(error);
    }
  }, [numberOrder]);

  useEffect(() => {
    try {
      const apiAsync = async () => {
        const { data } = await api.get(`relatorio/${numberOrder}`);
        setGetOrderId(data);

        const findItem = data.map((item) => {
          return item.id_cliente;
        });
        setUserId(findItem[0]);

        const getUset = await api.get(`cliente/${findItem}`);

        setUserComplete(`${getUset.data.id} - ${getUset.data.nome}`);
        if (data.length > 0) {
          const totalOrder = data
            .map((item) => item.valor_total)
            .reduce((total, produto) => total + produto);
          setValueTotal(totalOrder);
        }
      };
      apiAsync();
    } catch (error) {
      console.log(error);
    }
  }, [numberOrder, loadPage]);

  // Selecionar o Cliente
  useEffect(() => {
    try {
      const apiAsync = async () => {
        const { data } = await api.get(`/cliente`);
        setSelectUser(data);
      };
      apiAsync();
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  // Criar um novo pedido
  const handleSubmit = async (event) => {
    try {
      const newData = {
        obs: event.obs,
      };
      await api.post(`/novopedido`, { ...newData });

      setRedirecCheck(true);
    } catch (error) {
      console.log(error);
    }
  };
  // Recebe o cliente o id e faz a separação deles
  const handleSelectOption = (select) => {
    const selectedUser = select.target.value;
    setUserComplete(selectedUser);
    setUserId(Number(selectedUser.split('-')[0]));
  };

  // Apagar todas as ordens ligada ao cliente
  const handleCancelOrder = async () => {
    try {
      const { data } = await api.get(`/relatorio/${numberOrder}`);
      if (data.length !== 0) {
        await api.delete(`apagarpedidovarios/${numberOrder}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Deletar produto na lista e atualizar o valor e o estoque
  const handleDeleteProduct = async (e, idproduto, quantidade) => {
    try {
      const id = Number(e.target.value);

      const { data } = await api.get(`produto/${idproduto}`);

      const newData = {
        qtd_estoque: data.qtd_estoque + quantidade,
      };

      await api.put(`produto/${idproduto}`, newData);
      await api.delete(`/apagarpedido/${id}`);

      loadPage === true ? setLoadePage(false) : setLoadePage(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container">
        <div className="row  ">
          <div className="col-2  col-sm-5 col-md-6 col-lg-7">
            <label for="select" style={{ marginRight: '5px' }}>
              PEDIDO Nº{' '}
            </label>
            <input
              type="text"
              value={numberOrder}
              disabled
              style={{ width: '30px' }}
            />
          </div>
          <div className=" col col-sm-auto">
            <label for="select" style={{ marginRight: '5px' }}>
              VALOR DA COMPRA{' '}
            </label>
            <input
              type="text"
              style={{ width: '110px', fontSize: '10pt' }}
              value={
                valueTotal !== isNaN
                  ? Number(valueTotal).toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })
                  : 'R$ 0,00'
              }
              disabled
            />
          </div>
        </div>
        {userId ? (
          // IGUAL
          <Form onSubmit={handleSubmit}>
            <div
              className="row"
              style={{
                alignItems: 'center',
                display: 'flex',
                placeItems: 'flex-end',
              }}
            >
              <div className=" col-10 col-sm-10 center">
                <br />
                <label for="select">ADICIONAR CLIENTE</label>
                <select
                  disabled
                  className="custom-select"
                  id="select"
                  value={userComplete}
                >
                  <option>{userComplete}</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className=" col-10 col-sm-10">
                <label for="Textarea">OBSERVAÇÃO</label>
                <Input
                  multiline
                  name="obs"
                  className="form-control"
                  id="Textarea"
                  placeholder="Ex: Cartão de crédito "
                />
              </div>
            </div>

            <div className="row" style={{ marginTop: '10px' }}>
              <div className="col-6">
                <Link to={`/adicionarproduto/${userId}/${numberOrder}`}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{
                      marginRight: '10px',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    Adicionar produto
                  </button>
                </Link>

                <button
                  type="submit"
                  className="btn btn-warning"
                  style={{
                    marginRight: '10px',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  Finalizar pedido
                </button>

                <Link to="/novocliente">
                  <button
                    className="btn btn-success"
                    style={{
                      marginRight: '10px',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    Cadastrar cliente
                  </button>
                </Link>

                <Link to="/">
                  <button
                    onClick={handleCancelOrder}
                    type="button"
                    className="btn btn-danger"
                    style={{
                      marginRight: '10px',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    Cancelar Pedido
                  </button>
                </Link>
              </div>
            </div>
            {/* // IGUAL */}

            {/* tabela produtos */}
            <div className="row" style={{ marginTop: '10px' }}>
              <div className="col-10">
                <table className="table table-hover table-dark">
                  <thead>
                    <tr>
                      <th>Produto</th>
                      <th>Quantidade</th>
                      <th>valor Unidade</th>
                      <th>Valor Total</th>
                      <th>Deletar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getOrderId.map((order) => {
                      const {
                        id,
                        id_pedido,
                        id_produto,
                        quantidade,
                        valor_unidade,
                        valor_total,
                      } = order;
                      return (
                        <tr key={id}>
                          <td>{id_produto}</td>
                          <td>{quantidade}</td>
                          <td>
                            {valor_unidade.toLocaleString('pt-br', {
                              style: 'currency',
                              currency: 'BRL',
                            })}
                          </td>
                          <td>
                            {valor_total.toLocaleString('pt-br', {
                              style: 'currency',
                              currency: 'BRL',
                            })}
                          </td>
                          <td>
                            <button
                              onClick={(e) => {
                                handleDeleteProduct(e, id_produto, quantidade);
                              }}
                              type="button"
                              className="btn btn-danger"
                              value={id}
                              style={{
                                color: 'white',
                                fontWeight: 'bold',
                              }}
                            >
                              Apagar
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {redirectCheck === true ? <Redirect to="/" /> : redirectCheck}
          </Form>
        ) : (
          // IGUAL
          <Form onSubmit={handleSubmit}>
            <div
              className="row"
              style={{
                alignItems: 'center',
                display: 'flex',
                placeItems: 'flex-end',
              }}
            >
              <div className=" col-10 col-sm-10 center">
                <br />
                <label for="select">ADICIONAR CLIENTE</label>
                <select
                  onChange={handleSelectOption}
                  className="custom-select"
                  id="select"
                  value={userId}
                >
                  <option>Selecione um cliente</option>
                  {selectUser.map((user) => {
                    const { id, nome } = user;
                    return (
                      <option key={id}>
                        {id} - {nome}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* aqui */}
            <div className="row">
              <div className=" col-10 col-sm-10">
                <label for="Textarea">OBSERVAÇÃO</label>
                <Input
                  multiline
                  name="obs"
                  className="form-control"
                  id="Textarea"
                  placeholder="Ex: Cartão de crédito "
                />
              </div>
            </div>

            <div className="row" style={{ marginTop: '10px' }}>
              <div className="col-6">
                <Link to={`/adicionarproduto/${userId}/${numberOrder}`}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ marginRight: '10px' }}
                  >
                    Adicionar produto
                  </button>
                </Link>

                <button
                  type="submit"
                  className="btn btn-warning"
                  style={{
                    marginRight: '10px',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  Finalizar pedido
                </button>

                <Link to="/novocliente">
                  <button
                    className="btn btn-success"
                    style={{
                      marginRight: '10px',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    Cadastrar cliente
                  </button>
                </Link>

                <Link to="/">
                  <button
                    type="button"
                    className="btn btn-danger"
                    style={{
                      marginRight: '10px',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    Voltar
                  </button>
                </Link>
              </div>
            </div>
            <div className="row" style={{ marginTop: '10px' }}>
              <div className="col-10"></div>
            </div>
            {/* // IGUAL */}
            {redirectCheck === true ? <Redirect to="/" /> : redirectCheck}
          </Form>
        )}
      </div>
    </>
  );
}
