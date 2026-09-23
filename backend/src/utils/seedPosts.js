import Post from '../models/Post.js';
import User from '../models/User.js';

export const DEMO_POSTS = [
  {
    title: 'Dawn Balloons Over Cappadocia',
    excerpt: 'Watch the valley turn gold as hundreds of balloons lift into a quiet Turkish morning.',
    content:
      'Before sunrise, the stone valleys of Cappadocia hold their breath.\n\nThen the burners roar, silk envelopes swell, and the sky fills with color. This is one of travel’s great shared rituals — strangers floating together above fairy chimneys and soft ridges.\n\nStay overnight in a cave hotel, wake early, and let the light do the storytelling.',
    category: 'Trending',
    tags: ['turkey', 'balloons', 'sunrise'],
    coverImage:
      'https://images.unsplash.com/photo-1509339022327-1e1e4533704f?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Kyoto After the Crowds',
    excerpt: 'Temple gardens, alley ramen, and evening lanterns when the day-trippers have gone home.',
    content:
      'Kyoto rewards patience. Visit Gion after dusk, walk the Philosopher’s Path at first light, and linger in smaller shrines where the moss still feels undisturbed.\n\nOrder a simple bowl of noodles, sit without a phone, and listen to the city settle.',
    category: 'Trending',
    tags: ['japan', 'temples', 'night'],
    coverImage:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Coast Road Through Amalfi',
    excerpt: 'Cliffside hairpins, lemon groves, and swims in water the color of bottle glass.',
    content:
      'The Amalfi drive is famous for a reason — but the real pleasure is stopping often.\n\nSwim under the cliffs, drink espresso with your feet dusty from walking, and watch ferries stitch the towns together across the bay.',
    category: 'Trending',
    tags: ['italy', 'coast', 'summer'],
    coverImage:
      'https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'A Quiet Week in Lisbon',
    excerpt: 'Tram lines, miradouros, and pastries still warm from neighborhood bakeries.',
    content:
      'Lisbon is best taken slowly. Ride tram 28 once for the postcard, then walk everywhere else.\n\nClimb to a viewpoint at golden hour, find a tasca with a handwritten menu, and let the city’s hills set your pace.',
    category: 'For You',
    tags: ['portugal', 'city', 'food'],
    coverImage:
      'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Hiking the Scottish Highlands',
    excerpt: 'Mist on the lochs, empty trails, and evenings that smell of peat and rain.',
    content:
      'The Highlands ask for waterproof layers and an open schedule.\n\nPick a glen, follow a path that disappears into cloud, and accept that the weather is part of the story — not a problem to solve.',
    category: 'For You',
    tags: ['scotland', 'hiking', 'nature'],
    coverImage:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Marrakech Courtyard Mornings',
    excerpt: 'Orange blossom tea, tiled riads, and markets that wake before the heat does.',
    content:
      'Start inside a riad courtyard while the city is still soft.\n\nThen step into the Medina with a purpose — spices, ceramics, or simply the pleasure of getting briefly lost and finding your way by minaret and scent.',
    category: 'Most Loved',
    tags: ['morocco', 'markets', 'culture'],
    coverImage:
      'https://images.unsplash.com/photo-1517824806704-9040b0377032?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Patagonia’s Wind and Light',
    excerpt: 'Torres peaks, endless steppe, and photographs that never quite catch the scale.',
    content:
      'Patagonia humbles every packing list. Bring layers, expect wind, and leave room in the day for weather to rearrange your plans.\n\nThe reward is light that moves across granite like a living thing.',
    category: 'Most Loved',
    tags: ['patagonia', 'mountains', 'adventure'],
    coverImage:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80',
  },
];

export const seedDemoPosts = async () => {
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  const admin = await User.findOne({ email: adminEmail, role: 'admin' });
  if (!admin) {
    console.warn('No admin user found — skipping demo post seed');
    return;
  }

  const total = await Post.countDocuments();

  // Only seed when the database has no posts. Never wipe existing blogs on restart.
  if (total > 0) {
    console.log(`Posts already exist (${total}) — skipping demo seed`);
    return;
  }

  for (const post of DEMO_POSTS) {
    await Post.create({
      ...post,
      author: admin._id,
      published: true,
    });
  }

  console.log(`Seeded ${DEMO_POSTS.length} demo blogs`);
};

