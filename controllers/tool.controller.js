const db = require("../config/db.config")

const createTool = (req,res)=>{
    const {name,brand, description, tool_price } = req.body    
    db.query(`insert into tool (name, brand, description, tool_price) values (?,?,?,?)`, [name, brand, description, tool_price], (error, results)=>{
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

const getTool = (req,res)=>{
    const dbQuery = `select * from tool`;
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
            message: "tool retrieved successfully",
            data: results
        })
    })
}


const getOneTool = (req, res) => {
    const id = req.params.id;
    const getOneQuery = `SELECT * FROM tool WHERE id = ?`;
    db.query(getOneQuery, [id], (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          message: "Error getting one tool",
          error: "Internal Server Error",
        });
      }
  
      if (!result.length) {
        return res.status(404).json({
          message: "A tool not found",
        });
      }
  
      res.json({
        statusCode: 200,
        message: "a tool retrieved successfully",
        data: result[0],
      });
    });
};

const updateTool = (req,res)=>{
    const id = req.params.id
    const {name, brand, description, tool_price} = req.body
    let fields = [];
    let values = [];
  
    if (name) {
      fields.push("name = ?");
      values.push(name);
    }
    if (brand) {
      fields.push("brand = ?");
      values.push(brand);
    }
    if (description) {
      fields.push("description = ?");
      values.push(description);
    }
    if(tool_price){
      fields.push("tool_price = ?")
      values.push(tool_price)
    }
    if (fields.length === 0) {
      return res.status(400).json({
          statusCode: 400,
          message: "No fields to update" 
      });
    }
    values.push(id)
    const updateQuery = `UPDATE tool SET ${fields.join(",")} WHERE id = ?`
    db.query(updateQuery, values, (error, result) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            message: "Error updating one tool",
            error: "Internal Server Error",
          });
        }
    
        res.json({
          statusCode: 200,
          message: "a tool updated successfully",
          data: result.affectedRows,
        });
    });
}

const deleteTool = (req, res) => {
    const id = req.params.id;
    const deleteQuery = `DELETE FROM tool where id = ?`
    db.query(deleteQuery, [id], (error, result) => {
      if (error) {
        return res.status(500).json({
          message: "Error deleting one tool",
          error: "Internal Server Error",
        });
      }
  
      res.json({
        statusCode: 200,
        message: "a tool deleted successfully",
        data: result.affectedRows,
      });
    });
};

module.exports = {
    createTool,
    getTool,
    getOneTool,
    updateTool,
    deleteTool
}