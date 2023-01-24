export default interface Token {
  id?: number;
  email: string;
  username?: string;
  role?: string;
  iat?: number;
  exp?: number;
}
