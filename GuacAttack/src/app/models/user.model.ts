import { ContactLink } from './contact-link.model';
import { Skill } from './skill.model';

export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    name?: {
      first?: string,
      last?: string,
    }
    bio?: string;
    skills?: Skill[];
    contactLinks?: ContactLink[];
    thumb64Path?: string;
    thumb64URL?: string;
    thumb128Path?: string;
    thumb128URL?: string;
    thumb256Path?: string;
    thumb256URL?: string;
  }