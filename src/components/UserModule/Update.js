import React, { useEffect, useState } from 'react';
import { Form } from '@unform/web';
import Input from '../Form/Input';
import api from '../services/api';
import css from '../css/update.module.css';
import { Redirect, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Update(props) {
  const [selectUser, setSelectUser] = useState([]);
  const [redirectCheck, setRedirecCheck] = useState(false);

  useEffect(() => {
    try {
      const apiAsync = async () => {
        const { id } = props.match.params;
        const { data } = await api.get(`cliente/${id}`);
        setSelectUser(data);
      };
      apiAsync();
    } catch (error) {
      console.log(error);
    }
  }, [props]);

  const initialData = {
    nome: selectUser.nome,
    end: selectUser.end,
    telefone: selectUser.telefone,
    email: selectUser.email,
    redirect: false,
  };

  const handleSubmit = async (data) => {
    try {
      const { id } = props.match.params;
      await api.put(`cliente/${id}`, data);
      setRedirecCheck(true);

      console.log(selectUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container center" align="center">
      <div
        style={{
          boxShadow: '10px 10px 10px',
          marginTop: '15px',
          marginBottom: '15px',
        }}
      >
        <h2>Alterar Cliente</h2>
      </div>
      <div id={css.form} style={{ boxShadow: '10px 10px 10px' }}>
        <Form initialData={initialData} onSubmit={handleSubmit}>
          <div className="form">
            <div className="form">
              <label for="inputName">Nome</label>

              <Input
                type="text"
                className="form-control"
                id="inputName"
                name="nome"
              />
            </div>

            <div className="form">
              <label for="inputAddress">Endereço</label>

              <Input
                name="end"
                type="text"
                className="form-control"
                id="inputAddress"
              />
            </div>

            <div className="form">
              <label for="inputPhone">Telefone</label>
              <Input
                name="telefone"
                type="text"
                className="form-control"
                id="inputPhone"
              />
            </div>
            <div className="form">
              <label for="inputEmail">Email</label>
              <Input
                type="email"
                name="email"
                className="form-control"
                id="inputEmail"
              />
            </div>
          </div>
          <Link to="/cliente">
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

          {redirectCheck === true ? <Redirect to="/cliente" /> : redirectCheck}
        </Form>
      </div>
    </div>
  );
}
