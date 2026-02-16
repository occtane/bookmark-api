import { Router } from "express";
import { bookmarkController } from "../controllers/bookmarkController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// All routes are now protected
router.use(authMiddleware);

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
