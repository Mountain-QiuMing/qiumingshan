import {
  SubscribeMessage,
  MessageBody,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EventsService } from './events.service';
import { UsePipes } from '@nestjs/common';
import { ValidationPipe } from '@/core/pipe/validation.pipe';

@UsePipes(new ValidationPipe({ isWs: true }))
@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly eventsService: EventsService) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(socket: Socket) {
    console.log('connected: ' + socket.id);
    const query: any = socket.handshake.query;

    if (query.userId) {
      const users = this.eventsService.addUser({
        socketId: socket.id,
        userId: query.userId,
      });

      console.log(users);
    }
  }

  async handleDisconnect(socket: Socket) {
    console.log('disconnect: ' + socket.id);
    const query: any = socket.handshake.query;

    if (query.userId) {
      this.eventsService.deleteUser(socket.id);
    }
  }

  @SubscribeMessage('publish')
  publish(@MessageBody() body: any, @ConnectedSocket() client: Socket) {
    this.eventsService.publish(client, body);
  }

  @SubscribeMessage('auditResult')
  auditResult(@MessageBody() body: any, @ConnectedSocket() client: Socket) {
    this.eventsService.auditResult(client, body);
  }
}
