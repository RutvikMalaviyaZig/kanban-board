const {express} = require('../../utils/Constants')
const TaskController = require('../../controllers/boardController/TaskController');
const router = express.Router();

router.post('/add', TaskController.createTask); // Create a new task
router.get('/:columnId', TaskController.getTasks);  // Get all tasks
router.patch('/:taskId', TaskController.updateTask);    // Update a task
router.delete('/:taskId', TaskController.deleteTask);   // Delete a task

router.put('/move', TaskController.moveTask); // Route for moving tasks between columns

module.exports = router;
