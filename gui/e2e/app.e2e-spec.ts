import { EMZOtoursPage } from './app.po';

describe('emzotours App', () => {
  let page: EMZOtoursPage;

  beforeEach(() => {
    page = new EMZOtoursPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
