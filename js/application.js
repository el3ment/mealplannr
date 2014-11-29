(function(){

var templates = {
	card : $('#tmpl-card').html(),
	plan : $('#tmpl-plan').html(),
	recipe : $('#tmpl-recipe').html(),
	list : $('#tmpl-shoppinglist-page').html(),
	firstPage : $('#tmpl-tutorial-firstPage').html(),
	tutorial_two : $('#tmpl-tutorial-secondPage').html(),
	tutorial_three : $('#tmpl-tutorial-thirdPage').html(),
} 

var state = {
	currentMeal : null,
	liked : [],
	discard : [],
	totalMeals : 5,

	// Settings
	vegetarian : false,
	glutenfree : false,
	dairyfree : false
}

var _nextTutorialPage = 1;

//need to add boolean fields vegetarian{0,1}, glutenfree{0.1}, and dairyfree{} 

var recipies = [];

var getUnusedRecipies = function(usedRecipies, allRecipies){
	var unusedRecipies = [];
	for(var i = 0; i < allRecipies.length; i++){
		var found = false;
		
		for(var j = 0; j < usedRecipies.length; j++){
			if(allRecipies[i].id == usedRecipies[j].id){
				found = true;
			}
		}
		
		if(!found){
			unusedRecipies.push(allRecipies[i]);
		}
	}

	return unusedRecipies;
}

var getCommonCount = function(recipies){
	var common = 0;
	
	for(var i = 0; i < recipies.length; i++){
		if(recipies[i].type == 'common')
			common++
	}

	return  common;
}

var chooseNextRecipie = function(){
	/*
	here is the pseudocode for the chooseNextrecipie function
	based on the following selection criteria
		common/diverse
		vegetarian
		dairyfree
		glutenfree

	to implement
		selection based on previously like meals
		demographic smarts
	
	**** start of code ****
	// Initialize Variables
	unusedrecepies <- get the unused recipies list
	commoncount <- get the number of common recipies liked
	diversecount <- get the number of diverse recipies liked
	nummeals <- the number of meals requested by the user
	numcommon <- the number of common meals requested by the user
	numdiverse <- the number of diverse meals requested by the user

	// Filter to preferences
	if state.vegetarian
		filter unusedrecipies to vegetarian==true
	end if
	if state.dairyfree
		filter unusedreceipies to dairyfree
	end if
	if state.glutenfree
		filter unusedrecipies to glutenfree
	end if
	
	//select the next meal
	descommon = numcommon - commoncount
	desdiverse = numdiverse - diversecount
	
	probabilityOfCommon = descommon/(descommon+desdiverse)
	filterToType = probabilityOfCommon > Math.random() ? 'common':diverse';
	
	unusedRecipies =  filter unusedRecepies from filterToType
	if out of recpies <- show dialog
	else
	return a randomly selected item from the list of appropriate recepies
*/


	var unusedRecipies = getUnusedRecipies(state.liked.concat(state.discard), recipies);
	var commonCount = getCommonCount(state.liked);
	var diverseCount = state.liked.length - commonCount;
	var numMeals = state.totalMeals;
	var numDiverse = 2; //for now, this could be a state variable dynamically updated
	var numCommon = numMeals - numDiverse;

	//down-select to user preference
	//Something is happening here where it is not filtering properly.  It always gives me "out of recipes"
	if(state.vegetarian)
		unusedRecipies = $(unusedRecipies).filter(function(i,e){
			return e.vegetarian == "1";
		})
	if(state.dairyfree)
		unusedRecipies = $(unusedRecipies).filter(function(i,e){
			return e.dairyfree == "1";
		})
	if(state.glutenfree)
		unusedRecipies = $(unusedRecipies).filter(function(i,e){
			return e.glutenfree == "1";
		})

	//choose a new recipe based upon diverse/common criteria
	desCommon = numCommon - commonCount
	desDiverse = numDiverse - diverseCount
	probabilityOfCommon = desCommon/(desCommon+desDiverse)
	var filterToType = probabilityOfCommon > Math.random() ? 'common' : 'diverse';
	unusedRecipies = $(unusedRecipies).filter(function(i, e){
		return e.type == filterToType;
	})

	if(unusedRecipies.length == 0){
		throw new Error('Out of recipies');
	}

	return unusedRecipies[Math.floor(Math.random() * unusedRecipies.length)];
};

var render = function(template, data){
	return Mustache.render(template, data);
};

var processNext = function(){
	if(state.liked.length < state.totalMeals){

		try{
			state.currentMeal = chooseNextRecipie();
			state.currentMeal.totalLikedPlusOne = state.liked.length + 1;
			state.currentMeal.totalLiked = state.liked.length;
			state.currentMeal.totalMeals = state.totalMeals;

			var recipie = attachEvents(render(templates.recipe, state.currentMeal));

			renderPage(recipie);

		}catch(e){
			alert(e);
			displayMealPlan();
		}

	}else{
		displayMealPlan();
	}
}

var handleNo = function(e, r){
	state.discard.push(state.currentMeal);
	$('.recipe').addClass('showFailure');
	processNext();
}

var handleYes = function(e, r){
	state.liked.push(state.currentMeal);
	
	$('.recipe').addClass('showSuccess');
	
	setTimeout(function(){
		processNext();
	}, 750);
}

var attachEvents = function(code){
	code = $(code);

	$('button[data-action="yes"]', code).one('click', handleYes);
	$('button[data-action="no"]', code).one('click', handleNo);

	return code;
}

var displayShoppingList = function(){
	var html = render(templates.list, {meals : state.liked});
	renderPage(html);
}

var displayMealPlan = function(e){
	var plan = render(templates.plan, {
								totalMeals : state.liked.length,
								meals : state.liked, 
								commonCount : getCommonCount(state.liked), 
								diverseCount : state.liked.length - getCommonCount(state.liked)});

	renderPage(plan, $((e || {}).target).hasClass('back') ? 'left' : 'right');
	$('button[data-action="shopping-list"]').on('click', displayShoppingList);
	$('button[data-action="createNew"]').on('click', createNew);
}

var createNew = function(){
	state.liked = [];
	state.discard = [];
	state.currentMeal = null;

	processNext();
}

var preloadImages = function(){
	var urls = [];
	for(var i = 0; i < recipies.length; i++){
		urls.push(recipies[i].image);
	}

	$(urls).each(function () {
		$('<img />').attr('src',this).appendTo('body').css('display','none');
	});
}

var renderNextTutorialScreen = function(){
	var tutorial;

	switch(_nextTutorialPage){
		case 1:
			tutorial = null;
			break;
		case 2:
			tutorial = render(templates.tutorial_two, {});
			_nextTutorialPage++;
			break;
		case 3:
			tutorial = render(templates.tutorial_three, {});
			_nextTutorialPage++;
			break;
		default:
			tutorial = null;
			break;
	}

	tutorial = $(tutorial);
	$('.subpage.onscreen').append(tutorial);
	$('button[data-action="continue"]', tutorial).one('click', function(){
		$(tutorial).remove();
	})
};

var renderPage = function(html, direction){
	if(!direction)
		direction = 'right';

	var otherDirection = direction == 'left' ? 'right' : 'left';

	html = $(html).wrap('<div class="subpage"></div>').parent().addClass('offscreen').addClass('offscreen-' + direction);
	$('.window').append(html);

	$('*[data-action="displayMenuPlan"]', html).on('click', displayMealPlan);
		
	setTimeout(function(){
		var prev = $('.window .subpage.onscreen').addClass('offscreen-' + otherDirection).removeClass('offscreen-' + direction + ' onscreen');
		html.addClass('onscreen');
		renderNextTutorialScreen();
		setTimeout(function(){
			prev.remove();
		}, 1000);
	}, 1);

	
	
};


var downloadRecipes = function(){

	window.google = {
		visualization : {
			Query : {
				setResponse : function(data){
					
					var rows = data.table.rows;
					var cols = data.table.cols;

					for (var j = 0; j < rows.length; j++){
						var row = {};
						for(var i = 0; i < cols.length; i++){
							var label = cols[i].label;
							var value = (rows[j].c[i] || {}).v;
							if(label.indexOf('[]') > -1){
								label = label.replace('[]', '');
								value = value.split('|');
							}

							row[label] = value;
						}
						recipies.push(row);
					}
				}
			}
		}
	}

	$.ajax({
	    url: "https://docs.google.com/spreadsheets/d/17Tn6z_to33ai4qy5S6w7EDgKloy3yotXfHsYVDNfx-o/gviz/tq?tqx=out:jsonp&tq=select+*",
	 
	    // the name of the callback parameter, as specified by the YQL service
	    jsonp: "google.visualization.Query.setResponse",
	 
	    // tell jQuery we're expecting JSONP
	    dataType: "jsonp"
	});

};

$('button[data-action="displayMenuPlan"]').on('click', displayMealPlan);

$('button[data-action="start"]').on('click', function(){

	var firstPage = $(render(templates.firstPage, {}));
	$('button[data-action="continue"]', firstPage).one('click', function(){
		_nextTutorialPage = 2;
		createNew();
	});
	
	renderPage(firstPage);
	
});

downloadRecipes();

//$().ready(preloadImages);

$('.saveState').on('click', function(e){
	$('#nav-trigger').prop('checked', false);
	//console.log('yep');
	e.preventDefault();
})

$('.navigation input[type="checkbox"]').on('change', function(e){
	state[$(e.target).attr('name')] = $(e.target).prop('checked');
});

}());