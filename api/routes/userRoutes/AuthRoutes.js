const {express} = require('../../utils/Constants')
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

router.post("/email/login", handleEmailLogin); // Login with email and password
router.post("/mobile/login", handleMobileLogin);  // Login with mobile number and password
router.post("/google", handleGoogleLogin);  // Login with google
router.post("/signup", handleSignup); // Signup
router.post("/logout", verifyAuthMiddleware, handleLogout); // Logout
router.post('/forgot-password', handleForgotPassword);  // Forgot password
router.patch('/reset-password', handleResetPassword); // Reset password

module.exports = router;
