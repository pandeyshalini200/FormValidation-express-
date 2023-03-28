const bodyParser = require('body-parser')
const express = require('express')
const { check, validationResult } = require('express-validator')

const app = express()
const port = 8000

app.set('view engine', 'ejs')

const urlencodedParser = bodyParser.urlencoded({ extended : false })

app.get('',(req, res) => {
    res.render('index')
})

app.get('/register',(req, res) => {
    res.render('register')
})

// app.get('/login',(req, res) => {
//     res.render('login')
// })

app.post('/register', urlencodedParser, [
    check('username', 'the username must be three character long' )
    .exists()
    .isLength({min : 2 }),
    check("email", "email is not valid")
    .isEmail()
    .normalizeEmail()
], (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        
        // return res.status(422).jsonp(errors.array())
        const alert = errors.array()
        res.render('register',{
            alert
        })
    }
})

app.listen(port, () => console.info(`App listening on port: ${port}`))