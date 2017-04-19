import { AutomagicPage } from './app.po';

describe('automagic App', () => {
  let page: AutomagicPage;

  beforeEach(() => {
    page = new AutomagicPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
