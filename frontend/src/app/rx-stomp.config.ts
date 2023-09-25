
import { RxStompConfig } from '@stomp/rx-stomp';

export const myRxStompConfig: RxStompConfig = {

  brokerURL: `ws://localhost:8080/chat`,

  // connectHeaders: {
  //   login: 'guest',
  //   passcode: 'guest'
  // },

  heartbeatIncoming: 0,

  heartbeatOutgoing: 20000,

  reconnectDelay: 200,

  debug: (msg: string): void => {
    console.log(new Date(), msg);
  }
};
