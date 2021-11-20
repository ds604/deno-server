// import {serve} from 'https://deno.land/std@0.61.0/http/server.ts';
// import { parse } from 'https://deno.land/std/flags/mod.ts';
// import { Client } from "https://deno.land/x/postgres/mod.ts";

// const { args } = Deno
// const DEFAULT_PORT = 8000
// const argPort = parse(args).port
// const port = argPort ? Number(argPort) : DEFAULT_PORT

// const config = <string>Deno.env.get('DATABASE_URL');
// const client = new Client(config);

// const s = serve({port: port})
// console.log('http://localhost:' + port)

// await client.connect()
// for await (const req of s){
// 	const array_result = await client.queryArray("SELECT * FROM Users;")
// 	req.respond({ body: `Hello World!\n
// ${new Date()}\n
// foobar!!!!!\n
// ${JSON.stringify(array_result.rows, null, 2)} `})
// }
// await client.end()

import { Pool } from "https://deno.land/x/postgres@v0.11.3/mod.ts";

const DEFAULT_PORT = 8080
const envPort = Deno.env.get("PORT")
const port = envPort ? Number(envPort) : DEFAULT_PORT

if(isNaN(port)){
	console.error("Port is not a number.")
	Deno.exit(1)
}

const listener = Deno.listen({ port })
console.log("http://localhost:" + port)

const POOL_CONNECTIONS = 2
const dbUrl = Deno.env.get("DATABASE_URL")
const dbPool = new Pool(dbUrl, POOL_CONNECTIONS)

for await (const conn of listener){
	(async () => {
		const requests = Deno.serveHttp(conn)
		for await (const { respondWith } of requests){
			const client = await dbPool.connect()
			const result = await client.queryArray("SELECT * FROM Users;")
			await client.release()
			respondWith(new Response(JSON.stringify(result.rows), {headers: {"content-type": "application/json"}}))
		}
	})();
}
