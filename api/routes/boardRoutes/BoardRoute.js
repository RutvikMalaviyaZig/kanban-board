
const {express} = require('../../../Provider')
const BoardController = require('../../controllers/boardController/BoardController');
const router = express.Router();

const { verifyAuthMiddleware } = require('../../middlewares/VerfiyAuthMIddleware')

 router.use(verifyAuthMiddleware)
,
router.post('/', BoardController.createBoard);
router.get('/', BoardController.getBoards);
router.delete('/:boardId', BoardController.deleteBoard);

module.exports = router;
