import express from 'express';
import mysql from 'mysql';
const router  = express.Router();

const conn = mysql.createConnection({

    host: 'localhost',
  
    user: 'root', /* MySQL User */
  
    password: 'root', /* MySQL Password */
  
    database: 'usermanagement_tut', /* MySQL Database */

    port : '8889'
  
  });

  conn.connect(function (err) {
    if(err){
        console.log(err);
    }
    else{
        console.log("connection created with Mysql successfully");
    }
 });

const users = [
    {
        firstname : "Khalid",
        lastname : "Ahmed",
        age : 25
    },
    {
        firstname : "Benz",
        lastname : "Gar",
        age : 24
    }
]

//Show all users 
router.get('/', (req,res) => 
{
    conn.query("SELECT * FROM  user" , (err , rows) => 
    {
        if(!err) res.send(rows);
        else console.log(err);
    })
});

//Add users 

router.post('/', (req,res) => 
{
    const { first_name , last_name , email, phone , comments , status } = req.body;
    conn.query("INSERT INTO USER SET first_name = ? , last_name = ?, email = ?, phone = ?, comments = ?, status = ?" , [ first_name , last_name , email, phone , comments , status ] , (err, results) => 
    {
        if(!err) res.send(results);
        else console.log(err);
    })
    
});

router.get('/:id', (req,res) => {
    const { id } = req.params;
    conn.query ("SELECT * FROM user WHERE id = ?", [id] , (err , result) => 
    {
        if(!err) res.send(result);
        else console.log(err);
    })
})

router.put('/:id', (req,res) => 
{
    const { id } = req.params;
    const { first_name , last_name , email, phone , comments , status } = req.body;
    // const { ids } = parseInt(req.params);
    
     conn.query("UPDATE user SET first_name = ? , last_name = ?, email = ?, phone = ?, comments = ?, status = ?  WHERE id = ?", [first_name , last_name , email, phone , comments , status , id ], (err , rows) => 
    {
        if(!err) conn.query("SELECT * FROM  user" , (err , result) => 
        {
            res.send(result);
        })
        else console.log(err);
    })
});

router.delete('/:id', (req,res) => {
    const { id } = req.params;
    conn.query("DELETE FROM user WHERE id = ? ", [ id ] , (err , rows) => 
    {
        if(!err) conn.query("SELECT * FROM  user" , (err , rows) => 
        {
            if(!err) res.send(rows);
            else console.log(err);
        })
        else console.log(err);
    })
});

export default router;
