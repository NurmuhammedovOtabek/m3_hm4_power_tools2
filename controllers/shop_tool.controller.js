const db = require("../config/db.config")

const createShop_tool = (req,res)=>{
    const { shop_id, tool_id} = req.body  
    db.query(`SELECT * FROM tool WHERE id = ?`, [tool_id], (error,result)=>{
        if(error){
            console.log(error);
            return res.json({
                message: error.message
            })
        }
        let price = (result[0].tool_price/100*10) + Number(result[0].tool_price)
        console.log(price);
        
        db.query(`insert into shop_tool (shop_id, tool_id, rent_price) values (?,?,?)`, [shop_id, tool_id, price], (error, results)=>{
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
    })  
}

const getShop_tool = (req,res)=>{
    const dbQuery = `select * from shop_tool`;
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
            message: "Shop_tool retrieved successfully",
            data: results
        })
    })
}


const getOneShop_tool = (req, res) => {
    const id = req.params.id;
    const getOneQuery = `SELECT * FROM shop_tool WHERE id = ?`;
    db.query(getOneQuery, [id], (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          message: "Error getting one shop_tool",
          error: "Internal Server Error",
        });
      }
  
      if (!result.length) {
        return res.status(404).json({
          message: "A Shop_tool not found",
        });
      }
  
      res.json({
        statusCode: 200,
        message: "a tool retrieved successfully",
        data: result[0],
      });
    });
};

const updateShop_tool = (req,res)=>{
    const id = req.params.id
    const {shop_id, tool_id, rent_price} = req.body
    let fields = [];
    let values = [];
  
    if (shop_id) {
      fields.push("shop_id = ?");
      values.push(shop_id);
    }
    if (tool_id) {
      fields.push("tool_id = ?");
      values.push(tool_id);
    }
    if (rent_price) {
      fields.push("rent_price = ?");
      values.push(rent_price);
    }
    if (fields.length === 0) {
      return res.status(400).json({
          statusCode: 400,
          message: "No fields to update" 
      });
    }
    values.push(id)
    const updateQuery = `UPDATE shop_tool SET ${fields.join(",")} WHERE id = ?`
    db.query(updateQuery, values, (error, result) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            message: "Error updating one Shop_tool",
            error: "Internal Server Error",
          });
        }
    
        res.json({
          statusCode: 200,
          message: "a Shop_tool updated successfully",
          data: result.affectedRows,
        });
    });
}

const deleteShop_tool = (req, res) => {
    const id = req.params.id;
    const deleteQuery = `DELETE FROM shop_tool where id = ?`
    db.query(deleteQuery, [id], (error, result) => {
      if (error) {
        return res.status(500).json({
          message: "Error deleting one shop_tool",
          error: "Internal Server Error",
        });
      }
  
      res.json({
        statusCode: 200,
        message: "a shop_tool deleted successfully",
        data: result.affectedRows,
      });
    });
};

module.exports = {
    createShop_tool,
    getShop_tool,
    getOneShop_tool,
    updateShop_tool,
    deleteShop_tool
}