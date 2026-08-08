exports.seed = async function (knex) {
  // This seed runs on every deploy (see backend startCommand). Skip re-seeding if
  // products already exist so plain DELETE+INSERT doesn't keep bumping the
  // auto-increment id sequence on every redeploy and orphaning past orders'
  // product_id references. Delete the tables manually first if you ever need
  // to force a full reseed.
  const existingCount = await knex('products').count('id as count').first();
  if (existingCount && Number(existingCount.count) > 0) {
    return;
  }

  const [juices, shots, bowls] = await knex('categories')
    .insert([
      { name: 'Cold-Pressed Juices', slug: 'juices', sort_order: 1 },
      { name: 'Wellness Shots', slug: 'shots', sort_order: 2 },
      { name: 'Smoothie Bowls', slug: 'bowls', sort_order: 3 },
    ])
    .returning('*');

  await knex('products').insert([
    {
      category_id: juices.id,
      name: 'Green Detox',
      slug: 'green-detox',
      description: 'A crisp, vegetable-forward blend for a daily reset.',
      ingredients: 'Spinach, Cucumber, Apple, Ginger, Lemon',
      price: 124,
      image_emoji: '🥬',
      benefit_tag: 'Detox & Energy',
      sort_order: 1,
    },
    {
      category_id: juices.id,
      name: 'Tropical Sunrise',
      slug: 'tropical-sunrise',
      description: 'Sweet, sunny, and packed with vitamin C.',
      ingredients: 'Mango, Pineapple, Orange, Turmeric',
      price: 124,
      image_emoji: '🥭',
      benefit_tag: 'Immunity',
      sort_order: 2,
    },
    {
      category_id: juices.id,
      name: 'Berry Bliss',
      slug: 'berry-bliss',
      description: 'Deep-colored antioxidant blend.',
      ingredients: 'Mixed Berries, Beetroot, Pomegranate',
      price: 186,
      image_emoji: '🫐',
      benefit_tag: 'Antioxidant',
      sort_order: 3,
    },
    {
      category_id: juices.id,
      name: 'Citrus Immunity',
      slug: 'citrus-immunity',
      description: 'A sharp citrus hit to fight off the sniffles.',
      ingredients: 'Orange, Lemon, Amla, Ginger, Honey',
      price: 99,
      image_emoji: '🍊',
      benefit_tag: 'Cold & Flu Defence',
      sort_order: 4,
    },
    {
      category_id: juices.id,
      name: 'Carrot Glow',
      slug: 'carrot-glow',
      description: 'Bright, earthy, and good for skin & eyes.',
      ingredients: 'Apple, Carrot, Beetroot, Amla',
      price: 111,
      image_emoji: '🥕',
      benefit_tag: 'Skin & Vision',
      sort_order: 5,
    },
    {
      category_id: juices.id,
      name: 'Minted Melon Rush',
      slug: 'minted-melon-rush',
      description: 'Our biggest bottle for the hottest Vizag afternoons.',
      ingredients: 'Watermelon, Mint, Lemon',
      price: 275,
      image_emoji: '🍉',
      benefit_tag: 'Hydration',
      sort_order: 6,
    },
    {
      category_id: shots.id,
      name: 'Turmeric Shot',
      slug: 'turmeric-shot',
      description: 'A concentrated 60ml anti-inflammatory shot.',
      ingredients: 'Turmeric, Black Pepper, Lemon',
      price: 38,
      image_emoji: '🫚',
      benefit_tag: 'Anti-inflammatory',
      sort_order: 7,
    },
    {
      category_id: shots.id,
      name: 'Berry Blast Shot',
      slug: 'berry-blast-shot',
      description: 'A concentrated 60ml antioxidant boost.',
      ingredients: 'Mixed Berries, Ginger',
      price: 63,
      image_emoji: '🍇',
      benefit_tag: 'Antioxidant boost',
      sort_order: 8,
    },
    {
      category_id: shots.id,
      name: 'Wellness Shot',
      slug: 'wellness-shot',
      description: 'Our everyday immunity shot.',
      ingredients: 'Ginger, Wheatgrass, Amla',
      price: 25,
      image_emoji: '🌿',
      benefit_tag: 'Daily Immunity',
      sort_order: 9,
    },
  ]);
};