import pool from "../config/database";
import {
  Bookmark,
  CreateBookmarkDTO,
  UpdateBookmarkDTO,
} from "../models/Bookmark";

export const bookmarkRepository = {
  // Gather all bookmarks
  findAll: async (): Promise<Bookmark[]> => {
    const result = await pool.query(
      "SELECT * FROM bookmarks ORDER BY created_at DESC",
    );

    return result.rows;
  },

  // Get one bookmark each ID
  findById: async (id: number): Promise<Bookmark | null> => {
    const result = await pool.query("SELECT * FROM bookmarks WHERE id = $1", [
      id,
    ]);
    return result.rows[0] || null;
  },

  // Create Bookmark
  create: async (data: CreateBookmarkDTO): Promise<Bookmark> => {
    const result = await pool.query(
      `INSERT INTO bookmarks (url, title, description)
        VALUES ($1, $2, $3)
        RETURNING *`,
      [data.url, data.title, data.description || null],
    );
    return result.rows[0];
  },

  // Update bookmarks
  update: async (
    id: number,
    data: UpdateBookmarkDTO,
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

    const result = await pool.query(
      `UPDATE bookmarks SET ${fields.join(", ")} WHERE id = $${paramCount} RETURNING *`,
      values,
    );
    return result.rows[0] || null;
  },

  // Delete bookmark
  delete: async (id: number): Promise<boolean> => {
    const result = await pool.query("DELETE FROM bookmarks WHERE id = $1", [
      id,
    ]);
    return result.rowCount !== null && result.rowCount > 0;
  },
};
