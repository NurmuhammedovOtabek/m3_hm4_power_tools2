const db = require("../config/db.config")

const createShop = (req,res)=>{
    const { name, ownerId, phone_number, district_id, address, location} = req.body    
    db.query(`insert into shop (name, ownerId, phone_number, district_id, address, location) values (?,?,?,?,?,?)`, [name, ownerId, phone_number, district_id, address, location], (error, results)=>{
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

const getShop = (req,res)=>{
    const dbQuery = `select * from shop`;
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
            message: "shop retrieved successfully",
            data: results
        })
    })
}


const getOneShop = (req, res) => {
    const id = req.params.id;
    const getOneQuery = `SELECT * FROM shop WHERE id = ?`;
    db.query(getOneQuery, [id], (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          message: "Error getting one shop",
          error: "Internal Server Error",
        });
      }
  
      if (!result.length) {
        return res.status(404).json({
          message: "A shop not found",
        });
      }
  
      res.json({
        statusCode: 200,
        message: "a tool retrieved successfully",
        data: result[0],
      });
    });
};

const updateShop = (req,res)=>{
    const id = req.params.id
    const {name, ownerId, phone_number, district_id, address, location} = req.body
    let fields = [];
    let values = [];
  
    if (name) {
      fields.push("name = ?");
      values.push(name);
    }
    if (ownerId) {
      fields.push("ownerId = ?");
      values.push(ownerId);
    }
    if (phone_number) {
      fields.push("phone_number = ?");
      values.push(phone_number);
    }
    if(district_id){
      fields.push("district_id = ?")
      values.push(district_id)
    }
    if(address){
        fields.push("address = ?")
        values.push(address)
    }
    if(location){
        fields.push("location = ?")
        values.push(location)
    }
    if (fields.length === 0) {
      return res.status(400).json({
          statusCode: 400,
          message: "No fields to update" 
      });
    }
    values.push(id)
    const updateQuery = `UPDATE shop SET ${fields.join(",")} WHERE id = ?`
    db.query(updateQuery, values, (error, result) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            message: "Error updating one shop",
            error: "Internal Server Error",
          });
        }
    
        res.json({
          statusCode: 200,
          message: "a shop updated successfully",
          data: result.affectedRows,
        });
    });
}

const deleteShop = (req, res) => {
    const id = req.params.id;
    const deleteQuery = `DELETE FROM shop where id = ?`
    db.query(deleteQuery, [id], (error, result) => {
      if (error) {
        return res.status(500).json({
          message: "Error deleting one shop",
          error: "Internal Server Error",
        });
      }
  
      res.json({
        statusCode: 200,
        message: "a shop deleted successfully",
        data: result.affectedRows,
      });
    });
};

module.exports = {
    createShop,
    getShop,
    getOneShop,
    updateShop,
    deleteShop
}