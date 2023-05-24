import express from "express";
import { getUMKM,  RegistUmkm,  LoginUmkm,  LogoutUmkm, UpdateUMKM } from "../controllers/umkm.js";
import { getFarm, RegistFarm, LoginFarm, LogoutFarm, UpdateFarm } from "../controllers/farm.js";


import { tokenRefresh } from "../controllers/refreshTokenForUmkm.js";
import { tokenRefreshFarm } from "../controllers/refreshTokenForFarm.js";
import { verifyTokenForUmkm } from "../middleware/verifyTokenForUmkm.js";
import { verifyTokenForFarm } from "../middleware/verifyTokenForFarm.js";

const router = express.Router();

// Endpoints for User UMKM
router.get('/umkm', verifyTokenForUmkm, getUMKM);
router.post('/regist-umkm', RegistUmkm);
router.post('/login-umkm', LoginUmkm);
router.put('/update-umkm/:id_umkm', UpdateUMKM);
router.get('/token-umkm', tokenRefresh);
router.delete('/logout-umkm', LogoutUmkm);

// Endpoints for User Farm
router.get('/farms', verifyTokenForFarm, getFarm);
router.post('/regist-farms', RegistFarm);
router.post('/login-farms', LoginFarm);
router.put('/update-farms/:id_farm', UpdateFarm);
router.get('/token-farms', tokenRefreshFarm);
router.delete('/logout-farms', LogoutFarm);

export default router;