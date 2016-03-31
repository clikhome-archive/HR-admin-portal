'use strict';

describe('Directive: layout', function () {

  // load the directive's module
  beforeEach(module('clikhomeHR'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<layout></layout>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the layout directive');
  }));
});
