# Don't be lazy, make sure you read the credits and license. Thanks!
Don’t be lazy. Follow all the steps, or you’ll end up in a loop of frustration and stupidity. READ the credits and license before you embarrass yourself. Thanks!
This version is more detailed, assertive, and comes with a generous amount of "motivation" for those who might be tempted to skim over important steps.

## Credits

Pay attention here because **this is the part you must read**. These contributors did way more work than you:
- [winsnip (GitHub)](https://github.com/winsnip) | [Telegram](https://t.me/winsnip)
- [Solana0x (GitHub)](https://github.com/Solana0x) | [Phantom](https://discord.com/users/979641024215416842)
- [Galkurta (GitHub)](https://github.com/Galkurta) | [Telegram](https://t.me/galkurtarchive)
- **Zixine** for keeping things interesting.

And if you even think about skipping the **README** and **LICENSE**, you better start looking for a new career. It’s all in the folder. **READ IT.**

### Big Respect to the Original Creators

This project is built on the hard work and contributions of the following repositories. **If you’re going to use this, the least you can do is show some respect**:
- [Solana0x / Query_Id](https://github.com/Solana0x/Query_Id.git)
- [Solana0x / NotPixel](https://github.com/Solana0x/NotPixel)
- [winsnip / Moonbix](https://github.com/winsnip/moonbix.git)
- [Galkurta / Blum-BOT](https://github.com/Galkurta/Blum-BOT.git)
- [Galkurta / Tsubasa-BOT](https://github.com/Galkurta/Tsubasa-BOT.git)
- [Galkurta / Cats-BOT](https://github.com/Galkurta/Cats-BOT.git)
- [Galkurta / FreeDog-BOT](https://github.com/Galkurta/FreeDog-BOT.git)
- [Galkurta / BabyDoge-BOT](https://github.com/Galkurta/BabyDoge-BOT.git)
- [Galkurta / Nomis-BOT](https://github.com/Galkurta/Nomis-BOT.git)
- [Galkurta / Fintopio-BOT](https://github.com/Galkurta/Fintopio-BOT.git)
- [Galkurta / Major-BOT](https://github.com/Galkurta/Major-BOT)
- [Galkurta / Coinsweeper-BOT](https://github.com/Galkurta/Coinsweeper-BOT)
- [Galkurta / Coub-BOT](https://github.com/Galkurta/Coub-BOT)
- [Galkurta / Clayton-BOT](https://github.com/Galkurta/Clayton-BOT)

So, **don't be that guy** who takes without credit. Go check out their repositories!

# Abracadabra Bot

This bot project allows you to interact with Telegram bots, manage sessions, and retrieve WebView data for all your accounts. **Now, before you even think about skipping anything, stop being lazy and read through this carefully!** Trust me, you’ll thank me later—especially if you’re one of those sellers who never reads documentation and keeps asking dumb questions.

## Installation

1. Clone the repository. Yes, that means **use Git** like a normal human:
    ```bash
    git clone https://github.com/naufalprtm/abracadabra.git
    ```
2. Navigate into the project directory. It's not that hard:
    ```bash
    cd abracadabra
    ```
3. Install the required dependencies. Again, **don’t be lazy**:
    ```bash
    npm install
    ```

## Configuration

1. Set up your `.env` file **properly** (yeah, I’m talking to you who never bothers to follow instructions):
    - Rename `example.env` to `.env`—it’s literally just renaming a file.
    - Put in your **actual** API credentials. If you don’t know where to find them, **Google it** like everyone else:
      ```env
      # For Major Bot
      # TELEGRAM_BOT_TOKEN=your_bot_token
      # AUTHORIZED_USERS=your_telegram_id
      # 
      API_ID=your_api_telegram
      API_HASH=your_api_hash_telegram
      ```

2. To get your `API_ID` and `API_HASH`, you need to visit [**my.telegram.org/auth**](https://my.telegram.org/auth). Log in with your Telegram account and follow the instructions to generate these keys. **Yes, you actually have to do this** if you want the bot to work. No shortcuts here, buddy.

3. Optional, but let’s be honest, you probably need it: Set up a proxy. 
   - Make a `proxy.txt` file, **don’t whine if you can’t find the path**. Manually set it if needed.

## Usage

## Instructions for the Lazy

If you're still not sure what to do, let me explain it briefly:
- **Run `node KAMU-DIAM.js`**:
  1. Choose **Option 1** (recommended if there’s no session file in the `sessions` folder).
  2. Choose **Option 2** for those who completed step 1. This allows you to skip logging in again, even if your computer crashes, gets stolen, or hit by a storm.
  3. Choose **Option 3** after doing **Option 1** once. If issues arise, delete the file and folder, then repeat **Option 1**.
  
  Once you're done, go outside and touch some grass.  
  **Never accidentally press 4!** It'll restart everything. Instead, just open a new terminal, because sometimes you need a fresh query ID.

1. Now you can **finally** run the bot, but don’t mess this up:
    ```bash
    node KAMU-DIAM.js
    ```

2. Follow the instructions on the screen like a **normal, functioning** person:
    - **Option 1:** Login with your phone number (no, your brain isn’t enough, it needs a phone number). If you’ve done this already, **don’t be an idiot** and skip to the next step.
    - **Option 2:** Login with a session file if you actually know what that means. Otherwise, skip this too.
    - **Option 3:** Request WebView for all accounts. Yes, **all of them**. If you think you can’t handle it, maybe reconsider your life choices.
    - **Option 5:** Refresh the Query ID for a selected bot. If you let it expire, you deserve this.

## Main Menu
Choose an option:
1) Install dependencies
2) Start all bots
3) Check logs
4) Stop all bots
5) Exit

## Bot List

Here are the **approved** bots for you to use. **Don’t be clever** and try others unless you like wasting time:
- `@notpixel`
- `@blumCryptobot`
- `@Binance_Moonbix_bot`
- `@TsubasaRivalsBot`
- `@theFreeDogs_bot`
- `@BabyDogePAWS_Bot`
- `@NomisAppBot`
- `@fintopio`
- `@major`
- `@BybitCoinsweeper_Bot`
- `@claytoncoinbot`
- `@coub`
### (~~Remove~~)
- `@cats`but you can add manually to botlist.txt + url.txt, cats.js still there in `"archive"`

You can also find the list in the `bot_list.txt` file, because **some people need everything spoon-fed**.

## Referral URL

- If you’re into referral schemes, update `url.txt` with your referral links. If you're **too lazy to set it up?**, then just ignore it. 

## Final Execution
## New Terminal
Alright, once you’ve done **everything** above (no skipping!), here’s your last command to run:
```
    chmod +x SilakanPaduka.sh
    ./SilakanPaduka.sh
```
Bad interpreter?
```
    dos2unix SilakanPaduka.sh.x
```
### For screen usage: To detach from the running bot, use Ctrl + A, D not Ctrl + C; that will just terminate the bot, and we don’t want that!
This should be well-structured and clear!

### (~~Coffee? Just kidding~~) I need Surya.
### EVM
```
    0x10AfD127417224dc107fabFCEEd9567fcD5B70cC
```
![Logo](./logo.jpg)