const express = require('express');
require("dotenv").config();
const {rotas}  = require('./rotas');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(rotas);

app.listen(
    process.env.PORT || 5000, () => {
        console.log("server running")
    }
);