import app, { ensureDb } from './app.js';

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await ensureDb();

    const server = app.listen(PORT, () => {
      console.log(`API running on http://localhost:${PORT}`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(
          `Port ${PORT} is already in use. Stop the other process, then run npm run dev again.`
        );
      } else {
        console.error('Server error:', err.message);
      }
      process.exit(1);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
};

start();
