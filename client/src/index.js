import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';

import './index.css';
import App from './App';
import VrApp from './VrApp';

const client = new ApolloClient({
  uri: '/graphql'
});





ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <ApolloProvider client={client}>
          <App  />
        </ApolloProvider>
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);


ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <ApolloProvider client={client}>
            <VrApp/>
        </ApolloProvider>
      </PersistGate>
    </BrowserRouter>
  </Provider>
  ,
  document.getElementsByTagName("a-entity")[0]
);


























// ReactDOM.render(
//   <a-entity>
//     {box}
//   {<a-box position="0 -2 0" rotation="45 45 45" color="#aa55ff"></a-box>}
   
//   </a-entity> 
//   ,
//   document.getElementById('root2')
// );





// ReactDOM.render(
//   <a-entity>
//     {box}
//   {<a-box position="2 2 0" rotation="45 45 45" color="#aa11ff"></a-box>}
//   </a-entity> 
//   ,
//   document.getElementsByTagName("a-entity")[0]
// );






// <a-entity>
// {<Query query={CARD_QUERY}>
//   {
//     ({ loading , error, data }) =>{
//       if(loading) return <a-entity text-geometry="value: Loading" material="color: red" position="0 0 -4" rotation="" scale="1 1 .001" visible=""></a-entity>
//       if(error) console.log(error);
//       console.log(data);
//     return <a-entity text-geometry={"value: Hello, luis! " + `${data.card.name}`} material="color: red" position="1 2 -4" rotation="" scale="1 1 .001" visible=""></a-entity>
//     }
//   }
// </Query>}
// {<a-entity text-geometry="value: Hello, World!" material="color: red" position="0 0 -4" rotation="" scale="1 1 .001" visible=""></a-entity>}
// {box}
// {<a-box position="0 0 0" rotation="45 45 45" color="#aa11ff"></a-box>}
// </a-entity> 