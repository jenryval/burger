const { connect } = require('../config/connection');
const connection = require('../config/connection');

function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }
  

  function objToSql(ob) {
    var arr = [];
    for (var key in ob) {
      var value = ob[key];
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
        const queryString = "SELECT * FROM" + tableInput + ";";
        connection.query(queryString, function(err, results){
            if (err) throw err;
            cb(results);
        });
    },
    insertOne: function(table, cols, vals, cb){
        const queryString = "INSERT INTO" + table;

        queryString += "(";
        queryString += cols.toString();;
        queryString += ")";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.lenght);
        queryString += ")";

        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result)
        })

    },
    updateOne: function(table, objColVals, condition, cb){
        const queryString = "UPDATE" + table;

        queryString += "SET";
        queryString += obtToSal(objColVals);
        queryString += "WHERE";
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
