const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: BROKEN_MINI_BOT,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("@whiskeysockets/baileys");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
	const id = makeid();
	async function BROKEN_MINI_BOT_QR_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let Qr_Code_By_BROKEN_MINI_BOT = BROKEN_MINI_BOT({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			Qr_Code_By_BROKEN_MINI_BOT.ev.on('creds.update', saveCreds)
			Qr_Code_By_BROKEN_MINI_BOT.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(5000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(800);
				   let b64data = Buffer.from(data).toString('base64');
				   let session = await Qr_Code_By_BROKEN_MINI_BOT.sendMessage(Qr_Code_By_BROKEN_MINI_BOT.user.id, { text: 'BROKEN_MINI_BOT~' + b64data });
	
				   let BROKEN_MINI_BOT_TEXT = `
╔════════════════════◇
║『 SESSION CONNECTED』
║ ✨BROKEN_MINI_BOT🔷
║ ✨BROKEN_MINI_BOT OFFICIAL🔷
╚════════════════════╝


---

╔════════════════════◇
║『 YOU'VE CHOSEN BROKEN_MINI_BOT 』
║ -Set the session ID in Heroku:
║ - SESSION_ID: 
╚════════════════════╝
╔════════════════════◇
║ 『••• _V𝗶𝘀𝗶𝘁 𝗙𝗼𝗿_H𝗲𝗹𝗽 •••』
║❍ 𝐘𝐨𝐮𝐭𝐮𝐛𝐞: youtube.com/@shahbzeditx786
║❍ 𝐎𝐰𝐧𝐞𝐫: 923203734432
║❍ 𝐑𝐞𝐩𝐨: https://github.com/shahbaz804/Minibot.git 
║❍ 𝐖𝐚𝐆𝗿𝐨𝐮𝐩: https://chat.whatsapp.com/FOWjKXxippQ5IKSv9uok4J?s=cl&p=a&mlu=4&ilr=4
║❍ 𝐖𝐚𝐂𝐡𝐚𝐧𝐧𝐞𝐥: https://whatsapp.com/channel/0029VbDMOp3LSmbkHSqjPR1L
║❍ 𝐈𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦: _https://www.instagram.com/shahbazbroken7
║ ☬ ☬ ☬ ☬
╚═════════════════════╝
𒂀 Enjoy BROKEN_MINI_BOT


---

Don't Forget To Give Star⭐ To My Repo
______________________________`;
	 await Qr_Code_By_BROKEN_MINI_BOT.sendMessage(Qr_Code_By_BROKEN_MINI_BOTuser.id,{text:BROKEN_MINI_BOT_TEXT},{quoted:session})



					await delay(100);
					await Qr_Code_By_BROKEN_MINI_BOT.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					BROKEN_MINI_BOT_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service is Currently Unavailable"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await BROKEN_MINI_BOT_QR_CODE()
});
module.exports = router
