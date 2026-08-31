export interface CareerItem {
  id: string;
  title: string;
  location: string;
  type: string;
  about: string;
  compensation?: {
    structure: string;
    phases: { name: string; details: string[] }[];
  };
  responsibilities?: {
    category: string;
    items: string[];
  }[];
  requirements?: {
    title: string;
    description: string;
  }[];
  howToApply?: {
    instruction: string;
    email: string;
    prompt: string;
  };
}

const careers: CareerItem[] = [];

export default careers;