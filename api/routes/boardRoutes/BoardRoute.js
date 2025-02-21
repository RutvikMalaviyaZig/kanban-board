
const {express} = require('../../utils/Constants')
const BoardController = require('../../controllers/boardController/BoardController');
const router = express.Router();

const { verifyAuthMiddleware } = require('../../middlewares/VerfiyAuthMIddleware')

router.use(verifyAuthMiddleware)


router.post('/add', BoardController.createBoard); // Create a new board
router.get('/', BoardController.getBoards); // Get all boards
router.delete('/:boardId', BoardController.deleteBoard); // Delete a board

module.exports = router;
