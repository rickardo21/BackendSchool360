import express from 'express';
import { authApiKey } from './middleware/authApiKey.js';
import loginRoute from './routes/loginRoute.js';

const app = express();

app.use(express.json());
// app.use(authApiKey);


app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/login", loginRoute)

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});