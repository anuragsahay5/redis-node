const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const {createClient} = require("redis")
require("dotenv").config();

app.use(cors());

const client = createClient({url:process.env.REDIS_URL})
client.on('error', (err) => console.log('Redis Client Error', err));

 client.connect().then((val)=>{
    console.log("connected")
 });

app.get("/set",async(req,res)=>{
    const {key,value} = req.query;
    await client.set(key,value);
    res.send("OK");
})
app.get("/get",async(req,res)=>{
    const {key} = req.query;
    res.json(await client.get(key));
})

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
