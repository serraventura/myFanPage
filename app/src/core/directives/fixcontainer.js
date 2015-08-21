'use strict';

angular.module('myFanPageApp')
  .directive('fixHeader', function () {
    return {
      restrict: 'A',
      link: {
        pre: function(scope, element, attrs) {

          var elCopy = element;
          var container = angular.element('[ng-view]').prev();

          element.remove();
          container.html('');
          container.append(elCopy);

        }
      }
    };
  })

  .directive('fixFooter', function () {
    return {
      restrict: 'A',
      link: {
        pre: function(scope, element, attrs) {

          var elCopy = element;
          var container = angular.element('[ng-view]').next();

          element.remove();
          container.html('');
          container.append(elCopy);

        }
      }
    };
  })
