A Discord Bot Project I made (still is) to cope with my disability to make a properly working project on scratch without having it fighting with user inputs lol

75% of the Projects Structure and code was initially inspired by [Under CTRL](https://github.com/notunderctrl) **[Discord.js v14 Tutorial](https://youtube.com/playlist?list=PLpmb-7WxPhe0ZVpH9pxT5MtC4heqej8Es)**.

## Setup in VS Code (Template for your bot only)
Note: I assume you already have `node.js`, `discord.js`, and `nodemon` installed, also an Discord bot to test out lol. To use this with your Bot:
1. Install `dotenv` and make a `.env` file:
```
npm install dotenv
```
2. In [Discord Developer Portal](https://discord.com/developers/applications), select your bot and go to `Bot` section and copy the Bot Token and paste it on the `TOKEN` in `.env`:
![image](https://github.com/NIDIABUG/AVSNUKE/assets/75107428/16f5ac31-4ba3-417c-a995-8ca55f39f6d8)
![image](https://github.com/NIDIABUG/AVSNUKE/assets/75107428/0ee2f385-3a53-4b0d-8755-712272d6e92e)
3. To find the `GUILD_ID` go to Server where your bot is located, right click the Server Icon, and `Copy Server ID`:

![image](https://github.com/NIDIABUG/AVSNUKE/assets/75107428/f8bec761-42b6-44ff-a44b-3f3083f902a5)

4. Do the same with `CLIENT_ID`, right click the Bot in Discord and 'Copy User ID':

![image](https://github.com/NIDIABUG/AVSNUKE/assets/75107428/4fa46ef8-b51f-4cea-819f-da2f9fbc181c)
![image](https://github.com/NIDIABUG/AVSNUKE/assets/75107428/cab61967-c09f-4f47-b63a-fbaaff7e2b39)
```
# .env content
TOKEN     = # Bot Token
GUILD_ID  = # Server ID
CLIENT_ID = # Bot ID
```
5. Run:
```
nodemon
```
