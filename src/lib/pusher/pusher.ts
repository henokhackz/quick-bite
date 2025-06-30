import Pusher from "pusher-js";
import PusherServer from "pusher";

const PUSHER_APP_ID = "1952166";
const PUSHER_APP_KEY = "da3fc34f0f63d9c96112";
const PUSHER_APP_SECRET = "6462241abed3071e8423";
const PUSHER_APP_CLUSTER = "ap2";

export const pusher = new PusherServer({
  appId: PUSHER_APP_ID,
  key: PUSHER_APP_KEY,
  secret: PUSHER_APP_SECRET,
  cluster: PUSHER_APP_CLUSTER,
  useTLS: true
});



export const pusherClient = new Pusher(PUSHER_APP_KEY, {
  cluster: PUSHER_APP_CLUSTER,
  forceTLS: true,
});

