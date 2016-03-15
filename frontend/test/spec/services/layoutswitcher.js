'use strict';

describe('Service: layoutSwitcher', function () {

  // load the service's module
  beforeEach(module('ClikhomeApp'));

  // instantiate service
  var layoutSwitcher;
  beforeEach(inject(function (_layoutSwitcher_) {
    layoutSwitcher = _layoutSwitcher_;
  }));

  it('should do something', function () {
    expect(!!layoutSwitcher).toBe(true);
  });

});
