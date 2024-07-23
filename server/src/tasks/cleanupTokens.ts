import cron from 'node-cron';
import Token from '../models/Token';

// Run a cron job every day at midnight to remove expired tokens
cron.schedule('0 0 * * *', async () => {
  try {
    await Token.deleteMany({ expiresAt: { $lte: new Date() } });
    console.log('Expired tokens cleaned up');
  } catch (err) {
    console.error('Error cleaning up expired tokens', err);
  }
});
