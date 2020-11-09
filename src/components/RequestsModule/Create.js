import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form } from '@unform/web';
import Input from '../Form/Input';
import api from '../services/api';

import 'bootstrap/dist/css/bootstrap.min.css';
import css from '../css/update.module.css';
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
    <div
      id={css.cardPedido}
      className="container"
      style={{
        boxShadow: '10px 10px 10px',
        marginTop: '15px',
        backgroundColor: '#e7e5e5',
        padding: '15px',
      }}
    >
      <div
        style={{
          backgroundColor: '#f0ecec',
          height: '60px',
          padding: '15px',
          borderRadius: '8px',
        }}
      >
        <div className="row justify-content-between">
          <div className="col-12 col-sm-auto col-md-auto col-lg-auto">
            <label for="pedido" style={{ marginRight: '5px' }}>
              Pedido Nº
            </label>
            <input
              id="pedido"
              type="text"
              value={numberOrder}
              disabled
              style={{ width: '30px', fontSize: '10pt' }}
            />
          </div>

          <div className="col-12 col-sm-auto col-md-auto col-lg-auto">
            <label for="valorCompra" style={{ marginRight: '4px' }}>
              Total
            </label>
            <input
              id="valorCompra"
              type="text"
              style={{ width: '107px', fontSize: '10pt' }}
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
      </div>
      {userId ? (
        // IGUAL

        <div
          style={{
            backgroundColor: '#f0ecec',

            borderRadius: '8px',
          }}
        >
          <Form onSubmit={handleSubmit}>
            <div className="row justify-content-md-center">
              <div
                className=" col-12 col-sm-10 col-md-10 col-lg-12 "
                style={{ marginBottom: '10px', marginTop: '10px' }}
              >
                <label for="select">Adicionar Cliente</label>
                <select
                  style={{ fontSize: '10pt' }}
                  disabled
                  className="custom-select"
                  id="select"
                  value={userComplete}
                >
                  <option>{userComplete}</option>
                </select>
              </div>

              <div className=" col-12 col-sm-10 col-md-10 col-lg-12">
                <label for="Textarea">Observação</label>
                <Input
                  style={{ fontSize: '10pt' }}
                  multiline
                  name="obs"
                  className="form-control"
                  id="Textarea"
                  placeholder="Ex: Cartão de crédito "
                />
              </div>
            </div>
            <div
              className="row justify-content-md-center"
              style={{ marginBottom: '20px', marginTop: '20px' }}
            >
              <div className="col-12 col-sm-10 col-md-10 col-lg-12">
                <Link to={`/adicionarproduto/${userId}/${numberOrder}`}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{
                      marginRight: '10px',
                      color: 'white',
                      fontWeight: 'bold',
                      height: '4rem',
                      width: '12rem',
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
                    height: '4rem',
                    width: '12rem',
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
                      height: '4rem',
                      width: '12rem',
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
                      height: '4rem',
                      width: '12rem',
                    }}
                  >
                    Cancelar Pedido
                  </button>
                </Link>
              </div>
            </div>

            <div
              className="row justify-content-md-center"
              style={{ marginBottom: '20px', marginTop: '20px' }}
            >
              <div className="col-12 col-sm-10 col-md-10 col-lg-12">
                <div className=" table-responsive">
                  <table
                    className="table table-hover table-dark"
                    style={{ marginBottom: '0px' }}
                  >
                    <thead id={css.theadEdit}>
                      <tr id={css.trEdit}>
                        <th id={css.thEditId}>ID Produto</th>
                        <th id={css.thEdit}>Quantidade</th>
                        <th id={css.thEdit}>Valor por Unidade</th>
                        <th id={css.thEdit}>Valor Total</th>
                        <th id={css.thEditApgPedido}>Apagar</th>
                      </tr>
                    </thead>
                    <tbody id={css.tbodyEdit}>
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
                          <tr id={css.trBodyEdit} key={id}>
                            <td id={css.tdBodyEdit}>{id_produto}</td>
                            <td id={css.tdBodyEdit}>{quantidade}</td>
                            <td id={css.tdBodyEdit}>
                              {valor_unidade.toLocaleString('pt-br', {
                                style: 'currency',
                                currency: 'BRL',
                              })}
                            </td>
                            <td id={css.tdBodyEdit}>
                              {valor_total.toLocaleString('pt-br', {
                                style: 'currency',
                                currency: 'BRL',
                              })}
                            </td>
                            <td id={css.tdBodyEditPedido}>
                              <button
                                onClick={(e) => {
                                  handleDeleteProduct(
                                    e,
                                    id_produto,
                                    quantidade
                                  );
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
            </div>

            {redirectCheck === true ? <Redirect to="/" /> : redirectCheck}
          </Form>
        </div>
      ) : (
        <div>
          <Form onSubmit={handleSubmit}>
            <div className="row justify-content-md-center">
              <div
                className=" col-12 col-sm-10 col-md-10 col-lg-12 "
                style={{ marginBottom: '10px', marginTop: '10px' }}
              >
                <label for="select">Adicionar Cliente</label>
                <select
                  style={{ fontSize: '10pt' }}
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
            <div
              className="row justify-content-md-center"
              style={{ marginBottom: '20px', marginTop: '20px' }}
            >
              <div className="col-12 col-sm-10 col-md-10 col-lg-12">
                <Link to={`/adicionarproduto/${userId}/${numberOrder}`}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{
                      marginRight: '10px',
                      color: 'white',
                      fontWeight: 'bold',
                      height: '4rem',
                      width: '12rem',
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
                    height: '4rem',
                    width: '12rem',
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
                      height: '4rem',
                      width: '12rem',
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
                      height: '4rem',
                      width: '12rem',
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

            {redirectCheck === true ? <Redirect to="/" /> : redirectCheck}
          </Form>
        </div>
      )}
    </div>
  );
}
