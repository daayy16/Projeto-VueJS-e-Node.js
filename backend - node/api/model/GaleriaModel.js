const db = require('../banco/dbConexao');

class  GaleriaModel {
  static getTodos(callback){
    return db.query("SELECT * FROM galeria_video", callback);
  }

  static getId(id, callback){
    return db.query("SELECT * FROM galeria_video WHERE id_galeria_video = ?", [id], callback);
  }

  static adicionar(dados, callback){
    return db.query("INSERT INTO galeria_video (titulo, caminho) VALUES (?, ?)", [dados.titulo, dados.caminho], callback);
  }
}

module.exports = GaleriaModel;
