import Pusher from "pusher-js";
import PusherServer from "pusher";

export const pusher = new PusherServer({
  appId: ,
  key: ,
  secret: ,
  cluster:,
  useTLS: true
});



export const pusherClient = new Pusher(, {
  cluster: ,
  forceTLS: true,
});

