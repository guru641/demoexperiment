var Db = require('mysql-activerecord');
let db = new Db.Adapter({
	server: 'localhost',
	username: 'root',
	password: '',
  database: 'training',
  reconnectTimeout: 2000

});

module.exports={
    db
}