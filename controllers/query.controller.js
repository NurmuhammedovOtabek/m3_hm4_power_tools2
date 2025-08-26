const db = require("../config/db.config");

const ToolSearchShop = (req, res) => {
  const name = req.body.name;
  const dbQuery = `SELECT s.name, s.phone_number, s.address, s.location FROM tool t JOIN shop_tool st ON t.id = st.tool_id
  JOIN shop s ON st.shop_id = s.id WHERE t.name = ?`;
  db.query(dbQuery, [name], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        statusCode: 500,
        message: error.message,
      });
    }
    res.json({
      statusCode: 200,
      message: result,
    });
  });
};

const searchUser = (req, res) => {
  const price = req.body.price;
  const dbQuery = `SELECT u.name, u.email, u.password, u.phone_number, u.address, u.role, u.is_active FROM shop_tool st JOIN shop s ON st.shop_id = s.id
JOIN user u ON s.ownerId = u.id WHERE st.rent_price<?`;
  db.query(dbQuery, [price], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        statusCode: 500,
        message: error.message,
      });
    }
    res.json({
      statusCode: 200,
      message: result,
    });
  });
};

const query3 = (req, res) => {
  const { districtName, startDate, endDate, toolName } = req.body;
  const dbQuery = `SELECT u.name, u.email, u.password, u.phone_number, u.address, u.role, u.is_active FROM 
district d JOIN shop s ON d.id=s.district_id
JOIN shop_tool st ON s.id = st.shop_id
JOIN tool t ON st.tool_id = t.id 
JOIN user u ON u.id = s.ownerId
JOIN orders o ON u.id = o.client_id
WHERE d.name = ? 
AND o.order_date  BETWEEN ? and ? 
AND t.name = ?`;
  db.query(dbQuery, [districtName, startDate, endDate, toolName], (error,result)=>{
    if (error) {
        console.log(error);
        return res.status(500).json({
          statusCode: 500,
          message: error.message,
        });
      }
      res.json({
        statusCode: 200,
        message: result,
      });
  })
};

module.exports = {
  ToolSearchShop,
  searchUser,
  query3
};
