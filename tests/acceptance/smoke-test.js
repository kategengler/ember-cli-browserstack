import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | smoke', function (hooks) {
  setupApplicationTest(hooks);

  test('smoke test', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');
  });
});
