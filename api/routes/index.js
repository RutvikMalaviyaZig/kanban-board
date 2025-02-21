const {express} = require('../utils/Constants') 
const router = express.Router();

const AuthRoute = require("./userRoutes")
const AllBoardRoutes = require("./boardRoutes")

router.use('/auth', AuthRoute); // route for all authentication 
router.use('/boards', AllBoardRoutes); // route for all boards
router.use('/columns', AllBoardRoutes); // route for all columns
router.use('/tasks', AllBoardRoutes); // route for all tasks


module.exports = router