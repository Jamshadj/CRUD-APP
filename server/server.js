import express from "express";
import cors from "cors";
import router from "./routes/routes.js";

const app = express();

var corsOptions = {
  origin: "http://localhost:5173",
  credentials: true 
};

// Middleware
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', router);

const port = 4000;

app.listen(port, () => {
  console.log(`Your server is running on port ${port}`);
});
