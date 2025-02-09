// TODO: Fix type duplication from schema $infer.Select

export interface User {
  id: number;
  email: string;
  googleId: string;
  name: string;
  bio: string | null;
  refreshToken: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}
