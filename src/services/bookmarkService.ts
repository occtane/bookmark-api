import { bookmarkRepository } from "../repositories/bookmarkRepository";
import {
  Bookmark,
  CreateBookmarkDTO,
  UpdateBookmarkDTO,
} from "../models/Bookmark";

export const bookmarkService = {
  // Gather all bookmarks
  getAllBookmarks: async (): Promise<Bookmark[]> => {
    // TODO: [Feature] Add pagination
    //   - Limit results per page (e.g., 50 bookmarks)
    //   - Accept page number as parameter
    //   - Return total count for frontend pagination

    // TODO: [Feature] Add filtering/search
    //   - Search by title or URL
    //   - Filter by date range

    return await bookmarkRepository.findAll();
  },

  // get bookmark by ID
  getBookmarkById: async (id: number): Promise<Bookmark | null> => {
    return await bookmarkRepository.findById(id);
  },

  // Create new bookmark
  createBookmark: async (data: CreateBookmarkDTO): Promise<Bookmark> => {
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

    return await bookmarkRepository.create(data);
  },

  // Update bookmark
  updateBookmark: async (
    id: number,
    data: UpdateBookmarkDTO,
  ): Promise<Bookmark | null> => {
    // TODO: [Validation] Same validations as create
    //   - URL format if URL is being updated
    //   - Input sanitization

    // Check if bookmark exists
    const existing = await bookmarkRepository.findById(id);
    if (!existing) {
      return null;
    }

    return await bookmarkRepository.update(id, data);
  },

  // Delete bookmark
  deleteBookmark: async (id: number): Promise<boolean> => {
    // TODO: [Feature] Soft delete instead of hard delete
    //   - Add 'deleted_at' column to DB
    //   - Mark as deleted instead of removing
    //   - Allow restore functionality

    return await bookmarkRepository.delete(id);
  },
};
