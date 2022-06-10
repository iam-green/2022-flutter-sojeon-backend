import { Express } from 'express';
import expressLoader from './express';
import routeLoader from './route';

export default async ({ app }: { app: Express }) => {
    await expressLoader(app);
    await routeLoader(app);
};
