import React from 'react';
import css from './css/navbar.module.css';
import { Link } from 'react-router-dom';
import Jpg from './img/cap.jpg';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Nav() {
  return (
    <nav class="mb-4 navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to="/">
        <a class="navbar-brand" href="#">
          <img
            src={Jpg}
            height="45"
            class="rounded-circle z-depth-0"
            alt="avatar image"
          />
        </a>
      </Link>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent-555"
        aria-controls="navbarSupportedContent-555"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent-555">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/">
              Pedido
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/cliente">
              Clientes
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/produto">
              Produtos
            </a>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto nav-flex-icons">
          <li class="nav-item active">
            <a class="nav-link" href="https://tpbackendunip.herokuapp.com/">
              <i class="fab fab fa-hubspot"></i> API
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item active">
            <a
              class="nav-link"
              href="https://github.com/lsferreira934/TerminalVendas-ReactJS"
            >
              <i class="fab fas fa-desktop"></i> Github - DeskTop
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item active">
            <a
              class="nav-link"
              href="https://github.com/lsferreira934/TerminalVendas-ReactJS"
            >
              <i class="fab fa-github-alt"></i> Github - Frontend
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item active">
            <a
              class="nav-link"
              href="https://github.com/lsferreira934/TP-Cadastro-ReactJs-SQL-Backend"
            >
              <i class="fab fa-github-alt"></i> Github - Backend
              <span class="sr-only">(current)</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
