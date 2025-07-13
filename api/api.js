import path from 'path';
import protobuf from 'protobufjs';

class Api {
  async getAll() {
    const res = await this.fetchProto('https://jumpg-webapi.tokyo-cdn.com/api/title_list/allV2');
    return res.success.allTitlesViewV2.allTitlesGroup.flatMap((group) =>
      group.titles.map((manga) => {
        return {
          id: manga.titleId,
          name: manga.name,
          lang: this.getLanguage(manga.language),
        };
      })
    );
  }

  async getChapters(manga) {
    const res = await this.fetchProto(`https://jumpg-webapi.tokyo-cdn.com/api/title_detailV3?title_id=${manga.id}`);
    const data = res.success.titleDetailView.chapterListGroup;

    const chapters = data.flatMap((chapterGroup) => [
      ...(chapterGroup.firstChapterList || []),
      ...(chapterGroup.midChapterList || []),
      ...(chapterGroup.lastChapterList || []),
    ]);

    return chapters.map((chapter) => {
      const number = parseInt(
        chapter.name.replace(/#(\d+)/, (match, num) => num),
        10
      );
      const name = Number.isNaN(number) ? chapter.name : number.toString().padStart(4, '0');

      return {
        id: chapter.chapterId,
        title: chapter.subTitle,
        name,
        number: parseInt(
          chapter.name.replace(/#(\d+)/, (match, num) => num),
          10
        ),
        manga,
      };
    });
  }

  async getPages(chapter) {
    const res = await this.fetchProto(
      `https://jumpg-webapi.tokyo-cdn.com/api/manga_viewer?img_quality=super_high&split=yes&chapter_id=${chapter.id}`
    ).catch((err) => {
      return [];
    });
    return res.success.mangaViewer.pages.filter((page) => page.mangaPage).map((page) => page.mangaPage);
  }

  async getPage(page) {
    return fetch(page.imageUrl, {
      headers: {
        'Content-Type': 'image/jpeg',
      },
      method: 'GET',
      mode: 'cors',
      redirect: 'follow',
      credentials: 'same-origin',
    })
      .then((res) => res.arrayBuffer())
      .then((res) => {
        let t = new Uint8Array(page.encryptionKey.match(/.{1,2}/g).map((e) => parseInt(e, 16)));
        let s = new Uint8Array(res);
        for (let n = 0; n < s.length; n++) {
          s[n] ^= t[n % t.length];
        }

        return s;
      });
  }

  getLanguage(language) {
    const languages = {
      1: 'Spanish',
      2: 'French',
      3: 'Indonesian',
      4: 'Portugese',
      5: 'Russian',
      6: 'Thai',
    };

    return languages[language] || 'English';
  }

  async fetchProto(url) {
    const raw = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      redirect: 'follow',
      credentials: 'same-origin',
      headers: new Headers(),
    }).then((res) => res.arrayBuffer());

    const protoPath = path.resolve(import.meta.dirname, 'ShueishaMangaPlus.proto');
    const Root = (await protobuf.load(protoPath)).lookupType('MangaPlus.Response');
    const data = Root.decode(new Uint8Array(raw));

    return Root.toObject(data);
  }
}

export default new Api();
