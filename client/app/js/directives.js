angular.module('directives',['services']).
controller('d3Ctrl', ['$rootScope','socket', function($rootScope,data){
	$rootScope.$watch('data', function(){
		console.log("hehe");
		var entry = d3.entries(data);
		d3.select(".chart")
		   .selectAll("div")
		   .data(entry)
		   .enter().append("div")
		   .style("width", function(d) { return d.value + "px"; })
		   .text(function(d) { return d.key; });
	})
	
}]).
  directive('d3Directive', function(){
	return {
		restrict: 'AE',
		template: '<div class="chart"></div>',
		scope: {
			data: "="
		},
		controller: 'd3Ctrl'
		
	}
});