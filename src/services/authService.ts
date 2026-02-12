import { userRepository } from "../repositories/userRepository";
import { RegisterDTO, LoginDTO, AuthResponse } from "../models/User";
import { hashPassword, comparePassword, generateToken } from "../utils/auth";

export const authService = {
  // User registration
  register: async (data: RegisterDTO): Promise<AuthResponse> => {
    // Check if email already exists
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error("Email already in use");
    }

    // Hash password
    const password_hash = await hashPassword(data.password);

    // Create user
    const user = await userRepository.create({
      ...data,
      password_hash,
    });

    // Generate Token
    const token = generateToken(user.id);

    return {
      user: userRepository.toUserResponse(user),
      token,
    };
  },

  login: async (data: LoginDTO): Promise<AuthResponse> => {
    // Find user
    const user = await userRepository.findByEmail(data.email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Verify password
    const isValidPassword = await comparePassword(
      data.password,
      user.password_hash,
    );
    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    // Generate Token
    const token = generateToken(user.id);

    return {
      user: userRepository.toUserResponse(user),
      token,
    };
  },
};
