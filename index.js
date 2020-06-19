const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api', require('./middleware/routes'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started  on port : ${PORT}`));
