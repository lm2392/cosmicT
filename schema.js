const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

// Hardcoded data
// const customers = [
//     {id:'1', name:'John Doe', email:'jdoe@gmail.com', age:35},
//     {id:'2', name:'Steve Smith', email:'steve@mail.com', age:25},
//     {id:'3', name:'Sara Williams', email:'sara@ail.com', age:32},
//     {id:'4', name:'Sara Wils', email:'saraail.com', age:32},
//     {id:'5', name:'Saras', email:'sara@gmil.com', age:32},
//     {id:'6', name:'Siams', email:'sara@il.com', age:32},
//     {id:'7', name:'Sara Wiams', email:'ra@gmail.com', age:32}
// ];

// Customer Type
const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

const CardType = new GraphQLObjectType({
  name: "Card",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    sign: { type: GraphQLString },
    ruler: { type: GraphQLString },
    aspect: { type: GraphQLString },
    img: { type: GraphQLString },
    keyword: { type: GraphQLString },
    desc: { type: GraphQLString },
    sb_id: { type: GraphQLString }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        // for(let i = 0;i < customers.length;i++){
        //     if(customers[i].id == args.id){
        //         return customers[i];
        //     }
        // }
        return axios
          .get("http://localhost:3000/customers/" + args.id)
          .then(res => res.data);
      }
    },
    card: {
      type: CardType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        // for(let i = 0;i < customers.length;i++){
        //     if(customers[i].id == args.id){
        //         return customers[i];
        //     }
        // }
        return axios.get("http://localhost:3000/cards/" + args.id).then(res => res.data);
      }
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args) {
        // return customers;
        return axios
          .get("http://localhost:3000/customers")
          .then(res => res.data);
      }
    },

    cards: {
      type: new GraphQLList(CardType),
      resolve(parentValue, args) {
        // return customers;
        return axios.get("http://localhost:3000/cards").then(res => res.data);
      }
    }
  }
});

// Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parentValue, args) {
        return axios
          .post("http://localhost:3000/customers", {
            name: args.name,
            email: args.email,
            age: args.age
          })
          .then(res => res.data);
      }
    },
    deleteCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args) {
        return axios
          .delete("http://localhost:3000/customers/" + args.id)
          .then(res => res.data);
      }
    },
    editCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        return axios
          .patch("http://localhost:3000/customers/" + args.id, args)
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
