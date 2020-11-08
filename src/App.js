import React from 'react';
import Nav from './components/Nav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//Modulo Pedido
import GetRequests from './components/RequestsModule/Get';
import CreateRequests from './components/RequestsModule/Create';
import CreateUserRequests from './components/RequestsModule/CreateUser';
import AddProductRequests from './components/RequestsModule/AddProduct';
//Modulo Cliente
import UpdateUser from './components/UserModule/Update';
import CreateUser from './components/UserModule/Create';
import DeleteUser from './components/UserModule/Delete';
import GetUser from './components/UserModule/Get.js';

//Modulo Produto
import GetProduct from './components/ProductModule/Get';
import UpdateProduct from './components/ProductModule/Update';
import CreateProduct from './components/ProductModule/Create';
import DeleteProduct from './components/ProductModule/Delete';

export default function App() {
  return (
    //Adicionando as rotas

    <div className="container-fluid">
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact component={GetRequests} />
          <Route path="/novoPedido" component={CreateRequests} />
          <Route path="/novocliente" component={CreateUserRequests} />
          <Route
            path="/adicionarproduto/:id/:num"
            component={AddProductRequests}
          />
          <Route path="/cliente" component={GetUser} />
          <Route path="/alterarCliente/:id" component={UpdateUser} />
          <Route path="/cadastrarCliente" component={CreateUser} />
          <Route path="/deletarCliente/:id" component={DeleteUser} />
          <Route path="/produto" component={GetProduct} />
          <Route path="/alterarProduto/:id" component={UpdateProduct} />
          <Route path="/cadastrarProduto" component={CreateProduct} />
          <Route path="/deletarProduto/:id" component={DeleteProduct} />
        </Switch>
      </Router>
    </div>
  );
}
