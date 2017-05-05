import { HomeboardPage } from './app.po';

describe('homeboard App', () => {
  let page: HomeboardPage;

  beforeEach(() => {
    page = new HomeboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
