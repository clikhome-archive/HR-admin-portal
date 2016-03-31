(function() {
  'use strict';

  angular.module('clikhomeHR.core')
         .service('Validate', Validate);

  Validate.$inject = [];

  function Validate() {
    var service = {
      message: {
        minlength: 'This value is not long enough.',
        maxlength: 'This value is too long.',
        email: 'A properly formatted email address is required.',
        required: 'This field is required.'
      },
      moreMessages: {
        demo: {
          required: 'Here is a sample alternative required message.'
        }
      },
      checkMoreMessages: checkMoreMessages,
      validationMessages: validationMessages,
      form: form
    };

    return service;

    function checkMoreMessages(name, error) {
      return (service.moreMessages[name] || [])[error] || null;
    }

    // get validation message for error types
    function validationMessages(field, formData, errorBin) {
      var messages = [];
      for (var e in formData[field].$error) {
        if (formData[field].$error.hasOwnProperty(e)) {
          if (formData[field].$error[e]) {
            var specialMessage = service.checkMoreMessages(field, e);
            if (specialMessage) {
              messages.push(specialMessage);
            } else if (service.message[e]) {
              messages.push(service.message[e]);
            } else {
              messages.push('Error: ' + e);
            }
          }
        }
      }
      var dedupedMessages = [];
      angular.forEach(messages, function(el) {
        if (dedupedMessages.indexOf(el) === -1) {
          dedupedMessages.push(el);
        }
      });
      if (errorBin) {
        errorBin[field] = dedupedMessages;
      }
    }

    // validate form data
    function form(formData, errorBin) {
      for (var field in formData) {
        if (formData.hasOwnProperty(field) && field.substr(0, 1) !== '$') {
          service.validationMessages(field, formData, errorBin);
        }
      }
    }
  }
})();
