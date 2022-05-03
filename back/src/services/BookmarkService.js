import { Bookmark, Talk, User } from "../db";

class BookmarkService {
  static async getMyBookmarks(userId) {
    const bookmarks = await Bookmark.findManyByUserId(userId)
    
    if(bookmarks.length === 0) {
      const errorMessage = "북마크가 존재하지 않습니다."
      return { errorMessage }
    }

    const result = {
      length: bookmarks.length,
      bookmarks: bookmarks.reduce((pre, item) => {
        pre.push({ bookmark_id: item._id, talk: item.talk_id })
        return pre
      }, [])
    }

    return result
  }

  static async addBookmark(userId, talkId) {
    const talk = await Talk.findOneById({ id: talkId })
    if(!talk) {
      const errorMessage = "존재하지 않는 강연입니다."
      return { errorMessage }
    }

    const preBookmark = await Bookmark.findOne(userId, talk._id)
    if (preBookmark) {
      const errorMessage = "이미 저장한 북마크 입니다."
      return { errorMessage }
    }

    const newBookmark = await Bookmark.addOne(userId, talk._id)
    if(!newBookmark) {
      const errorMessage = "북마크 추가 실패"
      return { errorMessage }
    }

    return { message: "북마크 추가 성공", bookmarkId: newBookmark._id }
  }

  static async deleteBookmark(userId, bookmark_id) {
    const myBookmark = await Bookmark.deleteOne(userId, bookmark_id)
    if(myBookmark.deletedCount != 1) {
      const errorMessage = "북마크 삭제 실패"
      return { errorMessage }
    }

    return { message: "북마크 삭제 성공" }
  }
}

export { BookmarkService };
