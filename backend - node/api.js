const express = require('express');
const bodyparser = require('body-parser');

const cors = require('cors');
const api = express();

const router = express.Router();

const galeriaRouter = require('./router/galeriaRouter');

api.use(cors());
api.use(bodyparser.urlencoded({ extended: true }));
api.use(bodyparser.json({ limit: '20mb', extended: true }));

api.use('/public', express.static(__dirname+'/public'));

router.get("/",(req, resp) => {
  return resp.json({ mensagem: '=> API Online...'});
});

api.use("/", router);
api.use("/galeria", galeriaRouter);
api.listen(3000);
console.log('Run API Express');

