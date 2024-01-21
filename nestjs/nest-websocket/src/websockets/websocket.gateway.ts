import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

@WebSocketGateway()
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  handleConnection(client: Socket): void {
    console.log(`Client connected: ${client.id}`)
  }

  handleDisconnect(client: Socket): void {
    console.log(`Client disconnected: ${client.id}`)
  }

  @SubscribeMessage('msg')
  handleMsg(@ConnectedSocket client: Socket @MessageBody() data: any): void {
    console.log(data)
    client.broadcast.emit('msg', data)
  }
}

