const {express} = require('../../../Provider') 
const router = express.Router();


const authRoutes = require("./authRoutes");
const pageRoutes = require("./PageRoute")


router.use("/", authRoutes); // route for all authentication
router.use("/", pageRoutes)


module.exports = router;
