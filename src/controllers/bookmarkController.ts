import { Request, Response } from "express";
import { bookmarkService } from "../services/bookmarkService";
import { CreateBookmarkDTO, UpdateBookmarkDTO } from "../models/Bookmark";

export const bookmarkController = {
  // GET /api/bookmarks - All own bookmarks
  getAll: async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.userId!;
      const bookmarks = await bookmarkService.getAllBookmarks(userId);
      res.status(200).json(bookmarks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch bookmarks" });
    }
  },

  // GET /api/bookmarks/:id - Own bookmark
  getById: async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.userId!;
      const id = parseInt(req.params.id);
      const bookmark = await bookmarkService.getBookmarkById(id, userId);

      if (!bookmark) {
        res.status(404).json({ error: "Bookmark not found" });
        return;
      }

      res.status(200).json(bookmark);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch bookmark" });
    }
  },

  // POST /api/bookmarks - Create new bookmark
  create: async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.userId!;
      const data: CreateBookmarkDTO = req.body;

      // Basic Validation
      if (!data.url || !data.title) {
        res.status(400).json({ error: "URL and title are required" });
        return;
      }

      const bookmark = await bookmarkService.createBookmark(data, userId);
      res.status(201).json(bookmark);
    } catch (error) {
      res.status(500).json({ error: "Failed to create bookmark" });
    }
  },

  // PUT /api/bookmarks/:id - Update own bookmark
  update: async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.userId!;
      const id = parseInt(req.params.id);
      const data: UpdateBookmarkDTO = req.body;

      const bookmark = await bookmarkService.updateBookmark(id, data, userId);

      if (!bookmark) {
        res.status(404).json({ error: "Bookmark not found" });
        return;
      }

      res.status(200).json(bookmark);
    } catch (error) {
      res.status(500).json({ error: "Failed to update bookmark" });
    }
  },

  // DELETE /api/bookmarks/:id - Delete own bookmark
  delete: async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.userId!;
      const id = parseInt(req.params.id);
      const success = await bookmarkService.deleteBookmark(id, userId);

      if (!success) {
        res.status(404).json({ error: "Bookmark not found" });
        return;
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete bookmark" });
    }
  },
};
