import { Router } from 'express';
import portalRoutes from './v1/projectMaterialRequest.portals';

const adminsRoutes = Router();

adminsRoutes.use('/v1', portalRoutes);

export default adminsRoutes;
