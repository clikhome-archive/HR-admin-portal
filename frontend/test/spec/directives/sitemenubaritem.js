'use strict';

describe('Directive: siteMenubarItem', function () {

  // load the directive's module
  beforeEach(module('clikhomeHR'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<site-menubar-item></site-menubar-item>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the siteMenubarItem directive');
  }));
});
