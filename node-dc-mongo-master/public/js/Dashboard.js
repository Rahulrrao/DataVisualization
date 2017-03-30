queue()
    .defer(d3.json, "/api/data")
    .defer(d3.json, "/api/data1")
    .await(makeGraphs);
    

function makeGraphs(error, apiData1, apiData2) {
	
//Start Transformations
	var dataSet = apiData1;
	var dataset1=apiData2;
	// var dateFormat = d3.time.format("%Y-%m-%d");
	// dataSet.forEach(function(d) {
	// 	d.date = dateFormat.parse(d.date);
	// 	if(d.date){
	// 		d.date.setDate(1);
	// 		//d.stars =+d.stars;
	// 	}
	// 			//d.date.setDate();
	// 	// d.total_donations = +d.total_donations;
	// });
var dateFormat = d3.time.format("%Y-%m-%d");
	dataSet.forEach(function(d) {
		if(d.date){

			//alert(d.date_posted);
		}
		d.date = dateFormat.parse(d.date);

		//alert(d.date_posted);
		if(d.date){
			d.date.setDate(1);
			//d.stars =+d.stars;
		}
		//d.business_reviews.funny = +d.business_reviews.useful;	
		//d.business_reviews.funny = +d.business_reviews.funny;
		//d.business_reviews.funny = +d.business_reviews.cool;
	});
	dataset1.forEach(function(d) {
		if(d.date){

			//alert(d.date_posted);
		}
		d.date = dateFormat.parse(d.date);

		//alert(d.date_posted);
		if(d.date){
			d.date.setDate(1);
			//d.stars =+d.stars;
		}
		//d.business_reviews.funny = +d.business_reviews.useful;	
		//d.business_reviews.funny = +d.business_reviews.funny;
		//d.business_reviews.funny = +d.business_reviews.cool;
	});

	//Create a Crossfilter instance
	var ndx = crossfilter(dataSet);
	//ndx.add(dataset1);
	//var ndx1=crossfilter(dataset1);

	//Define Dimensions
	var datePosted = ndx.dimension(function(d) { return d.date; });
	// var gradeLevel = ndx.dimension(function(d) { return d.grade_level; });
	// var resourceType = ndx.dimension(function(d) { return d.resource_type; });
	//var donutStatus = ndx.dimension(function(d) { return d.useful; });
	// var funny=ndx.dimension(function(d){return d.funny;});
	// var cool=ndx.dimension(function(d){return d.cool;})
	// var povertyLevel = ndx.dimension(function(d) { return d.date.getMonth(); });
	var review = ndx.dimension(function(d) { return d.stars; });
	// var totalDonations  = ndx.dimension(function(d) { return d.total_donations; });

	//var date=ndx1.dimension(function(d){ return d.date;});



	//Calculate metrics
	var projectsByDate = datePosted.group(); 
	//var projectsdate= date.group();
	// var projectsByGrade = gradeLevel.group(); 
	//var projectsByResourceType = resourceType.group();
	//var projectsByDonutStatus = donutStatus.group();
	//var projectsByPovertyLevel = povertyLevel.group();
	var reviewGroup = review.group();

	var all = ndx.groupAll();
	//var all1 = ndx1.groupAll();

	//Calculate Groups
	var totalDonationsState = review.group().reduceSum(function(d) {
		return d.stars;
	});

	// var totalDonationsGrade = gradeLevel.group().reduceSum(function(d) {
	// 	return d.grade_level;
	// });

	// var totalDonationsDonutStatus = donutStatus.group().reduceSum(function(d) {
	// 	return d.useful;
	// });
	// var totalfunny=funny.group().reduceSum(function(d){
	// 	return d.funny;
	// });
	// var totalcool=funny.group().reduceSum(function(d){
	// 	return d.cool;
	// });



	// var netTotalDonations = ndx.groupAll().reduceSum(function(d) {return d.total_donations;});

	//Define threshold values for data
	// var minDate = datePosted.bottom(1).date;
	// var maxDate = datePosted.top(1).date;
	var minDate = datePosted.bottom(1)[0].date;
	var maxDate = datePosted.top(1)[0].date;

console.log(minDate);
console.log(maxDate);

	var compositeDateChart = dc.compositeChart("#date-chart");
	var compositeReviewChart = dc.compositeChart("#state-donations");
	//var compositeDonutChart = dc.compositeChart("#funding-chart");
    //Charts
    //Charts
	var dateChart1 = dc.lineChart(compositeDateChart);
	// var dateChart1 = dc.lineChart("#date-chart1");
	// var gradeLevelChart = dc.rowChart("#grade-chart");
	// var resourceTypeChart = dc.rowChart("#resource-chart");
	// //var donutStatusChart1 = dc.pieChart(compositeDonutChart);
	// var povertyLevelChart = dc.rowChart("#poverty-chart");
	// var totalProjects = dc.numberDisplay("#total-projects");
	// var netDonations = dc.numberDisplay("#net-donations");
	var reviewDistribution1 = dc.barChart(compositeReviewChart);


 //  selectField = dc.selectMenu('#menuselect')
 //        .dimension(review)
 //        .group(reviewGroup); 

 //       dc.dataCount("#row-selection")
 //        .dimension(ndx)
 //        .group(all);


	// totalProjects
	// 	.formatNumber(d3.format("d"))
	// 	.valueAccessor(function(d){return d; })
	// 	.group(all);

	// netDonations
	// 	.formatNumber(d3.format("d"))
	// 	.valueAccessor(function(d){return d; })
	// 	.group(netTotalDonations)
	// 	.formatNumber(d3.format(".3s"));

	dateChart1
		//.width(600)
		.height(220)
		.colors('red')
		.margins({top: 10, right: 50, bottom: 30, left: 50})
		.dimension(datePosted)
		.group(projectsByDate)
		.renderArea(true)
		.transitionDuration(500)
		//
		//.elasticY(true)
		.renderHorizontalGridLines(true)
    	.renderVerticalGridLines(true)
		.xAxisLabel("Year")
		.yAxis().ticks(6);
		// dateChart1
		// //.width(600)
		// .height(220)
		// .margins({top: 10, right: 50, bottom: 30, left: 50})
		// .dimension(date)
		// .group(projectsdate)
		// .renderArea(true)
		// .transitionDuration(500)
		// .x(d3.time.scale().domain([minDate, maxDate]))
		// .elasticY(true)
		// .renderHorizontalGridLines(true)
  //   	.renderVerticalGridLines(true)
		// .xAxisLabel("Year")
		// .yAxis().ticks(6);

	// resourceTypeChart
 //        //.width(300)
 //        .height(220)
 //        .dimension(resourceType)
 //        .group(projectsByResourceType)
 //        .elasticX(true)
 //        .xAxis().ticks(5);

	// povertyLevelChart
	// 	//.width(300)
	// 	.height(220)
 //        .dimension(povertyLevel)
 //        .group(projectsByPovertyLevel)
 //        .xAxis().ticks(4);

	// gradeLevelChart
	// 	//.width(300)
	// 	.height(220)
 //        .dimension(gradeLevel)
 //        .group(projectsByGrade)
 //        .xAxis().ticks(4);

  
    // donutStatusChart1
    //         .height(220)
    //         //.width(350)
    //         .radius(90)

    //         .innerRadius(70)
    //         .transitionDuration(1000)
    //       .dimension(donutStatus)
    //         .group(projectsByDonutStatus)
            


    reviewDistribution1
    	.width(500)
        .height(220)
        .transitionDuration(1000)
        .dimension(review)
        .group(totalDonationsState)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .centerBar(true)
        .colors('blue')
        .gap(5)
        .elasticY(true)
        .x(d3.scale.ordinal().domain(review))
        .xUnits(dc.units.ordinal)
        .renderHorizontalGridLines(true)
        .renderVerticalGridLines(true)
      .ordering(function(d){return d.stars;})
       .yAxis().tickFormat(d3.format("s"));


 ///copy 22222222222
 	//ndx.remove()
 	//ndx.add(dataset1);
    var ndx1 = crossfilter(dataset1);
 //Define Dimensions
	var datePosted = ndx1.dimension(function(d) { return d.date; });

	// var gradeLevel = ndx1.dimension(function(d) { return d.grade_level; });
	// var resourceType = ndx1.dimension(function(d) { return d.resource_type; });
	//var donutStatus = ndx.dimension(function(d) { return d.useful; });
	// var funny=ndx1.dimension(function(d){return d.funny;});
	// var cool=ndx1.dimension(function(d){return d.cool;})
	// var povertyLevel = ndx1.dimension(function(d) { return d.date.getMonth(); });
	var review= ndx1.dimension(function(d) { return d.stars; });
	// var totalDonations  = ndx1.dimension(function(d) { return d.total_donations; });

	//var date=ndx1.dimension(function(d){ return d.date;});



	//Calculate metrics
	projectsByDate = datePosted.group(); 
	//var projectsdate= date.group();
	// var projectsByGrade = gradeLevel.group(); 
	// var projectsByResourceType = resourceType.group();
	// //var projectsByDonutStatus = donutStatus.group();
	// var projectsByPovertyLevel = povertyLevel.group();
	var reviewGroup = review.group();

	var all = ndx1.groupAll();
	//var all1 = ndx1.groupAll();

	//Calculate Groups
	var totalDonationsState = review.group().reduceSum(function(d) {
		return d.stars;
	});

	// var totalDonationsGrade = gradeLevel.group().reduceSum(function(d) {
	// 	return d.grade_level;
	// });

	// var totalDonationsFundingStatus = donutStatus.group().reduceSum(function(d) {
	// 	return d.useful;
	// // });
	// var totalfunny=funny.group().reduceSum(function(d){
	// 	return d.funny;
	// });
	// var totalcool=funny.group().reduceSum(function(d){
	// 	return d.cool;
	// });



	// var netTotalDonations = ndx1.groupAll().reduceSum(function(d) {return d.total_donations;});

	//Define threshold values for data
	// var minDate = datePosted.bottom(1).date;
	// var maxDate = datePosted.top(1).date;
	//var minDate = datePosted.bottom(1)[0].date;
	//var maxDate = datePosted.top(1)[0].date;

//console.log(minDate);
//console.log(maxDate);

    //Charts
	
	

	var dateChart2 = dc.lineChart(compositeDateChart);
	// var dateChart1 = dc.lineChart("#date-chart1");
	// var gradeLevelChart = dc.rowChart("#grade-chart");
	// var resourceTypeChart = dc.rowChart("#resource-chart");
	//var donutStatusChart2 = dc.pieChart(compositeDonutChart);
	// var povertyLevelChart = dc.rowChart("#poverty-chart");
	// var totalProjects = dc.numberDisplay("#total-projects");
	// var netDonations = dc.numberDisplay("#net-donations");
	var reviewDistribution2 = dc.barChart(compositeReviewChart);


 //  selectField = dc.selectMenu('#menuselect')
 //        .dimension(review)
 //        .group(reviewGroup); 

 //       dc.dataCount("#row-selection")
 //        .dimension(ndx)
 //        .group(all);


	// totalProjects
	// 	.formatNumber(d3.format("d"))
	// 	.valueAccessor(function(d){return d; })
	// 	.group(all);

	// netDonations
	// 	.formatNumber(d3.format("d"))
	// 	.valueAccessor(function(d){return d; })
	// 	.group(netTotalDonations)
	// 	.formatNumber(d3.format(".3s"));

	dateChart2
		//.width(600)
		.height(220)
		.margins({top: 10, right: 50, bottom: 30, left: 50})
		.dimension(datePosted)
		
		.group(projectsByDate)
		.renderArea(true)
		.transitionDuration(500)
		//.x(d3.time.scale().domain([minDate, maxDate]))
		.elasticY(true)
		.renderHorizontalGridLines(true)
    	.renderVerticalGridLines(true)
		.xAxisLabel("Year")
		.yAxis().ticks(6);
		// dateChart1
		// //.width(600)
		// .height(220)
		// .margins({top: 10, right: 50, bottom: 30, left: 50})
		// .dimension(date)
		// .group(projectsdate)
		// .renderArea(true)
		// .transitionDuration(500)
		// .x(d3.time.scale().domain([minDate, maxDate]))
		// .elasticY(true)
		// .renderHorizontalGridLines(true)
  //   	.renderVerticalGridLines(true)
		// .xAxisLabel("Year")
		// .yAxis().ticks(6);
compositeDateChart
    //.width(400)
    .height(220)
    .x(d3.time.scale().domain([minDate, maxDate]))
    
    .compose([dateChart1,
      dateChart2
    ]);
    


	// resourceTypeChart
 //        //.width(300)
 //        .height(220)
 //        .dimension(resourceType)
 //        .group(projectsByResourceType)
 //        .elasticX(true)
 //        .xAxis().ticks(5);

	// povertyLevelChart
	// 	//.width(300)
	// 	.height(220)
 //        .dimension(povertyLevel)
 //        .group(projectsByPovertyLevel)
 //        .xAxis().ticks(4);

	// gradeLevelChart
	// 	//.width(300)
	// 	.height(220)
 //        .dimension(gradeLevel)
 //        .group(projectsByGrade)
 //        .xAxis().ticks(4);

  
          // donutStatusChart2
          //   .height(220)
          //   //.width(350)
          //   //.margins({top: 10, right: 50, bottom: 30, left: 50})
          //   .radius(60)
          //   .innerRadius(40)
          //   .transitionDuration(1000)
          // .dimension(donutStatus)
          //   .group(projectsByDonutStatus)
            
// compositeDonutChart
//     //.width(400)
//     .height(220)
//     .compose([donutStatusChart1,
//       donutStatusChart2
//     ]);

    reviewDistribution2
    	.width(500)
        .height(220)
        .transitionDuration(1000)
        .dimension(review)
        .group(totalDonationsState)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .centerBar(true)
        .colors('red')
        .gap(5)
        .elasticY(true)
        .x(d3.scale.ordinal().domain(review))
        .xUnits(dc.units.ordinal)
        .renderHorizontalGridLines(true)
        .renderVerticalGridLines(true)
      .ordering(function(d){return d.stars;})
       .yAxis().tickFormat(d3.format("s"));

    compositeReviewChart
    //.width(400)
    
    .x(d3.scale.ordinal().domain(review))
    .compose([reviewDistribution1,
      reviewDistribution2
    ]);
    

    dc.renderAll();

};