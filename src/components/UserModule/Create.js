import React, { useState } from 'react';
import { Form } from '@unform/web';
import Input from '../Form/Input';
import api from '../services/api';
import css from '../css/update.module.css';
import { Redirect, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Create() {
  const [redirectCheck, setRedirecCheck] = useState(false);

  const handleSubmit = async (data) => {
    try {
      const newData = {
        nome: data.nome,
        end: data.end,
        email: data.email,
        telefone: data.telefone,
      };

      await api
        .post(`/cliente`, newData)
        .then((response) => {})
        .catch((error) => {
          console.log(error.message);
        });

      setRedirecCheck(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container" align="center">
      <div
        style={{
          boxShadow: '10px 10px 10px',
          marginTop: '15px',
          marginBottom: '15px',
        }}
      >
        <h2>Cadastrar Cliente</h2>
      </div>
      <div id={css.form} style={{ boxShadow: '10px 10px 10px' }}>
        <Form onSubmit={handleSubmit}>
          <div className="form">
            <div className="form">
              <label for="inputName">Nome</label>

              <Input
                type="text"
                className="form-control"
                id="inputName"
                name="nome"
                placeholder="Ex: José Marcos"
              />
            </div>

            <div className="form">
              <label for="inputAddress">Endereço</label>

              <Input
                name="end"
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="Ex: Rua A, Av B"
              />
            </div>

            <div className="form">
              <label for="inputPhone">Telefone</label>
              <Input
                name="telefone"
                type="text"
                className="form-control"
                id="inputPhone"
                placeholder="Ex: 139999-8888"
              />
            </div>
            <div className="form">
              <label for="inputEmail">Email</label>
              <Input
                type="email"
                name="email"
                className="form-control"
                id="inputEmail"
                placeholder="Ex: email@email.com"
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
          <button type="submit" className="btn btn-success">
            Cadastrar
          </button>
          {redirectCheck === true ? <Redirect to="/cliente" /> : redirectCheck}
        </Form>
      </div>
    </div>
  );
}
