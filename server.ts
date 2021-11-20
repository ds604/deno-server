import {serve} from 'https://deno.land/std@0.61.0/http/server.ts';
import { parse } from 'https://deno.land/std/flags/mod.ts';
import { Client } from "https://deno.land/x/postgres/mod.ts";

const { args } = Deno
const DEFAULT_PORT = 8000
const argPort = parse(args).port
const port = argPort ? Number(argPort) : DEFAULT_PORT

const config = <string>Deno.env.get('DATABASE_URL');
const client = new Client(config);

const s = serve({port: port})
console.log('http://localhost:' + port)

await client.connect()
for await (const req of s){
	const array_result = await client.queryArray("SELECT * FROM Users;")
	req.respond({ body: `Hello World!\n
${new Date()}\n
foobar!!!!!\n
${JSON.stringify(array_result.rows, null, 2)} `})
}
await client.end()
