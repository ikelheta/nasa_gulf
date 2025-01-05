import { Router } from 'express';
import portalRoutes from './v1/auth.portals';

const authRoutes = Router();

authRoutes.use('/v1', portalRoutes);

export default authRoutes;
