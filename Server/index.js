const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const app = express()
const port = 3000
const userRouter = require('./router/user.router.js')
const videoRouter = require("./router/video.router.js")
const authentication = require('./middleware/auth.js')
const seriesRouter = require('./router/series.router.js')
const cors = require('cors');
const subscriberRouter = require('./router/userSubscriber.router.js')
const homeRouter = require('./router/home.router.js')
const commentRouter = require('./router/comment.router.js')
const searchRouter = require('./router/search.router.js')


mongoose.connect("mongodb://localhost:27017/Entertainment_Portal").then(() => console.log('DB connected')).catch((err) => console.log(err));

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))

app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(authentication());


app.use('/user' , userRouter)
app.use('/upload' , videoRouter)
app.use('/series' , seriesRouter)
app.use('/subscribe/' , subscriberRouter)
app.use('/home' , homeRouter)
app.use('/comment' , commentRouter)
app.use('/search' , searchRouter)




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})