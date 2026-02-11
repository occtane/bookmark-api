import { Router } from "express";
import { bookmarkController } from "../controllers/bookmarkController";

const router = Router();

// GET /api/bookmarks
router.get("/", bookmarkController.getAll);

// GET /api/bookmarks/:id
router.get("/:id", bookmarkController.getById);

// POST /api/bookmarks
router.post("/", bookmarkController.create);

// PUT /api/bookmarks/:id
router.put("/:id", bookmarkController.update);

// DELETE /api/bookmarks/:id
router.delete("/:id", bookmarkController.delete);

export default router;
