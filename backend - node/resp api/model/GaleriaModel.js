const db = require('../banco/dbConexao');

class  GaleriaModel {
  static getTodos(callback){
    return db.query("SELECT * FROM galeria_video", callback);
  }
}

module.exports = GaleriaModel;
