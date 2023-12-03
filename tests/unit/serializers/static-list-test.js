import { moduleForModel, test } from 'ember-qunit';

moduleForModel('static-list', 'Unit | Serializer | static list', {
  // Specify the other units that are required for this test.
  needs: ['serializer:static-list']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
