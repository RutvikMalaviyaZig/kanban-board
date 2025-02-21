const {express} = require("../../../Provider")
const TaskController = require('../../controllers/boardController/TaskController');
const router = express.Router();

router.post('/add', TaskController.createTask);
router.get('/:columnId', TaskController.getTasks);
router.put('/:taskId', TaskController.updateTask);
router.delete('/:taskId', TaskController.deleteTask);

// Route for moving tasks between columns
router.put('/move', TaskController.moveTask);

module.exports = router;
