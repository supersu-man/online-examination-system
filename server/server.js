import express, { json } from 'express'
import { db } from './db.js'
import cors from 'cors'
import fs from 'fs'
import csv from 'csv-parser'

const app = express()
const PORT = 3000
app.use(cors())
app.use(json())


app.post("/getOptions", (req,res) => {
    getOptions(req.body['username'],(result)=>{
        res.send(result)
    })
})

app.get("/getQuestions", (req,res) => {
    getCSVData((results)=>{
        res.send(results)
    })
})

app.post('/saveOption', (req,res) => {
    if(req.body['option'] != undefined){
        saveOptionData(req.body,()=>{
            res.send(true)
        })
    }
})

app.post('/login', (req,res) => {
    if(req.body['username'] && req.body['password']){
        loginValidation(req.body['username'], req.body['password'], (login)=>{
            res.send(login)
        })
    }
})

app.post('/createUser', (req,res) => {
    if(req.body['username']){
        createUser(req.body['username'],()=>{
            res.send(true)
        })
    }
})



app.listen(PORT, ()=>{
    createTable()
    console.log(`Server is running on ${PORT}`)
})

function getOptions(username, callback){
    db.query(`SELECT * FROM marks WHERE studentId = ${username}`, (err,result)=>{
        if(!err) {
            callback(result)
        }else{
            console.log(err)
        }
    })
}

function loginValidation(username, password, callback){
    try {
        db.query(`SELECT password FROM users WHERE username='${username}'`, (err,result)=>{
            if(!err){
                var realPass = result[0]['password']
                var login = realPass==password
                callback(login)
            }
        })
    } catch (error) {
        console.log(error)
    }
}

function saveOptionData(data, callback){
    try {
        db.query(`UPDATE marks SET q${data['qnum']} = '${data['option'].slice(-1)}' WHERE studentId = '${data['username']}';`,(err)=>{
            if(!err){
                callback()
            }else{
                console.log(err)
            }
        })
    } catch (error) {
        console.log(error)
    }
}

async function addColumns(callback) {
    getCSVData((results)=>{
        for(let i=0; i<results.length;i++){
            db.query(`ALTER TABLE marks ADD COLUMN q${i+1} VARCHAR(1) NULL DEFAULT null`)
        }
        callback()
    })
}

function createTable() {
    db.query("DROP TABLE marks;")
    db.query("CREATE TABLE marks ( studentId VARCHAR(15) PRIMARY KEY);")
    addColumns(()=>{
        console.log("Added columns")
    })
}

async function getCSVData(callback) {
    let stream = fs.createReadStream('./resources/questions.csv')
    let results = await new Promise((resolve, reject) => {
        const results = []
        stream.pipe(csv())
        .on("data", (chunk) => results.push(chunk))
        .on("end", () => resolve(results))
        .on("error", error => reject(error))
    })
    callback(results)
}


function createUser(username,callback){
    db.query(`INSERT INTO marks (studentId) VALUES ('${username}');`, (err)=>{
        if(!err){
            callback()
        }else if(err.code == "ER_DUP_ENTRY"){
            callback()
        }else{
            console.log(err.code)
        }
    })
}