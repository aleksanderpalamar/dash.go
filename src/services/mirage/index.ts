import { ActiveModelSerializer, createServer, Factory, Model, Response } from "miragejs";
import faker from "@withshepherd/faker";

interface User {
  name: string;
  email: string;
  created_at: string;
}

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },
    models: {
      user: Model.extend<Partial<User>>({}),
    },

    factories: {
      user: Factory.extend({
        name(i: number) {
          return `User ${i + 1}`;
        },
        email(i: number) {
          return `${faker.internet.email(
            `${"user"}`,
            `${i + 1}`,
            "example.com"
          )}`;
        },
        createdAt() {
          return `${faker.date.recent(10).toISOString()}`;
        },
      }),
    },

    seeds(server) {
      server.createList("user", 10);
    },

    routes() {
      this.namespace = "api";
      this.timing = 750;

      this.get("/users", function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;
        
        const total = schema.all("user").length;

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all("user"))
        .users
        .sort((a, b) => a.created_at < b.created_at ? 1 : -1) // sort by created_at
        .slice(pageStart, pageEnd);

        return new Response(
          200, // status code
          {"x-total-count": String(total)}, // headers
          { users } // payload
        ) 
      });

      this.get('/users/:id')
      this.post("/users");

      this.namespace = "";
      this.passthrough();
    },
  });

  return server;
}
