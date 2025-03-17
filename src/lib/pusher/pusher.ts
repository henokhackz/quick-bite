import Pusher from "pusher-js";
import PusherServer from "pusher";

export const pusher = new PusherServer({
  appId:'1952166' ,
  key:'da3fc34f0f63d9c96112' ,
  secret: '6462241abed3071e8423',
  cluster: 'ap2',
  useTLS: true
});



export const pusherClient = new Pusher('da3fc34f0f63d9c96112', {
  cluster: 'ap2',
  forceTLS: true,
});

