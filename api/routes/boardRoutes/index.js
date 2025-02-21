const {express} = require('../../utils/Constants')
const router = express.Router();

const BoardRoute = require("./BoardRoute")
const ColumnRoute = require("./ColumnRoute")
const TaskRoute = require("./TaskRoute")


router.use("/bor", BoardRoute);    // Use the BoardRoute for board
router.use("/col", ColumnRoute);    // Use the ColumnRoute for column
router.use("/tas", TaskRoute);  // Use the TaskRoute for task


module.exports = router;
