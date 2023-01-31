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
app.get("/menu", (req, res) => {

    let sql = "select * from menu"

    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                menu: result
            }
        }
        res.json(response)
    })
})

app.get("/menu/:id", (req, res) => {
    let data = {
        id_menu: req.params.id
    }

    let sql = "select * from menu where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                menu: result
            }
        }
        res.json(response)
    })
})
app.post("/menu", (req, res) => {

    let data = {
        nama_menu: req.body.nama_menu,
        kategori: req.body.kategori,
        harga_menu: req.body.harga_menu,
        stok: req.body.stok
    }

    let sql = "insert into menu set ?"

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

app.put("/menu", (req, res) => {

    let data = [

        {
            nama_menu: req.body.nama_menu,
            kategori: req.body.kategori,
            harga_menu: req.body.harga_menu,
            stok: req.body.stok
        },

        {
            id_menu: req.body.id_menu
        }
    ]

    let sql = "update menu set ? where ?"

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

app.delete("/menu/:id", (req, res) => {

    let data = {
        id_menu: req.params.id
    }

    let sql = "delete from menu where ?"

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
    console.log("menu tersedap")
})
