var directives = angular.module('directives', [], function($compileProvider));

directives.directive('compile', function($compile){
	return function(scope, element, attrs){
		$scope.watch(
			function(scope) {
				return scope.$eval(attrs.compile);
			},
			function(value) {
				element.html(value);
				$compile(element.contents())(scope);
			}
			);
	});
}

//https://docs.angularjs.org/api/ng/service/$compile