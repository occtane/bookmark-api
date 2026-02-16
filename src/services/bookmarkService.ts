import { bookmarkRepository } from "../repositories/bookmarkRepository";
import {
  Bookmark,
  CreateBookmarkDTO,
  UpdateBookmarkDTO,
} from "../models/Bookmark";

export const bookmarkService = {
  getAllBookmarks: async (userId: number): Promise<Bookmark[]> => {
    // TODO: [Feature] Add pagination
    //   - Limit results per page (e.g., 50 bookmarks)
    //   - Accept page number as parameter
    //   - Return total count for frontend pagination

    // TODO: [Feature] Add filtering/search
    //   - Search by title or URL
    //   - Filter by date range

    return await bookmarkRepository.findAll(userId);
  },

  getBookmarkById: async (
    id: number,
    userId: number,
  ): Promise<Bookmark | null> => {
    return await bookmarkRepository.findById(id, userId);
  },

  createBookmark: async (
    data: CreateBookmarkDTO,
    userId: number,
  ): Promise<Bookmark> => {
    // TODO: [Validation] URL format validation
    //   - Check if URL is valid (https://, http://)
    //   - Use validator library or regex
    //   - Throw error if invalid

    // TODO: [Validation] Input sanitization
    //   - Trim whitespace from title and description
    //   - Prevent XSS attacks

    // TODO: [Feature] Auto-fetch metadata
    //   - If title not provided, scrape from URL
    //   - Extract description/favicon
    //   - Use cheerio or puppeteer

    // TODO: [Business Rule] Check for duplicates
    //   - Prevent same URL being bookmarked twice
    //   - Maybe allow if in different collections (Phase 2)

    return await bookmarkRepository.create(data, userId);
  },

  updateBookmark: async (
    id: number,
    data: UpdateBookmarkDTO,
    userId: number,
  ): Promise<Bookmark | null> => {
    // TODO: [Validation] Same validations as create
    //   - URL format if URL is being updated
    //   - Input sanitization

    const existing = await bookmarkRepository.findById(id, userId);
    if (!existing) {
      return null;
    }

    return await bookmarkRepository.update(id, data, userId);
  },

  deleteBookmark: async (id: number, userId: number): Promise<boolean> => {
    // TODO: [Feature] Soft delete instead of hard delete
    //   - Add 'deleted_at' column to DB
    //   - Mark as deleted instead of removing
    //   - Allow restore functionality

    return await bookmarkRepository.delete(id, userId);
  },
};
