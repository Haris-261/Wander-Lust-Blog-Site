import Post from '../models/Post.js';
import User from '../models/User.js';

export const DEMO_POSTS = [
  {
    title: 'Dawn Balloons Over Cappadocia',
    excerpt: 'A practical guide to watching Turkey’s volcanic valleys turn gold beneath a sky full of balloons.',
    content: 'Before sunrise, Cappadocia’s valleys are almost silent. Then burners flare, envelopes rise, and hundreds of balloons drift above the fairy chimneys. Book an operator with strong safety reviews and expect pickup well before dawn.\n\nStay in Göreme for easy access, but save time for the quieter trails around Rose and Red valleys. If you are not flying, the ridge above Love Valley is a beautiful place to watch the launch.\n\nSpring and autumn bring comfortable walking weather. Pack layers—the air is cold before sunrise even when the afternoons are warm.',
    category: 'Trending', tags: ['Turkey', 'Cappadocia', 'Sunrise'],
    coverImage: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1600&q=85',
    imageCaption: 'Hot-air balloons floating above Cappadocia’s fairy chimneys at sunrise, Türkiye.',
  },
  {
    title: 'Kyoto After the Crowds',
    excerpt: 'Temple gardens, alley ramen, and lantern-lit streets for travellers willing to start early and linger late.',
    content: 'Kyoto rewards an unhurried schedule. Walk the Philosopher’s Path at first light, when the canal is still and neighbourhood shutters are only beginning to open.\n\nSpend midday in a smaller temple garden, then return to Gion after the day-trippers leave. Respect private lanes and look for the signs that prohibit photography.\n\nFinish with a bowl of noodles at a counter restaurant. The best memories here often come from quiet intervals rather than a checklist of famous sights.',
    category: 'Trending', tags: ['Japan', 'Kyoto', 'Culture'],
    coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=85',
    imageCaption: 'A traditional Kyoto pagoda framed by spring blossoms.',
  },
  {
    title: 'Coast Road Through Amalfi',
    excerpt: 'Cliffside villages, lemon groves, and swims in water the colour of sea glass.',
    content: 'The Amalfi Coast is famous for its road, but the real pleasure lies in stopping often. Base yourself in one town and use ferries or buses rather than spending the whole trip behind a wheel.\n\nWalk a section of the Path of the Gods in the morning, swim beneath the cliffs after lunch, and leave the busiest piazzas for the quieter lanes above them.\n\nMay, June, September, and early October balance warm water with lighter crowds. Carry cash for small cafés and sturdy shoes for the endless stone steps.',
    category: 'Trending', tags: ['Italy', 'Amalfi Coast', 'Summer'],
    coverImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=85',
    imageCaption: 'Pastel villages meeting the Mediterranean along Italy’s Amalfi Coast.',
  },
  {
    title: 'A Quiet Week in Lisbon',
    excerpt: 'Seven slow days of tiled lanes, hilltop miradouros, and pastries warm from the oven.',
    content: 'Ride tram 28 once for the postcard view, then explore Lisbon on foot. Alfama is loveliest early, while Príncipe Real and Estrela invite long afternoons in gardens and cafés.\n\nMake room for a day across the Tagus and another for Belém. Order pastéis de nata warm, with cinnamon, and try a neighbourhood tasca with a short handwritten menu.\n\nGood shoes matter on the polished hills. Give yourself fewer daily targets and let the viewpoints, music, and changing light set the pace.',
    category: 'For You', tags: ['Portugal', 'Lisbon', 'Food'],
    coverImage: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1600&q=85',
    imageCaption: 'Lisbon’s terracotta rooftops descending toward the Tagus River.',
  },
  {
    title: 'Hiking the Scottish Highlands',
    excerpt: 'A weather-ready guide to misty lochs, open glens, and some of Britain’s wildest footpaths.',
    content: 'The Highlands ask for waterproof layers and a flexible plan. Conditions can change between the car park and the ridge, so check the forecast and carry a paper map as well as a phone.\n\nGlencoe offers dramatic day walks, while quieter routes around Torridon reward travellers with more time. Follow the Scottish Outdoor Access Code and leave gates as you find them.\n\nAt day’s end, a village inn, a hot meal, and boots drying by the door become part of the adventure rather than an afterthought.',
    category: 'For You', tags: ['Scotland', 'Hiking', 'Nature'],
    coverImage: 'https://images.unsplash.com/photo-1506377585622-bedcbb027afc?auto=format&fit=crop&w=1600&q=85',
    imageCaption: 'A winding road through the misty mountains of the Scottish Highlands.',
  },
  {
    title: 'Marrakech Courtyard Mornings',
    excerpt: 'Orange blossom tea, tiled riads, and a thoughtful route through the colour of the medina.',
    content: 'Begin inside a riad courtyard while Marrakech is still soft and cool. Once outside, choose a few landmarks but allow the medina to surprise you between them.\n\nVisit workshops where metal, leather, and wood are shaped by hand. Ask before photographing people, agree prices before accepting help, and treat getting briefly lost as part of the rhythm.\n\nWhen the afternoon heat rises, pause in a shaded garden. Return to Jemaa el-Fnaa near sunset as cooks light their grills and the square changes character.',
    category: 'Most Loved', tags: ['Morocco', 'Marrakech', 'Markets'],
    coverImage: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=1600&q=85',
    imageCaption: 'Warm ochre walls and palms in the heart of Marrakech.',
  },
  {
    title: 'Patagonia’s Wind and Light',
    excerpt: 'Granite towers, enormous skies, and the practical lessons that make a southern trek unforgettable.',
    content: 'Patagonia humbles every packing list. Bring reliable layers, expect strong wind, and leave room for weather to rearrange your plans.\n\nIn Torres del Paine, reserve campsites and transport early. Around El Chaltén, several classic trails begin directly from town, making spontaneous day hikes easier.\n\nThe reward is light moving across granite like a living thing. Slow down at viewpoints, keep distance from wildlife, and carry every scrap back out.',
    category: 'Most Loved', tags: ['Patagonia', 'Trekking', 'Adventure'],
    coverImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=85',
    imageCaption: 'Jagged Patagonian peaks catching the first light of day.',
  },
  {
    title: 'Northern Lights in Iceland',
    excerpt: 'How to plan patient winter nights beneath Iceland’s green and violet skies.',
    content: 'Seeing the aurora is never guaranteed, which is exactly what makes it memorable. Plan several nights, watch cloud cover as closely as solar activity, and move away from town lights.\n\nA rental car offers freedom, but winter roads demand experience. Guided tours are a safer choice when conditions turn icy and often include warm clothing and local forecasts.\n\nBring a tripod, spare batteries, and patience. Put the camera down occasionally—the movement and scale are better experienced with your own eyes.',
    category: 'Trending', tags: ['Iceland', 'Northern Lights', 'Winter'],
    coverImage: 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=1600&q=85',
    imageCaption: 'The aurora borealis sweeping across a clear Icelandic night.',
  },
  {
    title: 'Island Hopping in Greece',
    excerpt: 'A slower Cyclades itinerary balancing whitewashed villages, hidden coves, and ferry days.',
    content: 'The secret to Greek island hopping is choosing fewer islands. Spend at least three nights in each place so ferry schedules do not dictate the whole journey.\n\nPair a lively hub such as Naxos with a smaller island where evenings unfold around one harbour. Book cabins on longer ferries and keep essentials in a day bag.\n\nJune and September offer warm seas and gentler crowds. Eat where the menu follows the day’s catch, and save your best sunsets for the quiet edge of town.',
    category: 'For You', tags: ['Greece', 'Islands', 'Beaches'],
    coverImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=85',
    imageCaption: 'Whitewashed homes overlooking the deep blue Aegean Sea.',
  },
  {
    title: 'Across the Swiss Alps by Train',
    excerpt: 'Panoramic windows, mountain villages, and a rail itinerary where the journey is the destination.',
    content: 'Switzerland’s trains turn travel days into highlights. The routes between Lucerne, Interlaken, Zermatt, and the Engadin pass lakes, glaciers, and villages that deserve more than a photograph through glass.\n\nA rail pass can simplify frequent journeys, but compare it with point-to-point tickets before buying. Reserve panoramic services while leaving space for slower regional trains.\n\nPack a picnic, sit on the side suggested by local staff, and break long routes with an overnight stop. Clear mornings usually bring the sharpest mountain views.',
    category: 'Trending', tags: ['Switzerland', 'Rail Travel', 'Alps'],
    coverImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1600&q=85',
    imageCaption: 'A classic Swiss train threading through an Alpine landscape.',
  },
  {
    title: 'Bali Beyond the Beach Clubs',
    excerpt: 'Rice terraces, water temples, and village stays for a more grounded journey across Bali.',
    content: 'Bali becomes more rewarding when you travel beyond the busiest southern coast. Base yourself near Sidemen or Munduk for cool mornings, rice-field walks, and family-run guesthouses.\n\nDress respectfully at temples, hire local guides where required, and avoid animal attractions that prioritise photos over welfare. Short distances can take longer than expected in traffic.\n\nWake early for popular sites, then spend the afternoon learning to cook, visiting a craft village, or simply watching rain move across the palms.',
    category: 'Trending', tags: ['Indonesia', 'Bali', 'Slow Travel'],
    coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=85',
    imageCaption: 'Layered green rice terraces in Bali’s lush interior.',
  },
  {
    title: 'Safari Days in the Serengeti',
    excerpt: 'Responsible wildlife watching, golden grasslands, and what to expect on your first safari.',
    content: 'A Serengeti day begins before sunrise, when the air is cool and animals are most active. Choose an operator with experienced local guides and clear conservation standards.\n\nThe Great Migration moves throughout the year, so select your region by season rather than assuming every trip includes a river crossing. Wildlife encounters are never staged or guaranteed.\n\nBring binoculars, neutral layers, and curiosity. Listen when the engine stops—the calls, wind, and immense silence are as memorable as the photographs.',
    category: 'Most Loved', tags: ['Tanzania', 'Safari', 'Wildlife'],
    coverImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=85',
    imageCaption: 'A giraffe crossing the golden savannah of East Africa.',
  },
  {
    title: 'Autumn Along Canada’s Cabot Trail',
    excerpt: 'Sea cliffs, fiery forests, and small coastal towns on Cape Breton’s great loop road.',
    content: 'The Cabot Trail curls around northern Cape Breton through forest and above the Gulf of St. Lawrence. Drive clockwise or counter-clockwise, but allow two full days instead of racing the loop.\n\nHike the Skyline Trail near sunset, stop for seafood in harbour towns, and listen for live Celtic music after dark. Fog can arrive quickly along the exposed coast.\n\nLate September into October brings autumn colour, though timing varies each year. Reserve accommodation early and keep a warm layer close at hand.',
    category: 'Trending', tags: ['Canada', 'Road Trip', 'Autumn'],
    coverImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85',
    imageCaption: 'A scenic road cutting through Canada’s autumn wilderness.',
  },
  {
    title: 'A Food Lover’s Weekend in Istanbul',
    excerpt: 'Ferries, breakfast spreads, spice stalls, and the neighbourhood flavours between two continents.',
    content: 'Start with a Turkish breakfast meant for sharing: cheeses, olives, eggs, bread, honey, and endless tea. Then cross the Bosphorus by public ferry for the best-value view in the city.\n\nTaste simit from a busy bakery, seek out regional dishes beyond the tourist centre, and visit the Spice Bazaar without treating it as the only market worth seeing.\n\nThe city is steep, crowded, and generous. Carry a transit card, leave space between meals, and follow the places where locals are waiting for a table.',
    category: 'Trending', tags: ['Türkiye', 'Istanbul', 'Food'],
    coverImage: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1600&q=85',
    imageCaption: 'Istanbul’s historic skyline glowing above the Bosphorus.',
  },
  {
    title: 'Desert Silence in Wadi Rum',
    excerpt: 'Sandstone arches, Bedouin hospitality, and a star-filled night in Jordan’s southern desert.',
    content: 'Wadi Rum feels immense from the first turn off the highway. Travel with a licensed local guide who knows the tracks, water sources, and stories held in the sandstone.\n\nA jeep tour reaches the broad valleys, while a slower walk reveals inscriptions and small shifts in colour. Choose a camp that employs local people and manages waste responsibly.\n\nAfter sunset, temperatures drop quickly. Share tea by the fire, step away from the camp lights, and give your eyes time to adjust to the desert sky.',
    category: 'Most Loved', tags: ['Jordan', 'Wadi Rum', 'Desert'],
    coverImage: 'https://images.unsplash.com/photo-1548786811-dd6e453ccca7?auto=format&fit=crop&w=1600&q=85',
    imageCaption: 'Monumental sandstone formations rising from Jordan’s Wadi Rum desert.',
  },
  {
    title: 'The Lakes and Villages of Slovenia',
    excerpt: 'A compact escape through Alpine lakes, emerald rivers, and storybook towns.',
    content: 'Slovenia makes slow travel easy. Begin at Lake Bohinj for quieter trails, visit Bled early in the morning, and follow the Soča River through its striking green valley.\n\nDistances are short, but mountain roads invite frequent stops. Use public transport where it fits and rent a car only for the more remote valleys.\n\nSpring brings waterfalls and wildflowers; early autumn brings clear trails and harvest menus. Ljubljana is the ideal final stop for riverside evenings and excellent cafés.',
    category: 'Trending', tags: ['Slovenia', 'Lakes', 'Europe'],
    coverImage: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=85',
    imageCaption: 'An Alpine lake surrounded by the green mountains of Slovenia.',
  },
];

export const seedDemoPosts = async () => {
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  const admin = await User.findOne({ email: adminEmail, role: 'admin' });
  if (!admin) {
    console.warn('No admin user found — skipping demo post seed');
    return;
  }

  let created = 0;
  let refreshed = 0;
  for (const data of DEMO_POSTS) {
    const existing = await Post.findOne({ title: data.title });
    if (existing) {
      Object.assign(existing, data, { published: true });
      await existing.save();
      refreshed += 1;
    } else {
      await Post.create({ ...data, author: admin._id, published: true });
      created += 1;
    }
  }

  console.log(`Demo blogs ready: ${created} added, ${refreshed} refreshed`);
};
