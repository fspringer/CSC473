const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const publicRoutes = require("./routes/public");
//const dotenv = require("dotenv");

//require('dotenv').config();

const app = express();
const PORT = 3503;
//const PORT = 3504;

const allowedOrigins = ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3503",  "https://eventify.club:3503"];

app.use(express.json());

const whitelist=["https://eventify.club:3503", "http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://localhost:3003"];

const corsOptions = {    
  origin: (origin, callback) => {
      
      console.log("msg1", "corsOptions function");
      console.log("msg2", origin);

      if(whitelist.indexOf(origin) !== -1 || !origin){
          callback(null,true);
      }else{
          callback(new Error('Not allowed by CORS'));
      }
  },
  optionsSuccessStatus: 200
};

 app.use(cors(corsOptions));

app.use(cookieParser());

app.use("/api", publicRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
