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
    skills?: any[];
    contactLinks?: any[];
  }