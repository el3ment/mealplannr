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
	totalMeals : 7,

	// Settings
	vegetarian : false,
	glutenfree : false,
	nodairy : false
}

var _nextTutorialPage = 1;

//need to add boolean fields vegetarian{0,1}, glutenfree{0.1}, and dairyfree{} 

var recipies = [
{id:'3398',type:'common',title:'Omelettes',image:'../images/800px-Bacon_omelette_%281126041315%29.jpg',calories:'230',vegetarian:"1",dairyfree:"0",glutenfree:"1",time:'15 min'},
{id:'8423',type:'common',title:'Pulled Pork Sandwiches',image:'../images/800px-BBQ_Pulled_Pork.jpg',calories:'310',vegetarian:"0",dairyfree:"1",glutenfree:"0",time:'2 hours'},
{id:'4060',type:'common',title:'BLT',image:'../images/BLT_sandwich_with_baby_lettuce.jpg',calories:'200',vegetarian:"0",dairyfree:"1",glutenfree:"0",time:'15 min'},
{id:'7338',type:'common',title:'Breakfast Burritos',image:'../images/Breakfast_burritos.jpg',calories:'375',vegetarian:"0",dairyfree:"0",glutenfree:"1",time:'25 min'},
{id:'4359',type:'common',title:'Chicken Tacos',image:'../images/800px-Grilled_chicken_tacos.jpg',calories:'260',vegetarian:"0",dairyfree:"1",glutenfree:"0",time:'35 min'},
{id:'3050',type:'common',title:'Macaroni and Cheese',image:'../images/mac_and_cheese.jpg',calories:'280',vegetarian:"1",dairyfree:"0",glutenfree:"0",time:'20 min'},
{id:'4479',type:'common',title:'Sloppy Joes',image:'../images/sloppyjoe.jpg',calories:'350',vegetarian:"0",dairyfree:"1",glutenfree:"0",time:'40 min'},
{id:'3064',type:'common',title:'Beans and Rice',image:'../images/1024px-Red_beans_and_rice.jpg',calories:'270',vegetarian:"1",dairyfree:"1",glutenfree:"1",time:'45 min'},
{id:'8473',type:'common',title:'Beef Stroganoff',image:'../images/800px-Beef_Stroganoff_on_Pasta.jpg',calories:'300',vegetarian:"0",dairyfree:"1",glutenfree:"1",time:'50 min'},
{id:'1086',type:'common',title:'Grilled Cheese Sandwich and Tomato Soup',image:'../images/800px-Grilled_cheese_with_soup.jpg',calories:'200',vegetarian:"1",dairyfree:"0",glutenfree:"0",time:'10 min'},
{id:'7356',type:'common',title:'Pizza',image:'../images/1024px-Supreme_pizza.jpg',calories:'300',vegetarian:"0",dairyfree:"0",glutenfree:"0",time:'35 min'},
{id:'1322',type:'common',title:'Taco Soup',image:'../images/Taco_soup.jpg',calories:'280',vegetarian:"0",dairyfree:"0",glutenfree:"1",time:'45 min'},
{id:'4897',type:'common',title:'Lasagna',image:'../images/cheese-casserole-283285_640.jpg',calories:'340',vegetarian:"0",dairyfree:"0",glutenfree:"0",time:'2 hours'},
{id:'6732',type:'common',title:'Waffles',image:'../images/waffle-84421_640.jpg',calories:'210',vegetarian:"1",dairyfree:"1",glutenfree:"0",time:'25 min'},
{id:'5998',type:'common',title:'Grilled Steak and Veggies',image:'../images/grill-416088_640.jpg',calories:'300',vegetarian:"0",dairyfree:"1",glutenfree:"0",time:'60 min'},
{id:'5764',type:'common',title:'Enchiladas',image:'../images/mexican-245240_640.jpg',calories:'275',vegetarian:"0",dairyfree:"0",glutenfree:"1",time:'45 min'},
{id:'3479',type:'common',title:'Pancakes',image:'../images/pancake-138886_640.jpg',calories:'200',vegetarian:"1",dairyfree:"1",glutenfree:"0",time:'20 min'},
{id:'7792',type:'common',title:'Shish Kebabs',image:'../images/shish-kebab-417994_640.jpg',calories:'240',vegetarian:"0",dairyfree:"1",glutenfree:"0",time:'50 min'},
{id:'7775',type:'common',title:'Chicken Nuggets and French Fries',image:'../images/chicken-nuggets-246180_640.jpg',calories:'240',vegetarian:"0",dairyfree:"1",glutenfree:"0",time:'25 min'},
{id:'7357',type:'common',title:'Fish and Rice',image:'../images/salmon-518032_640.jpg',calories:'200',vegetarian:"0",dairyfree:"1",glutenfree:"1",time:'35 min'},
{id:'9695',type:'common',title:'Beef Tacos',image:'../images/5914832247_8aa7beac69_z.jpg',calories:'300',vegetarian:"0",dairyfree:"1",glutenfree:"0",time:'25 min'},
{id:'3306',type:'common',title:'Fried Rice',image:'../images/rice-139171_640.jpg',calories:'265',vegetarian:"1",dairyfree:"1",glutenfree:"0",time:'25 min'},
{id:'1005',type:'common',title:'Salad with Grilled Chicken and Almonds',image:'../images/salad-405070_640.jpg',calories:'160',vegetarian:"0",dairyfree:"1",glutenfree:"1",time:'25 min'},
{id:'1547',type:'common',title:'Pork Chops and Potatoes',image:'../images/food-462875_640.jpg',calories:'270',vegetarian:"0",dairyfree:"1",glutenfree:"1",time:'30 min'},
{id:'3057',type:'common',title:'Spaghetti',image:'../images/beef-17040_640.jpg',calories:'220',vegetarian:"0",dairyfree:"0",glutenfree:"0",time:'20 min'},
{id:'9657',type:'common',title:'Hamburgers',image:'../images/hamburger-494706_640.jpg',calories:'370',vegetarian:"0",dairyfree:"0",glutenfree:"0",time:'25 min'},
{id:'2508',type:'common',title:'Ramen',image:'../images/if-the-203517_640.jpg',calories:'120',vegetarian:"1",dairyfree:"1",glutenfree:"0",time:'5 min'},
{id:'8825',type:'common',title:'Chili',image:'../images/3276071522_6187d000fb_z.jpg',calories:'250',vegetarian:"0",dairyfree:"1",glutenfree:"1",time:'50 min'},
{id:'1321',type:'common',title:'Meatloaf and Cheesy Potatoes',image:'../images/eat-114297_640.jpg',calories:'300',vegetarian:"0",dairyfree:"0",glutenfree:"1",time:'2 hours'},
{id:'9722',type:'common',title:'Pot Roast',image:'../images/7331360786_4ddd499f82_z.jpg',calories:'300',vegetarian:"0",dairyfree:"1",glutenfree:"1",time:'3 hours'},
{id:'3487',type:'common',title:'Hot Dogs',image:'../images/hot-dog-21074_640.jpg',calories:'250',vegetarian:"0",dairyfree:"1",glutenfree:"1",time:'20 min'},
{id:'1440',type:'common',title:'BBQ Chicken',image:'../images/solstice-387532_640.jpg',calories:'230',vegetarian:"0",dairyfree:"1",glutenfree:"1",time:'45 min'},
{id:'1914',type:'common',title:'Fettucinne Alfredo',image:'../images/Shrimp_Fettucini_Alfredo.jpg',calories:'300',vegetarian:"1",dairyfree:"0",glutenfree:"0",time:'45 min'},
{id:'9825',type:'common',title:'Chicken Noodle Soup',image:'../images/Mmm..._chicken_noodle_soup_(4196159918).jpg',calories:'210',vegetarian:"0",dairyfree:"1",glutenfree:"0",time:'50 min'},
{id:'8612',type:'common',title:'Shepherd\'s Pie',image:'../images/2343873328_32521ef132_z.jpg',calories:'200',vegetarian:"0",dairyfree:"0",glutenfree:"0",time:'60 min'},
{id:'5724',type:'common',title:'Baked Potatoes',image:'../images/3662019664_f914cc92bd_b.jpg',calories:'175',vegetarian:"1",dairyfree:"0",glutenfree:"1",time:'60 min'},
{id:'7987',type:'common',title:'Taco Salad',image:'../images/6870397289_8542df73cc_z.jpg',calories:'250',vegetarian:"0",dairyfree:"0",glutenfree:"1",time:'30 min'},
{id:'8808',type:'common',title:'Chicken Pot Pie',image:'../images/6848890395_73ff3098f5_b.jpg',calories:'275',vegetarian:"0",dairyfree:"1",glutenfree:"1",time:'2 hours 15 min'}
];

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
	if(state.liked.length < 7){

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

$('button[data-action="displayMenuPlan"]').on('click', displayMealPlan);

$('button[data-action="start"]').on('click', function(){

	var firstPage = $(render(templates.firstPage, {}));
	$('button[data-action="continue"]', firstPage).one('click', function(){
		_nextTutorialPage = 2;
		createNew();
	});
	
	renderPage(firstPage);
	
});

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