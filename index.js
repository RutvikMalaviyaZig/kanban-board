require("dotenv").config();
// core modules
const { express } = require("./api/utils/Constants.js");
const path = require("path");

// routes imports
const Routes = require('./api/routes/index.js')

// import sequize database
const sequelize = require("./config/database");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;


// middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// routes use
app.use('/', Routes)

// cors setup
app.use(
  cors({
    origin: "*",
  })
);

// test database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });



app.listen(PORT, (req, res) => {
  console.log(`server is listening at http://localhost:${PORT}`);
});