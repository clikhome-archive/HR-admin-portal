'use strict';

describe('Service: LAYOUTTYPES', function () {

  // load the service's module
  beforeEach(module('ClikhomeApp'));

  // instantiate service
  var LAYOUTTYPES;
  beforeEach(inject(function (_LAYOUTTYPES_) {
    LAYOUTTYPES = _LAYOUTTYPES_;
  }));

  it('should do something', function () {
    expect(!!LAYOUTTYPES).toBe(true);
  });

});
