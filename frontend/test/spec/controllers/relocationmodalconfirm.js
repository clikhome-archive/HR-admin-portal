'use strict';

describe('Controller: RelocationModalConfirmCtrl', function () {

  // load the controller's module
  beforeEach(module('clikhomeHR'));

  var RelocationModalConfirmCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RelocationModalConfirmCtrl = $controller('RelocationModalConfirmCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RelocationModalConfirmCtrl.awesomeThings.length).toBe(3);
  });
});
