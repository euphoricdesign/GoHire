import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';

export default handleAuth({
  async callback(req:any, res:any) {
    try {
      await handleCallback(req, res);
    } catch (error:any) {
      console.error('Detailed error:', error);
      res.status(error.status || 500).end(error.message);
    }
  },
});