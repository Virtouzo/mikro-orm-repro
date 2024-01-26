import { MikroORM } from "@mikro-orm/sqlite";
import { User } from "./user.entity";

let orm: MikroORM;

beforeAll(async () => {
	orm = await MikroORM.init({
		dbName: "sqlite.db",
		entities: ["dist/**/*.entity.js"],
		entitiesTs: ["src/**/*.entity.ts"],
		debug: ["query", "query-params"],
		allowGlobalContext: true, // only for testing
	});
	await orm.schema.refreshDatabase();
});

afterAll(async () => {
	await orm.close(true);
});

test("basic CRUD example", async () => {
	orm.em.create(User, {
		name: "Parent",
		email: "parent@email.com",
		type: "PARENT",
		id: 1,
	});
	orm.em.create(User, {
		id: 2,
		name: "Children",
		email: "children@email.com",
		type: "CHILDREN",
		belongsToItem: 1,
	});
	await orm.em.flush();
	orm.em.clear();
});
