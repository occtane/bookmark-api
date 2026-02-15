import pool from "../config/database";
import {
  Bookmark,
  CreateBookmarkDTO,
  UpdateBookmarkDTO,
} from "../models/Bookmark";

export const bookmarkRepository = {
  // Gather all bookmarks from user
  findAll: async (userId: number): Promise<Bookmark[]> => {
    const result = await pool.query(
      "SELECT * FROM bookmarks WHERE user_id = $1 ORDER BY created_at DESC",
      [userId],
    );
    return result.rows;
  },

  // Get each bookmark from ID only if its from the user
  findById: async (id: number, userId: number): Promise<Bookmark | null> => {
    const result = await pool.query(
      "SELECT * FROM bookmarks WHERE id = $1 AND user_id = $2",
      [id, userId],
    );
    return result.rows[0] || null;
  },

  // Create bookmark with userId
  create: async (
    data: CreateBookmarkDTO,
    userId: number,
  ): Promise<Bookmark> => {
    const result = await pool.query(
      `INSERT INTO bookmarks (url, title, description, user_id) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [data.url, data.title, data.description || null, userId],
    );
    return result.rows[0];
  },

  // Update bookmarks only if its from user
  update: async (
    id: number,
    data: UpdateBookmarkDTO,
    userId: number,
  ): Promise<Bookmark | null> => {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.url !== undefined) {
      fields.push(`url = $${paramCount++}`);
      values.push(data.url);
    }
    if (data.title !== undefined) {
      fields.push(`title = $${paramCount++}`);
      values.push(data.title);
    }
    if (data.description !== undefined) {
      fields.push(`description = $${paramCount++}`);
      values.push(data.description);
    }

    if (fields.length === 0) return null;

    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);
    values.push(userId);

    const result = await pool.query(
      `UPDATE bookmarks 
       SET ${fields.join(", ")} 
       WHERE id = $${paramCount} AND user_id = $${paramCount + 1} 
       RETURNING *`,
      values,
    );
    return result.rows[0] || null;
  },

  // Only delete Bookmarks if its from user
  delete: async (id: number, userId: number): Promise<boolean> => {
    const result = await pool.query(
      "DELETE FROM bookmarks WHERE id = $1 AND user_id = $2",
      [id, userId],
    );
    return result.rowCount !== null && result.rowCount > 0;
  },
};
