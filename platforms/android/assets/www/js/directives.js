angular.module('babydata.directives', []) 

.directive('babyVideo', function(){
    return {
        restrict: 'AEC',
	    scope: {src: '='},
		link: function(scope, element, attrs) {
	      scope.$watch('src', function(newVal, oldVal) {	      	
	      	console.log(scope.src);
	        if (scope.src != "") {
	          // Create a div object
	          var div = document.createElement('div');

	          if (scope.src.endsWith(".mp4")){
				//android
	          	div.innerHTML = "<video id=\"myCordovaVideo\" width=\"100%\" height=\"100%\" controls>"+
	                          "<source src=\"" + scope.src + "\" type=\"video/mp4\">"+
	                          "</video>";
	          }
	          else{
	          	//iOS	
          		div.innerHTML = "<video id=\"myCordovaVideo\" width=\"100%\" height=\"100%\" controls>"+
                          "<source src=\"" + scope.src + "\" type=\"video/quicktime\">"+
                          "</video>";
	          }

	          // Delete previous video if exists
	          var previousDiv = document.getElementById('myCordovaVideo');
	          if (previousDiv)
	            previousDiv.remove();

	          // Append new <video> tag into the DOM
	          element.append(div);
	        }
	        else{
        		var previousDiv = document.getElementById('myCordovaVideo');
				if (previousDiv)
	            	previousDiv.remove();
	        }

	      });
	    }    
    }
});