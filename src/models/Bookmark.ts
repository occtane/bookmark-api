// FUll Bookmark from the DB
export interface Bookmark {
  id: number;
  url: string;
  title: string;
  description: string | null;
  created_at: Date;
  updated_at: Date;
}

// Interface for creating a Bookmark
export interface CreateBookmarkDTO {
  url: string;
  title: string;
  description?: string;
}

// Interface for updating a Bookmark
export interface UpdateBookmarkDTO {
  url?: string;
  title?: string;
  description?: string;
}
