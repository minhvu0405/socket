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
}])
  .directive('d3Wordcloud',['socket',function(socket){ 
	 return {
		restrict: 'AE',
		scope: true,
		controller: ['$scope','socket',function($scope,socket){
			$scope.data = socket;
			$scope.$watch('data', function(){
			    var fill = d3.scale.category20();
				var entry = d3.entries($scope.data);
				remove();
			    d3.layout.cloud().size([500, 500])
			        .words(entry.map(function(d) {
			          return {text: d.key, size: d.value*15};
			        }))
			        .padding(5)
			        .rotate(function() { return ~~(Math.random() * 2) * 90; })
			        .font("Impact")
			        .fontSize(function(d) { return d.size; })
			        .on("end", draw)
			        .start();

			    function draw(words) {
			      d3.select("body").append("svg")
			          .attr("width", 500)
			          .attr("height", 500)
			        .append("g")
			          .attr("transform", "translate(150,150)")
			        .selectAll("text")
			          .data(words)
			        .enter().append("text")
			          .style("font-size", function(d) { return d.size + "px"; })
			          .style("font-family", "Times New Roman")
			          .style("fill", function(d, i) { return fill(i); })
			          .attr("text-anchor", "middle")
			          .attr("transform", function(d) {
			            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
			          })
			          .text(function(d) { return d.text; });
			    }
				function remove(){
				  d3.select("svg").remove();
				}
			}, true);
			
		}]
	}
}]);