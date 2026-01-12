// Animal data for the learning app
// Using placeholder image URLs and sound paths
// In production, these would be actual image files in public/images/ and audio files in public/audio/

export const animals = [
  // Farm Animals
  {
    id: 1,
    name: 'Cow',
    category: 'farm',
    image: 'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=400',
    habitat: 'Farm',
    sound: '/audio/cow.mp3',
    facts: 'Cows are gentle farm animals that give us milk.'
  },
  {
    id: 2,
    name: 'Pig',
    category: 'farm',
    image: 'https://images.unsplash.com/photo-1587796817786-0b04febd8d94?w=400',
    habitat: 'Farm',
    sound: '/audio/pig.mp3',
    facts: 'Pigs are smart animals that love to roll in mud.'
  },
  {
    id: 3,
    name: 'Chicken',
    category: 'farm',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400',
    habitat: 'Farm',
    sound: '/audio/chicken.mp3',
    facts: 'Chickens lay eggs and wake us up in the morning.'
  },
  {
    id: 4,
    name: 'Horse',
    category: 'farm',
    image: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=400',
    habitat: 'Farm',
    sound: '/audio/horse.mp3',
    facts: 'Horses are strong and fast animals that people ride.'
  },
  {
    id: 5,
    name: 'Sheep',
    category: 'farm',
    image: 'https://images.unsplash.com/photo-1525248674567-d4d28a4bb3a7?w=400',
    habitat: 'Farm',
    sound: '/audio/sheep.mp3',
    facts: 'Sheep have fluffy wool that keeps them warm.'
  },
  {
    id: 6,
    name: 'Goat',
    category: 'farm',
    image: 'https://images.unsplash.com/photo-1548537149-f3b9805c9d18?w=400',
    habitat: 'Farm',
    sound: '/audio/goat.mp3',
    facts: 'Goats love to climb and eat grass.'
  },
  {
    id: 7,
    name: 'Duck',
    category: 'farm',
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400',
    habitat: 'Farm',
    sound: '/audio/duck.mp3',
    facts: 'Ducks can swim and fly. They quack!'
  },
  {
    id: 8,
    name: 'Rooster',
    category: 'farm',
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400',
    habitat: 'Farm',
    sound: '/audio/rooster.mp3',
    facts: 'Roosters crow loudly to wake everyone up.'
  },
  
  // Wild Animals
  {
    id: 9,
    name: 'Lion',
    category: 'wild',
    image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=400',
    habitat: 'Savanna',
    sound: '/audio/lion.mp3',
    facts: 'Lions are the king of the jungle and roar loudly.'
  },
  {
    id: 10,
    name: 'Elephant',
    category: 'wild',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
    habitat: 'Savanna',
    sound: '/audio/elephant.mp3',
    facts: 'Elephants are the biggest land animals with long trunks.'
  },
  {
    id: 11,
    name: 'Tiger',
    category: 'wild',
    image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=400',
    habitat: 'Jungle',
    sound: '/audio/tiger.mp3',
    facts: 'Tigers have orange fur with black stripes.'
  },
  {
    id: 12,
    name: 'Bear',
    category: 'wild',
    image: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=400',
    habitat: 'Forest',
    sound: '/audio/bear.mp3',
    facts: 'Bears are big and strong. They love honey!'
  },
  {
    id: 13,
    name: 'Monkey',
    category: 'wild',
    image: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=400',
    habitat: 'Jungle',
    sound: '/audio/monkey.mp3',
    facts: 'Monkeys love to swing from trees and play.'
  },
  {
    id: 14,
    name: 'Giraffe',
    category: 'wild',
    image: 'https://images.unsplash.com/photo-1524781289445-ddf8f5695861?w=400',
    habitat: 'Savanna',
    sound: '/audio/giraffe.mp3',
    facts: 'Giraffes have very long necks to reach tall trees.'
  },
  {
    id: 15,
    name: 'Zebra',
    category: 'wild',
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400',
    habitat: 'Savanna',
    sound: '/audio/zebra.mp3',
    facts: 'Zebras have black and white stripes.'
  },
  {
    id: 16,
    name: 'Wolf',
    category: 'wild',
    image: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=400',
    habitat: 'Forest',
    sound: '/audio/wolf.mp3',
    facts: 'Wolves howl at the moon and live in packs.'
  },
  {
    id: 17,
    name: 'Fox',
    category: 'wild',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400',
    habitat: 'Forest',
    sound: '/audio/fox.mp3',
    facts: 'Foxes are clever animals with bushy tails.'
  },
  {
    id: 18,
    name: 'Deer',
    category: 'wild',
    image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=400',
    habitat: 'Forest',
    sound: '/audio/deer.mp3',
    facts: 'Deer have antlers and are very fast runners.'
  },
  {
    id: 19,
    name: 'Rabbit',
    category: 'wild',
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400',
    habitat: 'Forest',
    sound: '/audio/rabbit.mp3',
    facts: 'Rabbits have long ears and love carrots.'
  },
  {
    id: 20,
    name: 'Squirrel',
    category: 'wild',
    image: 'https://images.unsplash.com/photo-1602097775330-32c32e04c9d6?w=400',
    habitat: 'Forest',
    sound: '/audio/squirrel.mp3',
    facts: 'Squirrels collect nuts and climb trees quickly.'
  },
  
  // Ocean Animals
  {
    id: 21,
    name: 'Dolphin',
    category: 'ocean',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400',
    habitat: 'Ocean',
    sound: '/audio/dolphin.mp3',
    facts: 'Dolphins are smart and love to jump out of water.'
  },
  {
    id: 22,
    name: 'Shark',
    category: 'ocean',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400',
    habitat: 'Ocean',
    sound: '/audio/shark.mp3',
    facts: 'Sharks are fast swimmers with sharp teeth.'
  },
  {
    id: 23,
    name: 'Whale',
    category: 'ocean',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
    habitat: 'Ocean',
    sound: '/audio/whale.mp3',
    facts: 'Whales are the biggest animals in the ocean.'
  },
  {
    id: 24,
    name: 'Octopus',
    category: 'ocean',
    image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=400',
    habitat: 'Ocean',
    sound: '/audio/octopus.mp3',
    facts: 'Octopuses have eight arms and are very smart.'
  },
  {
    id: 25,
    name: 'Seal',
    category: 'ocean',
    image: 'https://images.unsplash.com/photo-1594736797933-d0c10df336e2?w=400',
    habitat: 'Ocean',
    sound: '/audio/seal.mp3',
    facts: 'Seals can swim in water and walk on land.'
  },
  {
    id: 26,
    name: 'Seahorse',
    category: 'ocean',
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400',
    habitat: 'Ocean',
    sound: '/audio/seahorse.mp3',
    facts: 'Seahorses swim upright and look like tiny horses.'
  },
  {
    id: 27,
    name: 'Turtle',
    category: 'ocean',
    image: 'https://images.unsplash.com/photo-1601524909168-e1af2c81e0c8?w=400',
    habitat: 'Ocean',
    sound: '/audio/turtle.mp3',
    facts: 'Turtles have hard shells to protect themselves.'
  },
  {
    id: 28,
    name: 'Starfish',
    category: 'ocean',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
    habitat: 'Ocean',
    sound: '/audio/starfish.mp3',
    facts: 'Starfish have five arms and live in the ocean.'
  },
  
  // Pet Animals
  {
    id: 29,
    name: 'Dog',
    category: 'pet',
    image: 'https://images.unsplash.com/photo-1583336663277-620dc1996580?w=400',
    habitat: 'Home',
    sound: '/audio/dog.mp3',
    facts: 'Dogs are loyal friends that love to play.'
  },
  {
    id: 30,
    name: 'Cat',
    category: 'pet',
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400',
    habitat: 'Home',
    sound: '/audio/cat.mp3',
    facts: 'Cats are independent and love to nap in the sun.'
  },
  {
    id: 31,
    name: 'Hamster',
    category: 'pet',
    image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?w=400',
    habitat: 'Home',
    sound: '/audio/hamster.mp3',
    facts: 'Hamsters are small and love to run on wheels.'
  },
  {
    id: 32,
    name: 'Guinea Pig',
    category: 'pet',
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400',
    habitat: 'Home',
    sound: '/audio/guinea-pig.mp3',
    facts: 'Guinea pigs are friendly pets that love to squeak and cuddle.'
  },
  {
    id: 33,
    name: 'Bird',
    category: 'pet',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
    habitat: 'Home',
    sound: '/audio/bird.mp3',
    facts: 'Pet birds can sing beautiful songs.'
  },
  {
    id: 34,
    name: 'Fish',
    category: 'pet',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400',
    habitat: 'Home',
    sound: '/audio/fish.mp3',
    facts: 'Pet fish live in aquariums and swim all day.'
  }
];

// Helper function to get animals by category
export const getAnimalsByCategory = (category) => {
  return animals.filter(animal => animal.category === category);
};

// Helper function to get random animals
export const getRandomAnimals = (count) => {
  const shuffled = [...animals].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Helper function to get animal by id
export const getAnimalById = (id) => {
  return animals.find(animal => animal.id === id);
};