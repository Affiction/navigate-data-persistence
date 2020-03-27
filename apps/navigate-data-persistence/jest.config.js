module.exports = {
  name: 'navigate-data-persistence',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/navigate-data-persistence',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
