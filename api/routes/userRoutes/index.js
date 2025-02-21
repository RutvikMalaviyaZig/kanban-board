const {express} = require('../../utils/Constants') 
const router = express.Router();


const authRoutes = require("./AuthRoutes");
const pageRoutes = require("./PageRoute")


router.use("/v1", authRoutes); // route for all authentication
router.use("/v1", pageRoutes) // route for all pages


module.exports = router;
