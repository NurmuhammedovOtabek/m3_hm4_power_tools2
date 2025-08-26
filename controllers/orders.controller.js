const db = require("../config/db.config");

const createOrders = (req, res) => {
  const { client_id, shop_tool_id, order_date, period } = req.body;
  db.query(
    `SELECT * FROM shop_tool WHERE id = ?`,
    [shop_tool_id],
    (error, result) => {
      if (error) {
        console.log(error);
        return res.json({
          message: error.message,
        });
      }
      let price = Number(result[0].rent_price);

      db.query(
        `insert into orders (client_id, shop_tool_id, order_date, period, total_price) values (?,?,?,?,?)`,
        [client_id, shop_tool_id, order_date, period, price],
        (error, results) => {
          if (error) {
            console.log(error);
            return res.status(500).json({
              message: "Error adding new ",
              error: "Internal Server Erroe",
            });
          }
          res.status(201).json({
            message: "New Type add",
            id: results.insertId,
          });
        }
      );
    }
  );
};

const getOrders = (req, res) => {
  const dbQuery = `select * from orders`;
  db.query(dbQuery, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        statusCode: 500,
        message: error.message,
      });
    }
    res.status(200).json({
      statusCode: 200,
      message: "orders retrieved successfully",
      data: results,
    });
  });
};

const getOneorders = (req, res) => {
  const id = req.params.id;
  const getOneQuery = `SELECT * FROM orders WHERE id = ?`;
  db.query(getOneQuery, [id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error getting one orders",
        error: "Internal Server Error",
      });
    }

    if (!result.length) {
      return res.status(404).json({
        message: "A orders not found",
      });
    }

    res.json({
      statusCode: 200,
      message: "a tool retrieved successfully",
      data: result[0],
    });
  });
};

const updateorders = (req, res) => {
  const id = req.params.id;
  const { client_id, shop_tool_id, order_date, period, total_price } = req.body;
  let fields = [];
  let values = [];

  if (client_id) {
    fields.push("client_id = ?");
    values.push(client_id);
  }
  if (shop_tool_id) {
    fields.push("shop_tool_id = ?");
    values.push(shop_tool_id);
  }
  if (order_date) {
    fields.push("order_date = ?");
    values.push(order_date);
  }
  if (period) {
    fields.push("period = ?");
    values.push(period);
  }
  if (total_price) {
    fields.push("total_price = ?");
    values.push(total_price);
  }
  if (fields.length === 0) {
    return res.status(400).json({
      statusCode: 400,
      message: "No fields to update",
    });
  }
  values.push(id);
  const updateQuery = `UPDATE orders SET ${fields.join(",")} WHERE id = ?`;
  db.query(updateQuery, values, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error updating one orders",
        error: "Internal Server Error",
      });
    }

    res.json({
      statusCode: 200,
      message: "a orders updated successfully",
      data: result.affectedRows,
    });
  });
};

const deleteOrders = (req, res) => {
  const id = req.params.id;
  const deleteQuery = `DELETE FROM orders where id = ?`;
  db.query(deleteQuery, [id], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "Error deleting one orders",
        error: "Internal Server Error",
      });
    }

    res.json({
      statusCode: 200,
      message: "a orders deleted successfully",
      data: result.affectedRows,
    });
  });
};

module.exports = {
  createOrders,
  getOrders,
  getOneorders,
  updateorders,
  deleteOrders,
};
