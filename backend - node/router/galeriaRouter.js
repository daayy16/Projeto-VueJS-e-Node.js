const express = require('express');
const router = express.Router();

const GaleriaModel = require('../resp api/model/GaleriaModel');
const RespostaClass = require('../resp api/model/RespostaClass');

router.get("/", (req, resp) => {
  GaleriaModel.getTodos((error, retorno) => {
    let resposta = new RespostaClass();
    if (error) {
      resposta.erro = true;
      resposta.msg = "Ocorreu um erro.";
      console.log("Erro: ", error);
    } else {
      resposta.dados = retorno;
    }

    resp.json(resposta);
  });
});

module.exports = router;