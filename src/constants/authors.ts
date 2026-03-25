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
    bio: `Hello! I'm Quan Nguyen, founder of the Skill-Wanderer guild. My greatest passion is to light the way for learners, helping them explore the exciting worlds of technology and business through highly practical e-learning. I truly believe that quality education shapes brighter futures, which is why we offer accessible core learning content—often curated with the help of AI to bring you the best efficiently—completely free of charge.

You can always count on our integrity; we're committed to providing unbiased guidance. That means you won't find any paid advertisements or affiliate marketing from us — just honest support for your learning journey. We love fostering a vibrant and supportive community where we can all share, collaborate, and grow together. We encourage you to embrace your creativity, tackle challenges, and view any failures not as setbacks, but as crucial learning opportunities.

Everything we do is dedicated to this educational mission, and all resources generated from our core operations are reinvested to make a lasting global impact and help cultivate future innovators and entrepreneurs.

Think of us as your dedicated companions on an exciting adventure of discovery. Let's wander and grow together!`,
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
