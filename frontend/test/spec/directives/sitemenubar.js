'use strict';

describe('Directive: siteMenubar', function () {

  // load the directive's module
  beforeEach(module('ClikhomeApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<site-menubar></site-menubar>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the siteMenubar directive');
  }));
});
