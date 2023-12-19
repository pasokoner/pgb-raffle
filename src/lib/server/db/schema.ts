import { relations, type InferSelectModel } from "drizzle-orm";
import { pgTable, bigint, varchar, text, uuid, timestamp, integer, boolean } from "drizzle-orm/pg-core";

export const user = pgTable("auth_user", {
	id: varchar("id", {
		length: 15 // change this when using custom user ids
	}).primaryKey(),
	username: varchar("username", { length: 16 }).unique().notNull()
});

export const session = pgTable("user_session", {
	id: varchar("id", {
		length: 128
	}).primaryKey(),
	userId: varchar("user_id", {
		length: 15
	})
		.notNull()
		.references(() => user.id),
	activeExpires: bigint("active_expires", {
		mode: "number"
	}).notNull(),
	idleExpires: bigint("idle_expires", {
		mode: "number"
	}).notNull()
});

export const key = pgTable("user_key", {
	id: varchar("id", {
		length: 255
	}).primaryKey(),
	userId: varchar("user_id", {
		length: 15
	})
		.notNull()
		.references(() => user.id),
	hashedPassword: varchar("hashed_password", {
		length: 255
	})
});

export const departments = pgTable("departments", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: text("name").notNull(),
	purgeDate: timestamp("purge_date", { withTimezone: true }),
	threshold: integer("threshold").notNull().default(1)
});

export const departmentsRelations = relations(departments, ({ many }) => ({
	employees: many(employees)
}));

export const employees = pgTable("employees", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: text("name").notNull(),
	onDuty: boolean("on-duty").notNull().default(false),
	departmentId: uuid("department_id").references(() => departments.id),
	minorPrizeId: uuid("minor_prize_id").references(() => minorPrizes.id, { onDelete: "set null" }),
	majorPrizeId: uuid("major_prize_id").references(() => majorPrizes.id, { onDelete: "set null" })
});

export const employeesRelations = relations(employees, ({ one }) => ({
	department: one(departments, {
		fields: [employees.departmentId],
		references: [departments.id]
	}),
	majorPrize: one(majorPrizes, {
		fields: [employees.majorPrizeId],
		references: [majorPrizes.id]
	}),
	minorPrize: one(minorPrizes, {
		fields: [employees.minorPrizeId],
		references: [minorPrizes.id]
	})
}));

export const minorPrizes = pgTable("minor_prizes", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: text("name").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true }).defaultNow()
});

export const minorPrizesRelations = relations(minorPrizes, ({ many }) => ({
	winners: many(employees)
}));

export const majorPrizes = pgTable("major_prizes", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: text("name").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true }).defaultNow()
});

export const majorPrizesRelations = relations(majorPrizes, ({ many }) => ({
	winners: many(employees)
}));

export type Employees = InferSelectModel<typeof employees>;

export type Departments = InferSelectModel<typeof departments>;
