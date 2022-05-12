import mongoose from 'mongoose';
import { User } from './models/User';
import { Data } from './models/Data';
import { Talk } from './models/Talk';
import { Topic } from './models/Topic';
import { MailTTL } from './models/MailTTL';
import { SomTTL } from './models/SomTTL';
import { ViewHistory } from './models/ViewHistory';
import { Like } from './models/Like';
import { Bookmark } from './models/Bookmark';
import { Comment } from './models/Comment';
import { Reply } from './models/Reply';
import { TopicPriority } from './models/TopicPriority';

const DB_URL =
  process.env.MONGODB_URL ||
  "MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.ts 파일을 확인해 주세요.";

mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on("connected", () =>
  console.log("정상적으로 MongoDB 서버에 연결되었습니다.  " + DB_URL)
);
db.on("error", (error) =>
  console.error("MongoDB 연결에 실패하였습니다...\n" + DB_URL + "\n" + error)
);

export {
  User,
  Data,
  Talk,
  Topic,
  ViewHistory,
  Bookmark,
  Comment,
  Reply,
  MailTTL,
  SomTTL,
  Like,
  TopicPriority,
};
