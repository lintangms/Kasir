// inisiasi library
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")
const md5 =require("md5")
// implementation
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// create MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "kasir"
})

db.connect(error => {
    if (error) {
        console.log(error.message)
    } else {
        console.log("MySQL Connected")
    }
})
// end-point akses data kasir
app.get("/kasir", (req, res) => {
    // create sql query
    let sql = "select * from kasir"

    // run query
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                siswa: result // isi data
            }            
        }
        res.json(response) // send response
    })
})
app.get("/kasir/:id", (req, res) => {
    let data = {
        id_siswa: req.params.id
    }
    // create sql query
    let sql = "select * from kasir where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                siswa: result // isi data
            }            
        }
        res.json(response) // send response
    })
})
app.post("/kasir", (req,res) => {

    // prepare data
    let data = {
        nama_kasir: req.body.nama_kasir,
        status_kasir: req.body.status_kasir,
        
    }

    // create sql query insert
    let sql = "insert into kasir set ?"//memasukan value ke tabel siswa

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response) // send response
    })
})
app.put("/kasir", (req, res) => {

    let data = [

        {
            nama_kasir: req.body.nama_kasir,
            status_kasir: req.body.status_kasir
        },

        {
            id_kasir: req.body.id_kasir
        }
    ]

    let sql = "update kasir set ? where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response)
    })
})
app.delete("/kasir/:id", (req, res) => {

    let data = {
        id_kasir: req.params.id
    }

    let sql = "delete from kasir where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response)
    })
})

app.listen(8000, () => {
    console.log("pegawai karen's dinner")
})

