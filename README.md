# MangaPlus Downloader

Automatically download the latest chapters of your favorite manga from MangaPlus.

## Features

- Search for manga by name
- Add manga to your personal list
- Automatically download new chapters as `.cbz` files
- Notification via webhook (Discord, etc.)

## Installation

```bash
git clone https://github.com/your-username/node-mangaplus-downloader.git
cd node-mangaplus-downloader
npm install
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
node cli.js search
```

- Search for a manga by name and add it to your list.

### Download new chapters

```bash
node cli.js download
```

- Download the latest chapters for all manga in your list.

## File Structure

- Downloaded manga and chapters are stored in the `mangas/` folder as `.cbz` files.
- Local database is stored in `db.json`.

## Notifications

Each time a new chapter is downloaded, a notification is sent to all configured webhooks.

## Contributing

Pull requests and suggestions are welcome!
