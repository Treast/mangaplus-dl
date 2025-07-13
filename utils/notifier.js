export const notify = async (webhook, message) => {
  const body = {
    username: 'MangaPlus Downloader',
    avatar_url: 'https://treast.dev/mangaplus_downloader.png',
    content: message,
  };

  await fetch(webhook, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};
