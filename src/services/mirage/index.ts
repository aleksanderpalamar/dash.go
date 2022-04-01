import { createServer, Factory, Model } from 'miragejs';
import faker from '@withshepherd/faker';

type User = {
  name: string;
  email: string;
  created_at: string;
}

export function makeServer() {
  const server =  createServer({
    models: {
      user: Model.extend<Partial<User>>({})
    },

    factories: {
      user: Factory.extend({
        name(i: number) {
          return `User ${i + 1}`;
        },
        email(i: number) {
          return `${faker.internet.email(`${'user'}`, `${i + 1}`, 'example.com')}`;
        },
        createdAt() {
          return `${faker.date.recent(10).toISOString()}`;
        },
      })
    },

    seeds(server) {
      server.createList('user', 10);
    },    

    routes() {
      this.namespace = 'api';
      this.timing = 750;

      this.get('/users');
      this.post('/users');

      this.namespace = '';
      this.passthrough();
    }
  })

  return server;
}