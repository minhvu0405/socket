var dir = angular.module('directives',['services'])
  .directive('d3Directive', ['socket',function(socket){
	return {
		restrict: 'AE',
		template: '<div class="chart"></div>',
		scope: true,
		controller: ['$scope','socket',function($scope,socket){
			$scope.data = socket;
			$scope.$watch('data', function(){
				var entry = d3.entries($scope.data);
				var bar_width = function(d) {return d.value*50 + "px"};
				var bar_text = function(d) {return d.key};
				var chart = d3.select(".chart").selectAll("div");
				chart.remove();
				chart.data(entry).enter().append("div").style("width", bar_width).text(bar_text);
			}, true);
			
		}]
	}
}]);