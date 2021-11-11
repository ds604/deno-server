import * as Telegram from 'https://deno.land/x/telegram/mod.ts'

const bot = new Telegram.Bot('1826981536:AAGCnO21xGYIbxg_CkYde_ZcKpjQSMBK0l8')

// bot.start(ctx => {
// 	return ctx.reply('hello world')
// })

// bot.command('test', ctx => {
// 	return ctx.reply('Test')
// })

bot.on('text', ctx => {
	if(ctx.message?.text === "/start"){
		ctx.reply('hello, world!')
	}
})

bot.launch()
