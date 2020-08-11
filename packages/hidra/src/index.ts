import grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import './database';
import implementation from './implementations';

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, 'pb', 'messages.proto'),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  },
);

const proto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server();
server.addService(proto.UserService.service, implementation);
server.bind('127.0.0.1:3334', grpc.ServerCredentials.createInsecure());
server.start();
