const {express} = require('../../Provider') 
const router = express.Router();

const AuthRoute = require("./userRoutes")
const BoardRoute = require("./boardRoutes")
const ColumnRoute = require("./boardRoutes")
const TaskRoute = require("./boardRoutes")

router.use('/auth', AuthRoute);
router.use('/boards', BoardRoute);
router.use('/columns', ColumnRoute);
router.use('/tasks', TaskRoute);


module.exports = router