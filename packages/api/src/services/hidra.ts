import grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import loaderConfig from '../config/grpc';

const hidraDef = protoLoader.loadSync(
  path.resolve(__dirname, '..', 'pb', 'hidra.proto'),
  loaderConfig,
);

const hidra = grpc.loadPackageDefinition(hidraDef);

const hidraClient = new hidra.UserService(
  'localhost:3334',
  grpc.credentials.createInsecure(),
);

export default hidraClient;
