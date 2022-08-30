const express = require('express');
const app = express();
const PORT = 8080 || PORT;

app.use(express.json());

app.listen(
    PORT,
    () => console.log(`Server listening on ${PORT}`)
);

app.get('/tshirt', (req,res) => {
    res.status(200).send({
        tshirt : '🥋',
        size : 'large'
    })
});

app.post('/tshirt/:id',(req,res) =>
{
   const { id } = req.params;
   const { logo } = req.body;

   if(!logo)
   {
    res.status(418).send({message : 'We need a logo'})
   }
   res.send(
    {
        tshirt: `🥋 with your ${logo} and ID of ${id}`,
    }
   );
     
});