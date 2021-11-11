import {serve} from 'https://deno.land/std@0.61.0/http/server.ts';
import { parse } from 'https://deno.land/std/flags/mod.ts';

const { args } = Deno
const DEFAULT_PORT = 8000
const argPort = parse(args).port
const port = argPort ? Number(argPort) : DEFAULT_PORT
const s = serve({port: port})

console.log('http://localhost:' + port)
for await (const req of s){
	req.respond({ body: `Hello World!\n
			${new Date()}\n
			foobar!!!!!
			`})
}
