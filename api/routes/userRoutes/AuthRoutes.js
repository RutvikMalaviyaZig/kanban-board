const {express} = require('../../../Provider')
const { verifyAuthMiddleware } = require('../../middlewares/VerfiyAuthMIddleware')

const {
  handleEmailLogin,
  handleMobileLogin,
  handleSignup,
  handleLogout,
  handleGoogleLogin,
} = require("../../controllers/userController/AuthController");
const {handleForgotPassword, handleResetPassword} = require("../../controllers/userController/ForgotController"); 

const router = express.Router();

router.post("/email/login", handleEmailLogin);
router.post("/mobile/login", handleMobileLogin);
router.post("/google", handleGoogleLogin);
router.post("/signup", handleSignup);
router.post("/logout", verifyAuthMiddleware, handleLogout);
router.post('/forgot-password', handleForgotPassword);
router.patch('/reset-password', handleResetPassword);

module.exports = router;
