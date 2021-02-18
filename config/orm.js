const connection = require('../config/connection');

function printQuestionMarks(num) {
    let arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }
  

  function objToSql(ob) {
    let arr = [];
    for (var key in ob) {
      let value = ob[key];
      if (Object.hasOwnProperty.call(ob, key)) {
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        arr.push(key + "=" + value);
      }
    }
    return arr.toString();
  }
const orm = {
    selectAll: function(tableInput,cb){

        let queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, results){
            if (err) throw err;
            cb(results);
        });
    },
    insertOne: function(table, cols, vals, cb){
    

        let queryString = "INSERT INTO " + table;

        queryString += "(";
        queryString += cols.toString();;
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ")";

        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result)
        })

    },
    updateOne: function(table, objColVals, condition, cb){
      
        let queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function(err, result){
            if (err) {
                throw err;
            }
            cb(result);
        })

    }
};

module.exports = orm;
