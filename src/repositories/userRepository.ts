import pool from "../config/database";
import { User, RegisterDTO, UserResponse } from "../models/User";

export const userRepository = {
  // Find User by email
  findByEmail: async (email: string): Promise<User | null> => {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0] || null;
  },

  // Find User by ID
  findById: async (id: number): Promise<User | null> => {
    const result = await pool.query("SELECT * FROM users WHERE id = $id", [id]);
    return result.rows[0] || null;
  },

  // Create new User
  create: async (
    data: RegisterDTO & { password_hash: string },
  ): Promise<User> => {
    const result = await pool.query(
      `INSERT INTO users (email, password_hash, name)
        VALUES ($1, $2, $3)
        RETURNING *`,
      [data.email, data.password_hash, data.name],
    );
    return result.rows[0];
  },

  // Return user without password (for Responses)
  toUserResponse: (user: User): UserResponse => {
    const { password_hash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },
};
