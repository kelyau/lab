// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function test(browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL;

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.hello')
      .assert.containsText('h1', 'Welcome to Your Vue.js App')
      .assert.elementCount('img', 1);
  },
  'my test': (browser) => {
    browser
      .click('.layout-nav li:nth-child(2) a')
      .pause(6000);
  },
  当前book菜单: (browser) => {
    browser
      .expect
      .element('.layout-nav li:nth-child(2)')
      .to
      .have
      .attribute('class')
      .which.contains('ivu-menu-item-selected');
  },
};
