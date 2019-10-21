const ProjectName = process.env.CI ? 'ember-cli-browserstack' : 'local-testing';
module.exports = {
  test_page: 'tests/index.html?hidepassed',
  disable_watching: true,
  browser_start_timeout: 2000,
  browser_disconnect_timeout: 120,
  parallel: 5,
  launchers: {
    BS_Chrome_Current: {
      exe: 'lib/tasks/launch-browserstack-browser.js',
      args: [
        '--os',
        'Windows',
        '--osv',
        '10',
        '--b',
        'chrome',
        '--bv',
        'latest',
        '-t',
        '1200',
        '-p',
        ProjectName,
        '--u',
        '<url>',
      ],
      protocol: 'browser',
    },
    BS_Firefox_Current: {
      exe: 'lib/tasks/launch-browserstack-browser.js',
      args: [
        '--os',
        'Windows',
        '--osv',
        '10',
        '--b',
        'firefox',
        '--bv',
        'latest',
        '-t',
        '1200',
        '-p',
        ProjectName,
        '--u',
        '<url>',
      ],
      protocol: 'browser',
    },
    BS_Safari_Current: {
      exe: 'lib/tasks/launch-browserstack-browser.js',
      args: [
        '--os',
        'OS X',
        '--osv',
        'Mojave',
        '--b',
        'safari',
        '--bv',
        'latest',
        '-t',
        '1200',
        '-p',
        ProjectName,
        '--u',
        '<url>',
      ],
      protocol: 'browser',
    },
    BS_MS_Edge: {
      exe: 'lib/tasks/launch-browserstack-browser.js',
      args: [
        '--os',
        'Windows',
        '--osv',
        '10',
        '--b',
        'edge',
        '--bv',
        'latest',
        '-t',
        '1200',
        '-p',
        ProjectName,
        '--u',
        '<url>',
      ],
      protocol: 'browser',
    },
    BS_IE_11: {
      exe: 'lib/tasks/launch-browserstack-browser.js',
      args: [
        '--os',
        'Windows',
        '--osv',
        '10',
        '--b',
        'ie',
        '--bv',
        '11.0',
        '-t',
        '1500',
        '-p',
        ProjectName,
        '--u',
        '<url>',
      ],
      protocol: 'browser',
    },
  },
  launch_in_dev: [
    'Chrome',
  ],
  launch_in_ci: [
    'BS_Chrome_Current',
    'BS_Firefox_Current',
    'BS_Safari_Current',
    'BS_MS_Edge',
    'BS_IE_11',
  ],
  browser_args: {
    Chrome: {
      ci: [
        // --no-sandbox is needed when running Chrome inside a container
        process.env.CI ? '--no-sandbox' : null,
        '--headless',
        '--disable-dev-shm-usage',
        '--disable-software-rasterizer',
        '--mute-audio',
        '--remote-debugging-port=0',
        '--window-size=1440,900'
      ].filter(Boolean)
    }
  }
};
