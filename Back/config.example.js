export default {
  port: 3000,
  pgConf: {
    user: "postgres",
    host: "localhost",
    port: 5432,
    database: "todos",
    password: "mysecretpassword",
  },
  jwtSecret: "Secret",
  pageSize: 3,
};
