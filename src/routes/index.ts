import Router, { Middleware } from "@koa/router";
import UserService from "../services/user";
import TaskService from "../services/task";
import TaskTemplateService from "../services/task-template";
import NoteService from "../services/note";

const router = new Router();

const user = new UserService();
const task = new TaskService();
const template = new TaskTemplateService();
const note = new NoteService();

// root/health
router.get("", ctx => (ctx.body = "Aye boiz, we are live and healthy 😁"));

// User router
router.post("/users", user.create).get("/users/:id", user.read);

// Task router
router
  .post("/tasks", task.create)
  .get("/tasks/:id", task.read)
  .get("/tasks", task.readByUser)
  .put("/tasks/:id", task.update)
  .get("/tasks/:id/notes", note.readByTask);

// Note router
router.post("/notes", note.create).put("/notes/:id", note.update);
// .get("/notes/:id", note.read)

// Task Templates router
router.post("/task-templates", template.create).get("/task-templates", template.read);

export default function createRoutes(): Middleware {
  return router.routes();
}
