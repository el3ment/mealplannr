!function(){var a={card:$("#tmpl-card").html(),plan:$("#tmpl-plan").html(),recipe:$("#tmpl-recipe").html(),list:$("#tmpl-shoppinglist-page").html(),firstPage:$("#tmpl-tutorial-firstPage").html(),tutorial_two:$("#tmpl-tutorial-secondPage").html(),tutorial_three:$("#tmpl-tutorial-thirdPage").html()},b={currentMeal:null,liked:[],discard:[],totalMeals:5,vegetarian:!1,glutenfree:!1,dairyfree:!1},c=1,d=[],e=function(a,b){for(var c=[],d=0;d<b.length;d++){for(var e=!1,f=0;f<a.length;f++)b[d].id==a[f].id&&(e=!0);e||c.push(b[d])}return c},f=function(a){for(var b=0,c=0;c<a.length;c++)"common"==a[c].type&&b++;return b},g=function(){var a=e(b.liked.concat(b.discard),d),c=f(b.liked),g=b.liked.length-c,h=b.totalMeals,i=2,j=h-i;b.vegetarian&&(a=$(a).filter(function(a,b){return"1"==b.vegetarian})),b.dairyfree&&(a=$(a).filter(function(a,b){return"1"==b.dairyfree})),b.glutenfree&&(a=$(a).filter(function(a,b){return"1"==b.glutenfree})),desCommon=j-c,desDiverse=i-g,probabilityOfCommon=desCommon/(desCommon+desDiverse);var k=probabilityOfCommon>Math.random()?"common":"diverse";if(a=$(a).filter(function(a,b){return b.type==k}),0==a.length)throw new Error("Out of recipies");return a[Math.floor(Math.random()*a.length)]},h=function(a,b){return Mustache.render(a,b)},i=function(){if(b.liked.length<b.totalMeals)try{b.currentMeal=g(),b.currentMeal.totalLikedPlusOne=b.liked.length+1,b.currentMeal.totalLiked=b.liked.length,b.currentMeal.totalMeals=b.totalMeals;var c=l(h(a.recipe,b.currentMeal));q(c)}catch(d){alert(d),n()}else n()},j=function(){b.discard.push(b.currentMeal),$(".recipe").addClass("showFailure"),i()},k=function(){b.liked.push(b.currentMeal),$(".recipe").addClass("showSuccess"),setTimeout(function(){i()},750)},l=function(a){return a=$(a),$('button[data-action="yes"]',a).one("click",k),$('button[data-action="no"]',a).one("click",j),a},m=function(){var c=h(a.list,{meals:b.liked});q(c)},n=function(c){var d=h(a.plan,{totalMeals:b.liked.length,meals:b.liked,commonCount:f(b.liked),diverseCount:b.liked.length-f(b.liked)});q(d,$((c||{}).target).hasClass("back")?"left":"right"),$('button[data-action="shopping-list"]').on("click",m),$('button[data-action="createNew"]').on("click",o)},o=function(){b.liked=[],b.discard=[],b.currentMeal=null,i()},p=function(){var b;switch(c){case 1:b=null;break;case 2:b=h(a.tutorial_two,{}),c++;break;case 3:b=h(a.tutorial_three,{}),c++;break;default:b=null}b=$(b),$(".subpage.onscreen").append(b),$('button[data-action="continue"]',b).one("click",function(){$(b).remove()})},q=function(a,b){b||(b="right");var c="left"==b?"right":"left";a=$(a).wrap('<div class="subpage"></div>').parent().addClass("offscreen").addClass("offscreen-"+b),$(".window").append(a),$('*[data-action="displayMenuPlan"]',a).on("click",n),setTimeout(function(){var d=$(".window .subpage.onscreen").addClass("offscreen-"+c).removeClass("offscreen-"+b+" onscreen");a.addClass("onscreen"),p(),setTimeout(function(){d.remove()},1e3)},1)},r=function(){window.google={visualization:{Query:{setResponse:function(a){for(var b=a.table.rows,c=a.table.cols,e=0;e<b.length;e++){for(var f={},g=0;g<c.length;g++){var h=c[g].label,i=(b[e].c[g]||{}).v;h.indexOf("[]")>-1&&(h=h.replace("[]",""),i=i.split("|")),f[h]=i}d.push(f)}}}}},$.ajax({url:"https://docs.google.com/spreadsheets/d/17Tn6z_to33ai4qy5S6w7EDgKloy3yotXfHsYVDNfx-o/gviz/tq?tqx=out:jsonp&tq=select+*",jsonp:"google.visualization.Query.setResponse",dataType:"jsonp"})};$('button[data-action="displayMenuPlan"]').on("click",n),$('button[data-action="start"]').on("click",function(){var b=$(h(a.firstPage,{}));$('button[data-action="continue"]',b).one("click",function(){c=2,o()}),q(b)}),r(),$(".saveState").on("click",function(a){$("#nav-trigger").prop("checked",!1),a.preventDefault()}),$('.navigation input[type="checkbox"]').on("change",function(a){b[$(a.target).attr("name")]=$(a.target).prop("checked")})}();