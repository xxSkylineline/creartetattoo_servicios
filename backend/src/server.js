const express = require("express");
const app = express();
const router = require("./routes/routes.js");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use('/api', router)

app.listen(3001, () => {
    console.log("Server running on port 3001");
});