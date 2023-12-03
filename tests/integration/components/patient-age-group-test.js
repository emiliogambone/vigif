import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('patient-age-group', 'Integration | Component | patient age group', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{patient-age-group}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#patient-age-group}}
      template block text
    {{/patient-age-group}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
