const db = require("../config/db.config")

const createdistric = (req,res)=>{
    const {name} = req.body    
    db.query(`insert into district (name) values (?)`, [name], (error, results)=>{
        if(error){
            console.log(error);
            return res.status(500).json({
                message: "Error adding new ",
                error: "Internal Server Erroe"
            })
        }
        res.status(201).json({
            message: "New Type add",
            id: results.insertId
        })
    })
}

const getdistrict = (req,res)=>{
    const dbQuery = `select * from district`;
    db.query(dbQuery, (error, results)=>{
        if(error){
            console.log(error);
            return res.status(500).json({
                statusCode: 500,
                message: error.message
            })
        }
        res.status(200).json({
            statusCode: 200,
            message: "district retrieved successfully",
            data: results
        })
    })
}

const findByNameD = (req, res) => {
  const name = req.query.name;
  const search = `%${name}%`;
  db.query(
    `SELECT * FROM district WHERE name LIKE ?`,
    [search],
    (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          statusCode: 500,
          message: error.message,
        });
      }
      res.status(200).json({
        message: "Succsess",
        data: result
      })
    }
  );
};


const getOnedistrict = (req, res) => {
    const id = req.params.id;
    const getOneQuery = `SELECT * FROM district WHERE id = ?`;
    db.query(getOneQuery, [id], (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          message: "Error getting one district",
          error: "Internal Server Error",
        });
      }
  
      if (!result.length) {
        return res.status(404).json({
          message: "A district not found",
        });
      }
  
      res.json({
        statusCode: 200,
        message: "a district retrieved successfully",
        data: result[0],
      });
    });
};

const updatedistrict = (req,res)=>{
    const id = req.params.id
    const name = req.body.name
    const updateQuery = `UPDATE district SET name = ? WHERE id = ?`
    db.query(updateQuery, [name, id], (error, result) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            message: "Error updating one district",
            error: "Internal Server Error",
          });
        }
    
        res.json({
          statusCode: 200,
          message: "a district updated successfully",
          data: result.affectedRows,
        });
    });
}

const deletedistrict = (req, res) => {
    const id = req.params.id;
    const deleteQuery = `DELETE FROM district where id = ?`
    db.query(deleteQuery, [id], (error, result) => {
      if (error) {
        return res.status(500).json({
          message: "Error deleting one district",
          error: "Internal Server Error",
        });
      }
  
      res.json({
        statusCode: 200,
        message: "a district deleted successfully",
        data: result.affectedRows,
      });
    });
};

module.exports = {
    createdistric,
    getdistrict,
    getOnedistrict,
    updatedistrict,
    deletedistrict,
    findByNameD
}