const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;
const { Novu } = require("@novu/node");
const novu = new Novu("0aa19628e13e4061dcb71b478d469338");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const mysql = require('mysql');


const db = mysql.createConnection ({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'member',
    port : '3307'
}) 
  
db.connect((err) => { 
    if (err) {
        console.log ('Error connecting to MySQL database = ', err)
        return;
    }
    console.log('MySQL successfully connect');
})

function runSqlCommand(query) {
    return new Promise((resolve, reject) => {
      db.query(query, function (error, results, fields) {
        if (error) {
          console.log("query", query);
          reject(error);
        } else {
          resolve(results);
        }
      });
    }); 
  } 

  app.get("/api/register",  (req, res) => {
    const {email,password,tel,username} = req.body;
    try {
        db.query( "SELECT * FROM signup ",[email,password,tel,username], (err,results,fields) => {

                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                return res.status(200).json(results)
            })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

//👇🏻 An array containing all the users ///////
const users = [];

//👇🏻 Generates a random string as the ID
const generateID = () => Math.random().toString(36).substring(2, 10);
//👇🏻 Generates the code to be sent via SMS
const generateCode = () => Math.random().toString(36).substring(2, 12);

const sendNovuNotification = async (recipient, verificationCode) => {
    try {
        let response = await novu.trigger("<NOTIFICATION_TEMPLATE_ID>", {
            to: {
                subscriberId: recipient,
                phone: recipient,
            },
            payload: {
                code: verificationCode,
            },
        });
        console.log(response);
    } catch (err) {
        console.error(err); 
    }
};

app.post("/api/register", async (req, res) => {
    //👇🏻 Get the user's credentials
    const { email, password, tel, username } = req.body;

    db.query ("INSERT INTO signup(email,password,tel,username) VALUES(?,?,?,?)",
    [email,password,tel,username],
    ( err,results,fields) =>{  
        if (err) {} results,fields; 
    })
    //👇🏻 Checks if there is an existing user with the same email or password
    let result = users.filter((user) => user.email === email || user.tel === tel)

    //👇🏻 if none 
    if (result.length === 0) {                     
        //👇🏻 creates the structure for the user
        const newUser = { id: generateID(), email, password,tel,username };
        //👇🏻 Adds the user to the array of users
        users.push(newUser);
        //👇🏻 Returns a message
        return res.json({
            message: "Account created successfully!",
        });
    }
    //👇🏻 Runs if a user exists
    res.json({
        error_message: "User already exists",
    });
}); 


//👇🏻 variable that holds the generated code
let code;

app.post("/api/login", async(req, res) => {
    const { email, password } = req.body;

    db.query ("INSERT INTO login(email,password) VALUES(?,?)",
    [email,password],
    ( err,results,fields) =>{  
        if (err) {} results,fields; 
    })

    let result = users.filter(
        (user) => user.email === email && user.password === password
    );

    if (result.length !== 1) {
        return res.json({
            error_message: "Incorrect credentials",
        });
    }
    code = generateCode();

    //👇🏻 Send the SMS via Novu
    sendNovuNotification(result[0].tel, code);

    res.json({
        message: "Login successfully",
        data: {
            username: result[0].username,
        },
    });
});

app.post("/api/verification", async (req, res) => {

    //👇🏻 Generates a   random string as the ID
const generateID = () => Math.random().toString(36).substring(2, 10);
//👇🏻 Generates the code to be sent via SMS 👇🏻
const generateCode = () => Math.random().toString(36).substring(2, 12);


    const sendNovuNotification = async (recipient, verificationCode) => {
        try {
            let response = await novu.trigger(generateCode, { 
                to: {
                    subscriberId: recipient,
                    phone: recipient, 
                },
                payload: {
                    code: verificationCode,
                },
            });
            console.log(response); 
        } catch (err) {
            console.error(err); 
        } 
    };

    db.query ("INSERT INTO phon_verify(code) VALUES(?)",[code],async(sendNovuNotification)=> {
        
    if (code === req.body.code) {

        return res.json({ message: "You're verified successfully" });
    }
    res.json({
        error_message: "Incorrect credentials", 
    });
});
})  
    
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});


module.exports = app;     