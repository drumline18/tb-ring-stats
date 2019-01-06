declare interface Window { socket3: SocketIOClient.Socket, tronWeb: any, cmd(config: any): void }

declare interface rollObject {
  round: number;
  hash: string;
  luckyNum: number;
}

declare interface timedRollObject extends rollObject {
  time: number;
}
