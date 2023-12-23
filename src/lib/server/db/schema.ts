import { relations, type InferSelectModel } from "drizzle-orm";
import { pgTable, text, uuid, timestamp, integer, boolean } from "drizzle-orm/pg-core";

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
	office: text("office").notNull(),
	onDuty: boolean("on_duty").notNull().default(false),
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
