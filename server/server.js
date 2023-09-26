const express = require('express');
const cors = require('cors');
const app=express();
const fs= require('fs');
const port = 3000;

app.use(cors());
// app.use('/',express.static('public'));
const budget = JSON.parse(fs.readFileSync('budget.json'));


// const budget = {
//     myBudget:[
//     {
//         title: 'Eat out',
//         budget: 30

//     },
//     {
//        title:'Rent',
//        budget: 350 
 //     {
 //         budget: 90
//     },

//   ]
// };
app.get('/hello',(req,res) => {
    res.send('Hello World!');
});

app.get('/budget',(req,res) => {
    res.json(budget);
});

app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`);
});