import React from 'react';
// import { Switch, Route, Redirect } from 'react-router-dom';
// import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import 'aframe';
// import 'networked-aframe';
// import 'aframe-particle-system-component';
import './App.css';

// import HomePage from './pages/homepage/homepage.component';
// import ShopPage from './pages/shop/shop.component';
// import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
// import CheckoutPage from './pages/checkout/checkout.component';

// import Header from './components/header/header.component';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions'


class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {

    const { checkUserSession } = this.props;

    checkUserSession();

    // const { setCurrentUser } = this.props;

    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   if (userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth);

    //     userRef.onSnapshot(snapShot => {
    //       setCurrentUser({
    //         id: snapShot.id,
    //         ...snapShot.data()
    //       });
    //     });
    //   }

    //   setCurrentUser(userAuth);
    // });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div style={{ color: "red",position: "fixed", display: "flexbox", zIndex: "1000"}} >
        hello
      </div>  
    );
  }
}



const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession()) 
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
