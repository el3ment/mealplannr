(function(){

var templates = {
	card : $('#tmpl-card').html(),
	plan : $('#tmpl-plan').html()
} 

var state = {
	currentMeal : null,
	liked : [],
	discard : []
}

var recipies = [
	{id: 1, image : 'http://lh5.ggpht.com/east-MMyMjVPuc3nlC4trgJBg7O4nbTJvD6ZmkqYSy2YgN5QwYrc_ZqdvP2iB7MEmAEGWsCZPLnDAlq7eixg=s730-e365', type : 'common', title: 'Meatloaf', calories : 150, time: '30min'},
	{id: 2, image : 'http://lh5.ggpht.com/east-MMyMjVPuc3nlC4trgJBg7O4nbTJvD6ZmkqYSy2YgN5QwYrc_ZqdvP2iB7MEmAEGWsCZPLnDAlq7eixg=s730-e365', type : 'common', title: 'Tacos', calories : 350, time: '10min'},
	{id: 3, image : 'http://lh5.ggpht.com/east-MMyMjVPuc3nlC4trgJBg7O4nbTJvD6ZmkqYSy2YgN5QwYrc_ZqdvP2iB7MEmAEGWsCZPLnDAlq7eixg=s730-e365', type : 'common', title: 'Speghetti', calories : 250, time: '20min'},
	{id: 4, image : 'http://lh5.ggpht.com/east-MMyMjVPuc3nlC4trgJBg7O4nbTJvD6ZmkqYSy2YgN5QwYrc_ZqdvP2iB7MEmAEGWsCZPLnDAlq7eixg=s730-e365', type : 'diverse', title: 'Tacos de Lingua', calories : 150, time: '20min'},
	{id: 5, image : 'http://lh5.ggpht.com/east-MMyMjVPuc3nlC4trgJBg7O4nbTJvD6ZmkqYSy2YgN5QwYrc_ZqdvP2iB7MEmAEGWsCZPLnDAlq7eixg=s730-e365', type : 'diverse', title: 'Chicken Alfredo', calories : 300, time: '40min'},
	{id: 6, image : 'http://lh5.ggpht.com/east-MMyMjVPuc3nlC4trgJBg7O4nbTJvD6ZmkqYSy2YgN5QwYrc_ZqdvP2iB7MEmAEGWsCZPLnDAlq7eixg=s730-e365', type : 'diverse', title: 'Fried Rice with Pork Tenderlion', calories : 150, time: '30min'},
	{id: 7, image : 'http://lh5.ggpht.com/east-MMyMjVPuc3nlC4trgJBg7O4nbTJvD6ZmkqYSy2YgN5QwYrc_ZqdvP2iB7MEmAEGWsCZPLnDAlq7eixg=s730-e365', type : 'common', title: 'Raised Meatballs and Rice', calories : 245, time: '20min'},
	{id: 8, image : 'http://lh5.ggpht.com/east-MMyMjVPuc3nlC4trgJBg7O4nbTJvD6ZmkqYSy2YgN5QwYrc_ZqdvP2iB7MEmAEGWsCZPLnDAlq7eixg=s730-e365', type : 'diverse', title: 'Tortilla Soup', calories : 400, time: '1hr'},
	{id: 9, image : 'http://lh5.ggpht.com/east-MMyMjVPuc3nlC4trgJBg7O4nbTJvD6ZmkqYSy2YgN5QwYrc_ZqdvP2iB7MEmAEGWsCZPLnDAlq7eixg=s730-e365', type : 'common', title: 'Waffles & Eggs', calories : 310, time: '30min'},
	{id: 10, image : 'http://lh5.ggpht.com/east-MMyMjVPuc3nlC4trgJBg7O4nbTJvD6ZmkqYSy2YgN5QwYrc_ZqdvP2iB7MEmAEGWsCZPLnDAlq7eixg=s730-e365', type : 'diverse', title: 'Chicken and Waffles', calories : 100, time: '10min'},
	{id: 11, image : 'http://lh5.ggpht.com/east-MMyMjVPuc3nlC4trgJBg7O4nbTJvD6ZmkqYSy2YgN5QwYrc_ZqdvP2iB7MEmAEGWsCZPLnDAlq7eixg=s730-e365', type : 'diverse', title: 'Misu Soup', calories : 250, time: '300min'}];

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

	var unusedRecipies = getUnusedRecipies(state.liked, recipies);

	var commonCount = getCommonCount(state.liked);
	var diverseCount = state.liked.length - commonCount;

	if(commonCount < 5 && diverseCount < 2)
		probabilityOfCommon = .5;
	else if(commonCount < 5 && diverseCount == 2)
		probabilityOfCommon = 1;
	else if(commonCount >= 5)
		probabilityOfCommon = 0;

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
	if(state.liked.length < 7){

		try{
			state.currentMeal = chooseNextRecipie();

			var recipie = attachEvents(render(templates.card, state.currentMeal));

			$('#cards .option').hide();
			$('#cards').append(recipie);

		}catch(e){
			alert(e);
		}

	}else{
		displayMealPlan();
	}
}

var handleNo = function(e, r){
	state.discard.push(state.currentMeal);
	processNext();
}

var handleYes = function(e, r){
	state.liked.push(state.currentMeal);
	processNext();
}

var attachEvents = function(code){
	code = $(code);

	$('button[data-action="yes"]', code).on('click', handleYes);
	$('button[data-action="no"]', code).on('click', handleNo);

	return code;
}

var displayShoppingList = function(){
	alert('This feature is not avaliable yet');
}

var displayMealPlan = function(){
	var plan = render(templates.plan, {meals : state.liked});
	$('#app').html(plan);
	$('button[data-action="shopping-list"]').on('click', displayShoppingList);
}

$('button[data-action="start"]').on('click', function(){
	$('#welcome').remove();
	processNext();
});

}());