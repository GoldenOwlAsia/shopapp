import express from 'express';
const router = express.Router();
import AuthController from './authController';

router.post('/register', (req, res, next) => {
  return AuthController.register(req, res, next);
});

router.post('/login', (req, res, next) => {
  return AuthController.login(req, res, next);
});

router.post('/logout', (req, res, next) => {
  return AuthController.logout(req, res, next);
});

router.post('/forgot-password', (req, res, next) => {
  return AuthController.forgotPassword(req, res, next);
});

router.post('/reset-password', (req, res, next) => {
  return AuthController.resetPassword(req, res, next);
});

router.put('/verify-account', (req, res, next) => {
  return AuthController.verifyAccount(req, res, next);
});

router.put('/refresh-token', (req, res, next) => {
  return AuthController.refreshToken(req, res, next);
});

export default router;
