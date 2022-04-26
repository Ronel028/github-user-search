
const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');
const PORT = process.env.PORT || 4000;

app.use('/style', express.static('public/style/style.css'));
app.use('/script', express.static('public/script/client.js'));
app.use('/images', express.static('public/images'));

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, './view/index.html'));
})

app.get('/userInfo/:login', async (req, res)=>{
        let githubUser = await fetch(`https://api.github.com/users/${req.params.login}`);
        let responseApi = await githubUser.json();
        res.json(responseApi);     
})

app.listen(PORT, ()=>{
    console.log('server started at http://localhost:4000/');
})