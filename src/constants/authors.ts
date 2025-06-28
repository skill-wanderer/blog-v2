export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

export const AUTHORS: Record<string, Author> = {
  'quan-nguyen': {
    id: 'quan-nguyen',
    name: 'Quan Nguyen',
    bio: `Hello! I'm Quan Nguyen. My greatest passion is to light the way for learners like you, helping you explore the exciting worlds of technology and business through highly practical e-learning. I truly believe that quality education shapes brighter futures, which is why I offer accessible core learning content—often curated with the help of AI to bring you the best efficiently—completely free of charge.

You can always count on my integrity; I'm committed to providing unbiased guidance. That means you won't find any paid advertisements or affiliate marketing from me  – just honest support for your learning journey. I love fostering a vibrant and supportive community where we can all share, collaborate, and grow together. I encourage you to embrace your creativity, tackle challenges, and view any failures not as setbacks, but as crucial learning opportunities.

Everything I am is dedicated to this educational mission, and all resources generated from my core operations are reinvested to make a lasting global impact and help cultivate future innovators and entrepreneurs.

Think of me as your dedicated companion on an exciting adventure of discovery. Let's wander and grow together!`,
    avatar: '/images/authors/skill-wanderer-avatar.jpg',
    social: {
      linkedin: '/quan-nguyen-skill-wanderer',
      github: 'skill-wanderer',
      website: 'https://skill-wanderer.com',
    },
  },
};

export function getAuthor(id: string): Author | undefined {
  return AUTHORS[id];
}

export const AUTHOR_IDS = Object.keys(AUTHORS) as [string, ...string[]];
