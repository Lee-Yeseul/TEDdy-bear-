import { Talk, Comment, Reply, User } from "../db";
import mongoose from "mongoose";

class CommentService {
  static async getComments(talkId) {
    // 강연 _id 조회
    const talk = await Talk.findOneById({ id: talkId, resultType: "POJO"})
    if(!talk) { return { errorMessage: "존재하지 않는 강연입니다." } }
    
    // 영상에 달린 댓글 조회
    const comments = await Comment.findManyByTalkId(talk._id)

    // 결과 반환
    const result = {
      message: "댓글 조회 성공",
      payload: comments
    }
    return result
  }

  static async addComment(talkId, comment, userId) {
    // 강연 _id 조회
    const talk = await Talk.findOneById({ id: talkId, resultType: "POJO" })
    if(!talk) { return { errorMessage: "존재하지 않는 강연입니다." } }
    
    // 사용자 확인
    const user = await User.findById({ userId })
    if(!user) { return { errorMessage: "존재하지 않는 사용자입니다." } }
    
    // 댓글 생성
    const newComment = await Comment.addOne(talk._id, comment, user._id)
    if (!newComment) { return { errorMessage: "댓글 작성 실패" } }
    
    // 결과 반환
    return { message: "댓글 작성 성공", payload: newComment }
  }

  static async addReply(parentCommentId, comment, userId) {
    // 작성자 _id 조회
    const user = await User.findById({ userId })
    if(!user) { return { errorMessage: "존재하지 않는 사용자입니다." } }

    // 부모댓글이 존재하는지 확인
    let parentComment = await Comment.findOneById(parentCommentId)
    if(!parentComment) { return { errorMessage: "존재하지 않는 댓글에 대댓글을 달 수 없습니다." }}

    // 대댓글 생성
    const reply = await Reply.addOne(parentComment._id, comment, user._id)
    if (!reply) { return { errorMessage: "대댓글 작성 실패" } }
    
    // 부모댓글 업데이트
    const updatedComment = await Comment.addReply(parentComment._id, reply._id)
    if (!updatedComment) { return { errorMessage: "댓글에 대댓글 업데이트 실패" } }

    // 결과 반환
    return { message: "대댓글 작성 성공", payload: reply }
  }

  static async deleteComment(comment_id, userId) {
    // 작성자 _id 조회
    const user = await User.findById({ userId })
    if(!user) { return { errorMessage: "존재하지 않는 사용자입니다." } }

    // 유효한 댓글 id인지 확인
    if(!mongoose.isValidObjectId(comment_id)) { return { errorMessage: "유효한 댓글 id가 아닙니다." } }
    
    // 댓글 삭제
    const parentComment = await Comment.deleteOne(comment_id, user._id)
    if(!parentComment) { return { errorMessage: "댓글 삭제 실패" } }

    // 대댓글 삭제
    if(parentComment.reply.length > 0) {
      const result = await Reply.deleteMany({ parentCommentId: comment_id, list_comment_id: parentComment.reply})
      if(result.deletedCount < 1) { return { errorMessage: "댓글에 달린 대댓글 삭제 실패" } }
    }

    // 결과 반환
    return { message: "댓글 삭제 성공" }
  }

  static async deleteReply(comment_id, userId) {
    // 작성자 _id 조회
    const user = await User.findById({ userId })
    if(!user) { return { errorMessage: "존재하지 않는 사용자입니다." } }
    
    // 유효한 댓글 id인지 확인
    if(!mongoose.isValidObjectId(comment_id)) { return { errorMessage: "유효한 댓글 id가 아닙니다." } }

    // 대댓글 삭제
    const deletedReply = await Reply.deleteOne(comment_id, user._id)
    if(!deletedReply) {
      const errorMessage = "대댓글 삭제 실패"
      return { errorMessage }
    }

    // 부모댓글 업데이트
    const result = await Comment.deleteReply(deletedReply.parentCommentId, deletedReply._id)
    if (!result) { return { errorMessage: "부모댓글 업데이트 실패" } }

    // 결과 반환
    return { message: "대댓글 삭제 성공" }
  }
}

export { CommentService };
