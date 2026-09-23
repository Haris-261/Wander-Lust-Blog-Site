import User from '../models/User.js';

export const seedAdmin = async () => {
  const email = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.warn('ADMIN_EMAIL or ADMIN_PASSWORD missing — skipping admin seed');
    return;
  }

  try {
    const existing = await User.findOne({ email }).select('+password');
    if (existing) {
      existing.role = 'admin';
      existing.password = password;
      await existing.save();
      console.log('Admin account synced from .env:', email);
      return;
    }

    await User.create({
      name: 'Admin',
      email,
      password,
      role: 'admin',
    });
    console.log('Admin account seeded:', email);
  } catch (err) {
    if (err.code === 11000) {
      const user = await User.findOne({ email }).select('+password');
      if (user) {
        user.role = 'admin';
        user.password = password;
        await user.save();
        console.log('Admin account synced after duplicate key:', email);
        return;
      }
    }
    throw err;
  }
};
