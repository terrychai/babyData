// angular.module('babydata.directives', []) 
 
// .directive('videoDirective', function(){
//     return {
//         restrict: 'AEC',
// 	    scope: {src: '='},
// 		link: function(scope, element, attrs) {
// 	      scope.$watch('src', function(newVal, oldVal) {
// 	        if (scope.src != "") {
// 	          // Create a div object
// 	          var div = document.createElement('div');
// 	          div.innerHTML = "<video id=\"myCordovaVideo\" controls>"+
// 	                          "<source src=\"" + scope.src + "\" type=\"video/quicktime\">"+
// 	                          "</video>";
	          
// 	          // Delete previous video if exists
// 	          var previousDiv = document.getElementById('myCordovaVideo');
// 	          if (previousDiv)
// 	            previousDiv.remove();

// 	          // Append new <video> tag into the DOM
// 	          element.append(div);
// 	        }

// 	      });
// 	    }    
//     }
// });