const express = require("express");
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const examRoutes = require('./routes/examRoutes');
const homeRoutes = require('./routes/homeRoutes');
const {requireAuth} = require('./middleware/authMiddleware')
const cors = require('cors');
const User = require('./models/User')
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");


const app = express();
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const dbURI = 'mongodb+srv://admin:7RUA6rN0a8FkISWy@cluster0.nbw43uf.mongodb.net/mydb'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(8080))
    .catch((err) => console.log(err));



app.get('/is_signedin', (req, res) => {
    try{
        const token = req.cookies.jwt;
        console.log(token);
        if(token){
            jwt.verify(token, 'example secret', async (err, decodedToken)=>{
                if(err){
                    console.log(err.message);
                    res.json({signed_in: false});
                }else{
                    console.log(decodedToken);
                    let user = await User.findById(decodedToken.id);
                    res.json({user: user, signed_in: true});
                }
            })
        }else{
            res.json({signed_in: false});
       }
    }catch(err){
        console.log(err);
        res.json({signed_in: false});
    }
});

app.use(authRoutes);
app.use('/home', requireAuth,homeRoutes); ////add requiredAuth after finishing testing
app.use('/exam', requireAuth,examRoutes);




