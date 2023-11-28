import { lucia } from "lucia";
import { postgres as postgresAdapter } from "@lucia-auth/adapter-postgresql";
import { client } from "./db";
import { sveltekit } from "lucia/middleware";

export const auth = lucia({
	adapter: postgresAdapter(client, {
		user: "auth_user",
		key: "user_key",
		session: "user_session"
	}),
	env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
	middleware: sveltekit(),
	getUserAttributes: (data) => {
		return {
			username: data.username
		};
	}
});
