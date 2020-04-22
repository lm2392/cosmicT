import React from "react";
import ReactDOM from "react-dom";
// import { Switch, Route, Redirect } from 'react-router-dom';
// import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
// import 'aframe';
// import 'networked-aframe';
// import 'aframe-particle-system-component';
import "./App.css";
import gql from "graphql-tag";
import { Query } from "react-apollo";
// import HomePage from './pages/homepage/homepage.component';
// import ShopPage from './pages/shop/shop.component';
// import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
// import CheckoutPage from './pages/checkout/checkout.component';

// import Header from './components/header/header.component';

import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.actions";

const CARD_QUERY = gql`
  query CardQuery {
    card(id: "1") {
      name
      id
      desc
    }
  }
`;

const scene = document.getElementById("scene");

const box1 = document.getElementById("box1");

box1.setAttribute("color", "red");

box1.setAttribute("position", `${"0 2 0"}`);

box1.setAttribute("rotation", `${"0 0 0"}`);

const string = "serverURL: /; room: in; connectOnLoad: true; onConnect: onConnect; adapter: webrtc; audio: false; debug: false;";
const string2 = [`serverURL: /; room: in; connectOnLoad: true; onConnect: onConnect; adapter: webrtc; audio: false; debug: false;`];
const string3 = `${"serverURL: /; room: in; connectOnLoad: true; onConnect: onConnect; adapter: webrtc; audio: true; debug: false;"}`;



const attributeArr = ["fdgdf", "luis"];

// scene.setAttribute(`${"networked-scene"}`,string);

console.log(string);
console.log(string2);
console.log(string3);




console.log(scene.getAttribute(`${"networked-scene"}`));

var box = (
  <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
);

class VrApp extends React.Component {
  componentDidMount() {

    scene.attributes[1].value = string2;
    

console.log(scene.getAttribute(`${"networked-scene"}`));
    // scene.setAttribute(`${"networked-scene"}`,string);
    // scene.attributes[1].value = `
    //       serverURL: /;
    //       room: index;
    //       connectOnLoad: true;
    //       onConnect: onConnect;
    //       adapter: webrtc;
    //       audio: fadsfdfsdfsd;
    //       debug: false;
    // `;


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

  render() {
    return (
      <a-entity>
        {
          <Query query={CARD_QUERY}>
            {({ loading, error, data }) => {
              if (loading)
                return (
                  <a-entity
                    text-geometry="value: Loading"
                    material="color: red"
                    position="0 0 -4"
                    rotation=""
                    scale="1 1 .001"
                    visible=""
                  ></a-entity>
                );
              if (error) console.log(error);
              console.log(data);
              return (
                <a-entity
                  text-geometry={"value: Hello, luis! " + `${data.card.name}`}
                  material="color: red"
                  position="1 2 -4"
                  rotation=""
                  scale="1 1 .001"
                  visible=""
                ></a-entity>
              );
            }}
          </Query>
        }
        {
          <a-entity
            text-geometry="value: Hello, World!"
            material="color: red"
            position="0 0 -4"
            rotation=""
            scale="1 1 .001"
            visible=""
          ></a-entity>
        }
        {box}
        {<a-box position="-4 0 0" rotation="45 45 45" color="#aa11ff"></a-box>}
      </a-entity>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(VrApp);
