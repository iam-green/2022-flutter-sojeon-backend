import { attachControllers } from '@decorators/express';
import express from 'express';
import { HealthController } from '../controllers/health';

export default async (app: express.Application) => {
    attachControllers(app, [HealthController]);
};