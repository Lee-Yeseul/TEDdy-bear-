import { BookmarkService } from "../services/bookmarkService";

class BookmarkController {
  static async readMy(req, res, next) {
    try {
      const userId = req.currentUserId;
  
      const bookmarks = await BookmarkService.getMyBookmarks(userId);
      if (bookmarks.errorMessage) {
        throw new Error(bookmarks.errorMessage);
      }
  
      res.status(200).send(bookmarks);
    } catch (error) {
      next(error);
    }
  }
  
  static async create(req, res, next) {
    try {
      const userId = req.currentUserId;
      const talkId = Number(req.body.talkId);
  
      const bookmarks = await BookmarkService.addBookmark(userId, talkId);
      if (bookmarks.errorMessage) {
        throw new Error(bookmarks.errorMessage);
      }
  
      res.status(201).send(bookmarks);
    } catch (error) {
      next(error);
    }
  };
  
  static async deleteMy(req, res, next) {
    try {
      const userId = req.currentUserId;
      const talk_id = req.params.talk_id;
  
      const bookmark = await BookmarkService.deleteBookmark(userId, talk_id);
      if (bookmark.errorMessage) {
        throw new Error(bookmark.errorMessage);
      }
  
      res.status(200).send(bookmark);
    } catch (error) {
      next(error);
    }
  };
}


export { BookmarkController };
