import React, { Component } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"; 
import NavigationBar from './components/navbar';
import Footer from './components/footer';
import Body from './components/homePageBody';
import SignUpForm from './components/forms/signUpForm';
import Dashboard from "./components/Dashboard";
import NotFound from './components/notFound';
import LoginForm from './components/forms/loginForm';
import OrderForm from './components/forms/orderForm';
import AllOrders from './components/allOrders';
import OneOrder from './components/oneOrder';
import Logout from './components/logout';
import auth from './components/services/authService';
import "react-toastify/dist/ReactToastify.css"

class App extends Component {
  state = {  }

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });

  }

  render() { 
    return (
        <React.Fragment>
            <ToastContainer />
            <NavigationBar user={this.state.user} />
            <main className="conrainter">
                <Switch>
                    <Route path="/" exact component={Body} />
                    <Route path="/login" component={LoginForm} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/signup" component={SignUpForm} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/orders" exact component={AllOrders} />
                    <Route path="/orders/new" exact component={OrderForm} />
                    <Route path="/orders/:id" exact component={OneOrder} />
                    <Route path="/not-found" component={NotFound} />
                    <Redirect to="/not-found" />
                </Switch>
            </main>
            <Footer />
        </React.Fragment>
    );
  }
}
 
export default App;
