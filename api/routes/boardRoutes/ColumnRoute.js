const {express} = require('../../utils/Constants')
const ColumnController = require('../../controllers/boardController/ColumnController');
const router = express.Router();

router.post('/add', ColumnController.createColumn); // Create a new column
router.get('/:boardId', ColumnController.getColumns);   // Get all columns
router.patch('/:columnId', ColumnController.updateColumn);  // Update a column
router.delete('/:columnId', ColumnController.deleteColumn); // Delete a column


module.exports = router;
