import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link, Redirect } from 'react-router-dom';
import { FaRegPlusSquare } from 'react-icons/fa';
import css from '../css/update.module.css';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function AddProduct(props) {
  const [products, setProducts] = useState([]);
  const [redirectCheck, setRedirecCheck] = useState(false);
  const [valueInput, setValueInput] = useState({
    id: 1,
    qtd: 1,
  });

  useEffect(() => {
    const apiAsync = async () => {
      try {
        const { data } = await api.get(`/produto`);

        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    console.log(valueInput);
    apiAsync();
  }, [valueInput]);

  const handleAddProduct = async (event) => {
    try {
      const { id, num } = props.match.params;

      const newData = Number(event.target.textContent);

      const { data } = await api.get(`produto/${newData}`);
      console.log(data);
      const productSelect = {
        id_cliente: Number(id),
        id_pedido: Number(num),
        id_produto: Number(data.id),
        quantidade: Number((data.id = valueInput.id ? valueInput.qtd : 0)),
      };

      console.log(productSelect);
      await api
        .post(`/pedidoproduto`, productSelect)
        .catch((error) => console.log(error.response.request._response));

      newData !== 0 ? setRedirecCheck(true) : setRedirecCheck(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container">
        <div
          style={{
            boxShadow: '10px 10px 10px',
            marginTop: '15px',
            marginBottom: '30px',
          }}
        >
          <h2>Selecione o Produto </h2>
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
                <th id={css.thEdit}>Qtd-Estoque</th>
                <th id={css.thEdit}>Vl-Custo</th>
                <th id={css.thEdit}>Vl-Venda</th>
                <th id={css.thEdit}>Adicionar</th>
                <th id={css.thEdit}>Selecionar</th>
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

                return qtd_estoque <= 0 ? (
                  <tr id={css.trBodyEdit} key={id}>
                    <td id={css.tdBodyEdit}>{id}</td>
                    <td id={css.tdBodyEdit}>{nome}</td>
                    <td id={css.tdBodyEdit}>{qtd_estoque}</td>

                    <td id={css.tdBodyEdit}>
                      {Number(valor_custo).toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </td>
                    <td id={css.tdBodyEdit}>
                      {Number(valor_venda).toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </td>

                    <td id={css.tdBodyEdit}>
                      <input
                        disabled
                        value={valueInput.id === id ? valueInput.qtd : 0}
                        type="number"
                        min="0"
                        max={qtd_estoque}
                        style={{
                          color: 'black',
                          width: '60px',
                          fontSize: '10pt',
                        }}
                      />
                    </td>

                    <td id={css.tdBodyEdit}>
                      <button
                        disabled
                        onClick={handleAddProduct}
                        type="button"
                        class="btn btn-danger"
                        style={{
                          color: 'transparent',
                        }}
                      >
                        {id}
                      </button>
                      {redirectCheck === true ? (
                        <Redirect to="/novopedido" />
                      ) : (
                        redirectCheck
                      )}
                    </td>
                  </tr>
                ) : (
                  <tr id={css.trBodyEdit} key={id}>
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

                    <td id={css.tdBodyEdit}>
                      <input
                        value={valueInput.id === id ? valueInput.qtd : 0}
                        type="number"
                        min="1"
                        max={qtd_estoque}
                        style={{
                          color: 'black',
                          width: '60px',
                          fontSize: '10pt',
                        }}
                        onChangeCapture={(e) => {
                          if (e.target.value <= 0) {
                            let value = Number(e.target.value) + 1;
                            console.log(value);
                            setValueInput({ id: id, qtd: value });
                          }
                          setValueInput({ id: id, qtd: e.target.value });

                          // handleQuant(value, id);
                        }}
                      />
                    </td>
                    <td id={css.tdBodyEdit}>
                      <button
                        onClick={handleAddProduct}
                        type="button"
                        class="btn btn-success"
                        style={{
                          color: 'transparent',
                        }}
                      >
                        {id}
                      </button>
                      {redirectCheck === true ? (
                        <Redirect to="/novopedido" />
                      ) : (
                        redirectCheck
                      )}
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
