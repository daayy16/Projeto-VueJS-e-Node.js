const express = require('express');
const router = express.Router();

const GaleriaModel = require('../api/model/GaleriaModel');
const RespostaClass = require('../api/model/RespostaClass');

let pastaPublica = './api/public/arquivos/';

let multer = require('multer');
let path = require('path');
let fs = require('fs');

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pastaPublica)
  },
  filename: (req, file, cb) => {

    let nomeArquivo = `${file.fieldname.replace(/\//g, '')}-${Date.now()}${path.extname(file.originalname)}`;
    req.body.caminho = pastaPublica + nomeArquivo;
    cb(null, nomeArquivo);
  }
});

let upload = multer({ storage: storage });

function deletarArquivo(caminho) {
  if(caminho != null){
    fs.unlinkSync(caminho);
    console.log("arquivo deletado");
  }
}

router.post("/", upload.single('arquivo'), (req, resp) => {
  let resposta = new RespostaClass();

  if (req.file != null) {
    GaleriaModel.adicionar(req.body, (error, retorno) => {

      if (error) {
        resposta.erro = true;
        resposta.msg = "Ocorreu um erro.";
        console.log("Erro: ", error);
        deletarArquivo(req.body.caminho);
      } else {
        if (retorno.affectedRows > 0) {
          resposta.msg = "Cadastro realizado com sucesso.";
        } else {
          resposta.erro = true;
          resposta.msg = "Não foi possível realizar a operação.";
          console.log("Erro: ", error);
          deletarArquivo(req.body.caminho);
        }
      }
      console.log("resp", resposta)
      resp.json(resposta);
    });
  } else {
    resposta.erro = true;
    resposta.msg = "Não foi enviado um video.";
    console.log("Erro: ", error);
    req.json(resposta)
  }

});

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

router.get("/:id?", (req, resp) => {
  GaleriaModel.getId(req.params.id, (error, retorno) => {
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