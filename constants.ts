import { Question, LogoStyle } from './types';

export const CHIME_SOUND_URL = 'https://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3';
export const WOLF_HOWL_URL = 'https://www.soundjay.com/nature/sounds/wolf-howl-6005.mp3';

export const INITIAL_QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: 'What is the primary "vibe" you want the website to convey to potential VIP clients? (Select all that apply)',
    options: [
      'High-Energy Nightlife (Neon, Dark, Exciting)',
      'Ultra-Exclusive Luxury (Gold, Black, Minimalist, Discreet)',
      'Corporate & Professional (Clean, Blue/Grey, Trustworthy)',
    ],
    selectedOptions: [],
    otherText: '',
  },
  {
    id: 'q2',
    text: 'Which aspect of your services should feature most prominently on the homepage?',
    options: [
      'Nightlife & Party Packages (Bachelor/Bachelorette)',
      'Luxury Transportation (Limos, Jets, Casino Transfers)',
      'Full "Do Anything" Concierge (Golf, Dining, Hotels)',
    ],
    selectedOptions: [],
    otherText: '',
  },
  {
    id: 'q3',
    text: 'How should users contact you for bookings?',
    options: [
      'Direct WhatsApp/Text button for instant response',
      'Detailed Inquiry Form to gather trip specifics',
      'Tiered Package Selection with "Book Now" buttons',
    ],
    selectedOptions: [],
    otherText: '',
  },
  {
    id: 'q4',
    text: 'What visual style appeals to you most for the "Exodus" brand imagery?',
    options: [
      'Real photography of Vegas scenes and happy clients',
      'Abstract, high-end geometric patterns and textures',
      'Dark cinematic videography backgrounds',
    ],
    selectedOptions: [],
    otherText: '',
  },
  {
    id: 'q5',
    text: 'For the "Transportation" section, what is the key selling point?',
    options: [
      'Variety of fleet (Party bus to private jet)',
      'Discretion and Privacy (Unmarked luxury vehicles)',
      '24/7 Availability & Reliability',
    ],
    selectedOptions: [],
    otherText: '',
  },
];

export const LOGO_STYLES: LogoStyle[] = [
  {
    id: 'l1',
    name: 'Neon Noir',
    description: 'Cyberpunk inspired, glowing neon text against black.',
    prompt: 'A logo for a company called "Exodus Vegas". Style: Neon Noir. Glowing cyan and magenta neon typography on a black background, futuristic, cyberpunk vibes, high contrast.',
    heroPrompt: 'Photorealistic wide shot of a futuristic Las Vegas rooftop lounge at night, neon blue and pink lighting, wet surfaces, dark luxury aesthetic, 8k.',
    selected: false,
  },
  {
    id: 'l2',
    name: 'Gatsby Gold',
    description: 'Art Deco, gold foil textures, roaring 20s luxury.',
    prompt: 'A logo for a company called "Exodus Vegas". Style: Art Deco Luxury. Gold metallic foil texture typography, geometric borders, black background, elegant, expensive look.',
    heroPrompt: 'Photorealistic wide shot of a Great Gatsby style grand hall, gold and black art deco geometric patterns, crystal chandeliers, expensive atmosphere, 8k.',
    selected: false,
  },
  {
    id: 'l3',
    name: 'Minimalist Modern',
    description: 'Clean sans-serif, plenty of whitespace, high-fashion feel.',
    prompt: 'A logo for a company called "Exodus Vegas". Style: High-Fashion Minimalist. Thin elegant sans-serif black text on white background, very clean, sophisticated, vogue style.',
    heroPrompt: 'Photorealistic wide shot of a ultra-modern white luxury penthouse interior, floor to ceiling windows overlooking Las Vegas, clean lines, bright, airy, 8k.',
    selected: false,
  },
  {
    id: 'l4',
    name: 'Vegas Vintage',
    description: 'Retro sign style, bulbs, classic 1950s Vegas.',
    prompt: 'A logo for a company called "Exodus Vegas". Style: Vintage Vegas Sign. Retro 1950s typography, lightbulb letters, marquee style, red and yellow colors, nostalgic.',
    heroPrompt: 'Photorealistic wide shot of classic 1950s Las Vegas strip, retro cars, marquee lights, warm nostalgic sunset, cinematic, 8k.',
    selected: false,
  },
  {
    id: 'l5',
    name: 'The Wolf',
    description: 'Aggressive, masculine, bold, sports-team energy.',
    prompt: 'A logo for a company called "Exodus Vegas". Style: Mascot Sports. Bold aggressive typography with a stylized wolf or lion mascot, sharp vectors, masculine colors like silver and navy.',
    heroPrompt: 'Photorealistic wide shot of a high-tech security command center or luxury man-cave, dark blue and silver tones, masculine, sharp edges, 8k.',
    selected: false,
  },
  {
    id: 'l6',
    name: 'Signature Script',
    description: 'Handwritten, personal, exclusive concierge feel.',
    prompt: 'A logo for a company called "Exodus Vegas". Style: Handwritten Signature. flowing elegant white calligraphy on a dark textured background, personal, bespoke service feel.',
    heroPrompt: 'Photorealistic close up of a luxury concierge desk with a handwritten letter, blurred elegant hotel lobby background, warm lighting, bokeh, 8k.',
    selected: false,
  },
  {
    id: 'l7',
    name: 'Corporate Shield',
    description: 'Trustworthy, security-focused, badge or crest style.',
    prompt: 'A logo for a company called "Exodus Vegas". Style: Corporate Crest. A shield or crest emblem, serif typography, navy blue and silver, representing security and trust.',
    heroPrompt: 'Photorealistic wide shot of a modern glass corporate office building in Las Vegas, blue sky, professional, trustworthy, steel and glass texture, 8k.',
    selected: false,
  },
  {
    id: 'l8',
    name: 'Abstract Motion',
    description: 'Lines indicating speed, travel, and movement.',
    prompt: 'A logo for a company called "Exodus Vegas". Style: Abstract Motion. Dynamic lines and swooshes implying speed and movement, modern tech blue and gradient colors.',
    heroPrompt: 'Abstract artistic background of light trails on a highway at night, long exposure, speed, dynamic movement, blue and purple gradients, 8k.',
    selected: false,
  },
  {
    id: 'l9',
    name: 'Casino Royale',
    description: 'Poker chips, playing cards, subtle gambling motifs.',
    prompt: 'A logo for a company called "Exodus Vegas". Style: Casino Royale. Elegant integration of a spade or diamond suit symbol, red and black color scheme, sleek and dangerous.',
    heroPrompt: 'Photorealistic wide shot of a high-stakes private poker room, green felt table, dim lighting, smoke, red and black accents, tense luxury atmosphere, 8k.',
    selected: false,
  },
  {
    id: 'l10',
    name: 'Desert Mirage',
    description: 'Sunset colors, silhouettes of palms/dunes.',
    prompt: 'A logo for a company called "Exodus Vegas". Style: Desert Sunset. Silhouettes of palm trees and dunes, warm gradient orange and purple colors, atmospheric.',
    heroPrompt: 'Photorealistic wide shot of the Nevada desert at sunset, purple and orange sky, silhouette of a luxury oasis resort in distance, atmospheric, 8k.',
    selected: false,
  },
];

export const playChime = () => {
  const audio = new Audio(CHIME_SOUND_URL);
  audio.volume = 0.5;
  audio.play().catch(e => console.log("Audio play failed (user interaction needed first)", e));
};

export const playWolfHowl = () => {
  const audio = new Audio(WOLF_HOWL_URL);
  audio.volume = 0.7;
  audio.play().catch(e => console.log("Wolf audio play failed", e));
};
