import express from 'express';

export class Server {
  public readonly app: express.Application;
  public readonly port: number;

  constructor(port: number | string) {
    this.port = Number(port);
    this.app = express();
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Listen on port: ${this.port}`);
    });
  }
}
