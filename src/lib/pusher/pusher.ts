import Pusher from "pusher-js";
import PusherServer from "pusher";

export const pusher = new PusherServer({
  appId: process.env["PUSHER_APP_ID"]!,
  key: process.env["PUSHER_KEY"]!,
  secret: process.env["PUSHER_SECRET"]!,
  cluster: process.env["PUSHER_CLUSTER"]!,
  useTLS: true,
});


export const pusherClient = new Pusher(process.env["NEXT_PUBLIC_PUSHER_KEY"]!, {
  cluster: process.env["NEXT_PUBLIC_PUSHER_CLUSTER"]!,
  forceTLS: true,
});
