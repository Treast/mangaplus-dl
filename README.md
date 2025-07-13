# MangaPlus Downloader

Automatically download the latest chapters of your favorite manga from MangaPlus.

## Features

- Search for manga by name
- Add manga to your personal list
- Automatically download new chapters as `.cbz` files
- Notification via webhook (Discord, etc.)

## Installation

```bash
npm install -g mangaplus-dl
```

Or directly use `npx`

```bash
npx mangaplus-dl
```

## Configuration

1. Add your notification webhooks in `config.json`:

```json
{
  "notifiers": ["https://discordapp.com/api/webhooks/...."]
}
```

2. (Optional) Edit the supported languages list in `config.json`.

## Usage

### Search and add a manga

```bash
mangaplus-dl search
```

- Search for a manga by name and add it to your list.

### Download new chapters

```bash
mangaplus-dl download
```

- Download the latest chapters for all manga in your list.

## Automation with Cron (Linux)

You can automate chapter downloads using a cron job.  
For example, to check for new chapters every day at 8am:

```bash
0 8 * * * mangaplus-dl download
```

Add this line to your crontab with `crontab -e`.  
Make sure `mangaplus-dl` is installed globally and available in your PATH.

## File Structure

- Downloaded manga and chapters are stored as `.cbz` files in :
  - Windows : `%APPDATA%\mangaplus-dl-nodejs\Data`
  - macOS : `~/Library/Application Support/mangaplus-dl-nodejs`
  - Linux : `~/.local/share/mangaplus-dl-nodejs`
- Local database and config are stored in :
  - Windows : `%APPDATA%\mangaplus-dl-nodejs\Config`
  - macOS : `~/Library/Preferences/mangaplus-dl-nodejs`
  - Linux : `~/.config/mangaplus-dl-nodejs`

## Notifications

Each time a new chapter is downloaded, a notification is sent to all configured webhooks.

## Contributing

Pull requests and suggestions are welcome!

---

**License:** MIT
