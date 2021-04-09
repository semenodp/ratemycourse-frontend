export interface Course {
  id: string;
  name: string;
  department: string;
  required: boolean;
  ratings: Rating[];
}

export interface Rating {
  id: string;
  rating: number;
  difficulty: number;
  takeAgain: boolean;
  professor: string;
}
