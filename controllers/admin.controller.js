const db = require("../config/db.config");
const bcrypt = require("bcrypt");

const createAdmin = (req, res) => {
    const { full_name, email, password, phone_number, is_creator } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    
    const dbQuery = `INSERT INTO admin (full_name, email, password, phone_number, is_active, is_creator) VALUES (?, ?, ?, ?, true, ?)`;
    db.query(dbQuery, [full_name, email, hash, phone_number, is_creator], (error, result) => {
        if (error) {
            console.log(error.message);
            return res.status(500).json({ 
                message: err.message ,
                statusCod: 500
            });
        }
        res.status(201).json({ message: "Admin muvaffaqiyatli yaratildi" });
    });
};

const adminLogin = (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT * FROM admin WHERE email = ?`;

    db.query(sql, [email], async (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const t = await bcrypt.compare(password, result[0].password);
        if (!t) {
            return res.status(400).json({ message: "Parol xato" });
        }

        res.status(200).json({
            message: "Login muvaffaqiyatli",
            admin: result[0]
        });
    });
};

const getAllAdmins = (req, res) => {
    const dbQuery = `SELECT * FROM admin`
    db.query(dbQuery, (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
        res.status(200).json({
            statusCod: 200,
            message: result
        });
    });
};


const getAdminById = (req, res) => {
    const { id } = req.params;
    db.query(`SELECT * FROM admin WHERE id = ?`, [id], (error, result) => {
        if (err) {
            console.log(error);
            return res.status(500).json({
                message: error.message 
            });
        }
        if (result.length === 0) {
            return res.status(404).json({
                message: "Admin topilmadi" 
            });
        }
        res.status(200).json({
            message:result[0]
        });
    });
};


const updateAdmin = (req, res) => {
    const { id } = req.params;
    const { full_name, email, password, phone_number, is_active, is_creator } = req.body;

    let fields = [];
    let values = [];

    if (full_name) { fields.push("full_name = ?"); values.push(full_name) }
    if (email) { fields.push("email = ?"); values.push(email) }
    if (password) { 
        const hash = bcrypt.hashSync(password, 10);
        fields.push("password = ?"); 
        values.push(hash); 
    }
    if (phone_number) { fields.push("phone_number = ?"); values.push(phone_number); }
    if (is_active !== undefined) { fields.push("is_active = ?"); values.push(is_active); }
    if (is_creator !== undefined) { fields.push("is_creator = ?"); values.push(is_creator); }

    if (fields.length === 0) {
        return res.status(400).json({ message: "Sorov kriting" });
    }

    const dbQuery = `UPDATE admin SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);

    db.query(dbQuery, values, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json({ 
            statusCod: 200,
            message: "update Succsessful" 
        });
    });
};


const deleteAdmin = (req, res) => {
    const { id } = req.params;
    db.query(`DELETE FROM admin WHERE id = ?`, [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json({ message: "Admin ochirildi" });
    });
};


module.exports = {
    createAdmin,
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    adminLogin
};
