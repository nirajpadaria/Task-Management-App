require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3030;
const cors = require("cors");
const bodyparser = require("body-parser");
const { sequelize } = require("./database/connection");
const path = require("path");
const swaggerUi = require("swagger-ui-express");

sequelize
  .authenticate()
  .then(() => {
    console.log(`Database connected`);
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const options = {
  explorer: true,
  swaggerOptions: {
    urls: [
      {
        url: `${process.env.IP_URL_LOCAL}/doc/swagger.json`,
        name: "V1",
      },
    ],
    servers: [
      {
        url: `${process.env.IP_URL_LOCAL}`,
      },
    ],
  },
};

app.use(bodyparser.urlencoded({ extended: true }));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(null, options));

app.use("/doc", express.static(path.join(__dirname, "./src/V1.0.0/doc")));

app.use(cors());

app.use(express.json());

app.use("/", require("./src/index"));

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
