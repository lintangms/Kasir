// inisiasi library
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")

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
app.get("/pelanggan", (req, res) => {

    let sql = "select * from pelanggan"

    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                pelanggan: result
            }
        }
        res.json(response)
    })
})

app.get("/pelanggan/:id", (req, res) => {
    let data = {
        id_pelanggan: req.params.id
    }

    let sql = "select * from pelanggan where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                pelanggan: result
            }
        }
        res.json(response)
    })
})

app.post("/pelanggan", (req, res) => {

    let data = {
        id_pelanggan: req.body.id_pelanggan,
        nama_pelanggan: req.body.nama_pelanggan
    }

    let sql = "insert into pelanggan set ?"

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
        res.json(response)
    })
})

app.put("/pelanggan", (req, res) => {

    let data = [

        {
            id_pelanggan: req.body.id_pelanggan,
            nama_pelanggan: req.body.nama_pelanggan
        },

        {
            id_pelanggan: req.body.id_pelanggan
        }
    ]

    let sql = "update pelanggan set ? where ?"

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

app.delete("/pelanggan/:id", (req, res) => {

    let data = {
        id_pelanggan: req.params.id
    }

    let sql = "delete from pelanggan where ?"

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
    console.log("pelanggan banyak minta")
})
