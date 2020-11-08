import React, { useEffect, useState } from 'react';
import { Form } from '@unform/web';
import Input from '../Form/Input';
import api from '../services/api';
import css from '../css/update.module.css';
import { Redirect, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Update(props) {
  const [selectProduct, setSelectProduct] = useState([]);
  const [redirectCheck, setRedirecCheck] = useState(false);

  useEffect(() => {
    try {
      const apiAsync = async () => {
        const { id } = props.match.params;
        const { data } = await api.get(`produto/${id}`);

        setSelectProduct(data);
      };
      apiAsync();
    } catch (error) {
      console.log(error);
    }
  }, [props]);

  const initialData = {
    nome: selectProduct.nome,
    valor_custo: selectProduct.valor_custo,
    valor_venda: selectProduct.valor_venda,
    qtd_estoque: selectProduct.qtd_estoque,
    redirect: false,
  };

  const handleSubmit = async (data) => {
    try {
      const { id } = props.match.params;
      await api.put(`produto/${id}`, data);
      setRedirecCheck(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container center" align="center">
      <h2>Deseja apagar o seguinte cadastro?</h2>

      <div id={css.form} style={{ boxShadow: '10px 10px 10px' }}>
        <Form initialData={initialData} onSubmit={handleSubmit}>
          <div className="form">
            <div className="form">
              <label for="inputName">Produto</label>

              <Input
                type="text"
                className="form-control"
                id="inputName"
                name="nome"
                placeholder="Ex: Coca-Cola, Doritos"
              />
            </div>

            <div className="form">
              <label for="inputQuantidade">Quantidade</label>

              <Input
                name="qtd_estoque"
                type="number"
                min="0"
                max="10000"
                step="1"
                className="form-control"
                id="inputQuantidade"
                placeholder="10"
              />
            </div>

            <div className="form">
              <label for="inputCompra">Valor de custo</label>
              <Input
                name="valor_custo"
                type="number"
                min="0.00"
                max="10000.00"
                step="0.01"
                className="form-control"
                id="inputCompra"
                placeholder="100.00"
              />
            </div>
            <div className="form">
              <label for="inputVenda">Valor de Venda</label>
              <Input
                type="number"
                min="0.00"
                max="10000.00"
                step="0.01"
                name="valor_venda"
                className="form-control"
                id="inputVenda"
                placeholder="100.00"
              />
            </div>
          </div>

          <Link to="/produto">
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

          <button
            type="submit"
            className="btn btn-warning"
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            Alterar
          </button>

          {redirectCheck === true ? <Redirect to="/produto" /> : redirectCheck}
        </Form>
      </div>
    </div>
  );
}
