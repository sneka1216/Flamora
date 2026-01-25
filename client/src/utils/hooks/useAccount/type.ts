export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  isGuest: boolean;
};

export type registerUser = {
  name: string;
  email: string;
  password: string;
};

export type login = {
  email: string;
  password: string;
};
