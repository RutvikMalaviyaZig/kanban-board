const {express} = require('../../../Provider')
const ColumnController = require('../../controllers/boardController/ColumnController');
const router = express.Router();

router.post('/add', ColumnController.createColumn);
router.get('/:boardId', ColumnController.getColumns);
router.put('/:columnId', ColumnController.updateColumn);
router.delete('/:columnId', ColumnController.deleteColumn);


module.exports = router;
