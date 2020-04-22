const http = require("http");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
// app.use(express.static(path.resolve(__dirname, "./client", "public")));

app.use(express.static(path.join(__dirname, 'client/build')));



if(process.env.NODE_ENV === 'production') {

   app.use(express.static(path.join(__dirname, 'client/build')));  

   app.get('*', (req, res) => {res.sendfile(path.join(__dirname = 'client/build/index.html'));})

}

app.get('*', (req, res) => {  res.sendFile(path.join(__dirname+'/client/public/index.html'));})

const port = process.env.PORT || 1000;

// const webServer = http.createServer(app);
const webServer = http.createServer(app);
const io = require("socket.io")(webServer);

const rooms = {};

io.on("connection", socket => {
  console.log("user connected", socket.id);

  let curRoom = null;

  socket.on("joinRoom", data => {
    const { room } = data;

    if (!rooms[room]) {
      rooms[room] = {
        name: room,
        occupants: {},
      };
    }

    const joinedTime = Date.now();
    rooms[room].occupants[socket.id] = joinedTime;
    curRoom = room;

    console.log(`${socket.id} joined room ${room}`);
    socket.join(room);

    socket.emit("connectSuccess", { joinedTime });
    const occupants = rooms[room].occupants;
    io.in(curRoom).emit("occupantsChanged", { occupants });
  });

  socket.on("send", data => {
    io.to(data.to).emit("send", data);
  });

  socket.on("broadcast", data => {
    socket.to(curRoom).broadcast.emit("broadcast", data);
  });

  socket.on("disconnect", () => {
    console.log('disconnected: ', socket.id, curRoom);
    if (rooms[curRoom]) {
      console.log("user disconnected", socket.id);

      delete rooms[curRoom].occupants[socket.id];
      const occupants = rooms[curRoom].occupants;
      socket.to(curRoom).broadcast.emit("occupantsChanged", { occupants });

      if (occupants == {}) {
        console.log("everybody left room");
        delete rooms[curRoom];
      }
    }
  });
});

webServer.listen(port, () => {
  console.log("listening on http://localhost:" + port);
});

const app2 = express();
const port2 = process.env.PORT || 2000;

app.use(cors());
app2.use(cors());

app.use(
  '/graphql',
  createProxyMiddleware({
    target: 'http://localhost:2000/',
    changeOrigin: true
  })
)

app2.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app2.use(bodyParser.json());
app2.use(bodyParser.urlencoded({ extended: true }));


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// app.listen(port, error => {
//   if (error) throw error;
//   console.log('Server running on port ' + port);
// });

app2.listen(port2, error => {
  if (error) throw error;
  console.log('Server running on port ' + port2);
});

app.post('/payment', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd'
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});