const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");
const FRONTEND_URL = process.env.FRONTEND_URL;

const app = express();
app.use(express.json());
const whiteListCORS = ["http://localhost:5173", FRONTEND_URL];
const options = {
  origin: (origin, callback) => {
    if (whiteListCORS.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed"));
    }
  },
};
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  try {
    const response = await axios.put(
      "https://api.chatengine.io/users/",
      {
        username: username,
        secret: username,
        first_name: username,
      },
      { headers: { "private-key": "7c2e6b1b-d930-47bd-a085-b236991994d3" } }
    );
    return res.status(response.status).json(response.data);
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
});

app.listen(3001, () => {
  console.log("Escuchando en el puerto " + 3001);
});
