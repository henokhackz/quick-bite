import Pusher from "pusher-js";
import PusherServer from "pusher";

export const pusher = new PusherServer({
  appId: process.env["PUSHER_APP_ID"]!,
  key: process.env["PUSHER_APP_KEY"]!,
  secret: process.env["PUSHER_APP_SECRET"]!,
  cluster: process.env["PUSHER_APP_CLUSTER"]!,
  useTLS: true,
});


export const pusherClient = new Pusher(process.env["NEXT_PUBLIC_PUSHER_APP_CLUSTER"]!, {
  cluster: process.env["NEXT_PUBLIC_PUSHER_APP_CLUSTER"]!,
  forceTLS: true,
});
