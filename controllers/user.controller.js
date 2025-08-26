const db = require("../config/db.config");
const bcrypt = require("bcrypt");
const {totp} = require("otplib")
const nodemailer = require("nodemailer")
totp.options = {step: 120, digits: 5}

const secretKey = "choco"

const emilerTransport = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: 'otabeknurmuhammedov17@gmail.com',
        pass: 'yglqrgkpfbtmykaa'
    }
})

const userRegistr = (req, res) => {
  const { name, phone_number, email, password, role, address } = req.body;
  const is_active = false
  db.query(`SELECT * FROM user WHERE email = ?`, [email], (error, result) => {
    if (error) {
      console.log(error.message);
      return res.status(500).json({
        statusCode: 500,
        message: error.message,
      });
    }
    if (result.length == 0) {
      const dbQuery = `INSERT INTO user (name, phone_number, email, password, is_active, role,address) VALUES (?,?,?,?,?,?,?)`;
      const hash = bcrypt.hashSync(password, 10);
      console.log(hash.length);

      db.query(
        dbQuery,
        [name, phone_number, email, hash, is_active, role, address],
        (error, result) => {
            if(error){
                console.log(error);
                return res.status(500).json({
                    statusCode: 500,
                    message: error.message
                })
            }
            const otpp = totp.generate(email+secretKey)
            emilerTransport.sendMail({
                to: email,
                subject:"Qurilmangizga ulanish uchun kod",
                text: `${otpp} bu kod siznig qurilmangizga ulanib sizdagi barcha malumotlarni olish uchun DIQQT bu kodni hech kimga berman!`
            })
            res.status(201).json({
                message: "otp sended your email"
            })
        }
      );
    } else{
        return res.status(400).json({
            statusCode: 400,
            message: "You are alredy exists"
        })
    }
  });
};

const is_active = (req,res)=>{
    const {otp, email} = req.body
    const verify = totp.check(otp,email+secretKey)
    if(verify){
        db.query(`UPDATE user SET is_active = true WHERE email = ?`, [email], (error,result)=>{
            if(error){
                console.log(error);
                return res.status(500).json({
                    message: error.message
                })
            }
            res.status(200).json({
                message: "Royhatdan otdingiz"
            })
        })
    }else{
        res.status(400).json({
            message:"Parol hato"
        })
    }
}

const userLogin = (req,res)=>{
    const {password, email} = req.body
    const dbQuery = `SELECT * FROM user WHERE email = ?`
    db.query(dbQuery, [email], (error, result)=>{
        if(error){
            console.log(error);
            return res.status(500).json({
                message: error.message
            })
        }
        const b = bcrypt.compare(password, result[0].password+secretKey)
        if(b.length==0){
            return res.json({
                message: "parol hato"
            })
        }
        console.log(result);
        res.status(200).json({
            message: "Succsessl"
        })
    })
}

module.exports = {
    userRegistr,
    is_active,
    userLogin
}