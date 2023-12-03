
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('eta-button-group', 'helper:eta-button-group', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{eta-button-group inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

