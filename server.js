const express = require('express')
const app = express()
const connectDb = require('./database/connect')
const cors = require('cors')
const bodyparser = require('body-parser')
const cookieParser = require('cookie-parser')
  

connectDb()

app.use(cors({
    origin:['http://localhost:3000','https://master.d35czh5kpusu7z.amplifyapp.com'],
    credentials:true,
    methods:['GET','POST','PUT','DELETE','PATCH']
}))
app.use(express.json())
app.use(cookieParser())
app.use(bodyparser.urlencoded({ extended: true }));

app.use('/' , require('./Router/adminRouter'))
app.use('/' , require('./Router/userRouter'))

app.listen(3001, () =>{
    console.log('server is running at the port 3001')
})











































