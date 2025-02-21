const {express} = require('../../../Provider') 
const router = express.Router();

const BoardRoute = require("./BoardRoute")
const ColumnRoute = require("./ColumnRoute")
const TaskRoute = require("./TaskRoute")


router.use("/", BoardRoute); 
router.use("/", ColumnRoute); 
router.use("/", TaskRoute); 


module.exports = router;
