import { FiddleUiPage } from './app.po';

describe('fiddle-ui App', function() {
  let page: FiddleUiPage;

  beforeEach(() => {
    page = new FiddleUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
