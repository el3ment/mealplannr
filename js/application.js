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

var recipies = [
	{id:'3398', type:'common', title:'Omelettes',image:'../images/800px-Bacon_omelette_%281126041315%29.jpg',calories:'230',time:'15 min'},
	{id:'8423', type:'common', title:'Pulled Pork Sandwiches',image:'../images/800px-BBQ_Pulled_Pork.jpg',calories:'310',time:'2 hours'},
	{id:'4060', type:'common', title:'BLT',image:'../images/BLT_sandwich_with_baby_lettuce.jpg',calories:'200',time:'15 min'},
	{id:'7338', type:'common', title:'Breakfast Burritos',image:'../images/Breakfast_burritos.jpg',calories:'375',time:'25 min'},
	{id:'4359', type:'common', title:'Chicken Tacos',image:'../images/800px-Grilled_chicken_tacos.jpg',calories:'260',time:'35 min'},
	{id:'3050', type:'common', title:'Macaroni and Cheese',image:'../images/mac_and_cheese.jpg',calories:'280',time:'20 min'},
	{id:'4479', type:'common', title:'Sloppy Joes',image:'../images/sloppyjoe.jpg',calories:'350',time:'40 min'},
	{id:'3064', type:'common', title:'Beans and Rice',image:'../images/1024px-Red_beans_and_rice.jpg',calories:'270',time:'45 min'},
	{id:'8473', type:'common', title:'Beef Stroganoff',image:'../images/800px-Beef_Stroganoff_on_Pasta.jpg',calories:'300',time:'50 min'},
	{id:'1086', type:'common', title:'Grilled Cheese Sandwich and Tomato Soup',image:'../images/800px-Grilled_cheese_with_soup.jpg',calories:'200',time:'10 min'},
	{id:'7356', type:'common', title:'Pizza',image:'../images/1024px-Supreme_pizza.jpg',calories:'300',time:'35 min'},
	{id:'1322', type:'common', title:'Taco Soup',image:'../images/Taco_soup.jpg',calories:'280',time:'45 min'},
	{id:'4897', type:'common', title:'Lasagna',image:'../images/cheese-casserole-283285_640.jpg',calories:'340',time:'2 hours'},
	{id:'6732', type:'common', title:'Waffles',image:'../images/waffle-84421_640.jpg',calories:'210',time:'25 min'},
	{id:'5998', type:'common', title:'Grilled Steak and Veggies',image:'../images/grill-416088_640.jpg',calories:'300',time:'60 min'},
	{id:'5764', type:'common', title:'Enchiladas',image:'../images/mexican-245240_640.jpg',calories:'275',time:'45 min'},
	{id:'3479', type:'common', title:'Pancakes',image:'../images/pancake-138886_640.jpg',calories:'200',time:'20 min'},
	{id:'7792', type:'common', title:'Shish Kebabs',image:'../images/shish-kebab-417994_640.jpg',calories:'240',time:'50 min'},
	{id:'7775', type:'common', title:'Chicken Nuggets and French Fries',image:'../images/chicken-nuggets-246180_640.jpg',calories:'240',time:'25 min'},
	{id:'7357', type:'common', title:'Fish and Rice',image:'../images/salmon-518032_640.jpg',calories:'200',time:'35 min'},
	{id:'9695', type:'common', title:'Beef Tacos',image:'../images/5914832247_8aa7beac69_z.jpg',calories:'300',time:'25 min'},
	{id:'3306', type:'common', title:'Fried Rice',image:'../images/rice-139171_640.jpg',calories:'265',time:'25 min'},
	{id:'1005', type:'common', title:'Salad with Grilled Chicken and Almonds',image:'../images/salad-405070_640.jpg',calories:'160',time:'25 min'},
	{id:'1547', type:'common', title:'Pork Chops and Potatoes',image:'../images/food-462875_640.jpg',calories:'270',time:'30 min'},
	{id:'3057', type:'common', title:'Spaghetti',image:'../images/beef-17040_640.jpg',calories:'220',time:'20 min'},
	{id:'9657', type:'common', title:'Hamburgers',image:'../images/hamburger-494706_640.jpg',calories:'370',time:'25 min'},
	{id:'2508', type:'common', title:'Ramen',image:'../images/if-the-203517_640.jpg',calories:'120',time:'5 min'},
	{id:'8825', type:'common', title:'Chili',image:'../images/3276071522_6187d000fb_z.jpg',calories:'250',time:'50 min'},
	{id:'1321', type:'common', title:'Meatloaf and Cheesy Potatoes',image:'../images/eat-114297_640.jpg',calories:'300',time:'2 hours'},
	{id:'9722', type:'common', title:'Pot Roast',image:'../images/7331360786_4ddd499f82_z.jpg',calories:'300',time:'3 hours'},
	{id:'3487', type:'common', title:'Hot Dogs',image:'../images/hot-dog-21074_640.jpg',calories:'250',time:'20 min'},
	{id:'1440', type:'common', title:'BBQ Chicken',image:'../images/solstice-387532_640.jpg',calories:'230',time:'45 min'},
	{id:'1914', type:'common', title:'Fettucinne Alfredo',image:'../images/Shrimp_Fettucini_Alfredo.jpg',calories:'300',time:'45 min'},
	{id:'9825', type:'common', title:'Chicken Noodle Soup',image:'../images/Mmm..._chicken_noodle_soup_(4196159918).jpg',calories:'210',time:'50 min'},
	{id:'8612', type:'common', title:'Shepherd\'s Pie',image:'../images/2343873328_32521ef132_z.jpg',calories:'200',time:'60 min'},
	{id:'5724', type:'common', title:'Baked Potatoes',image:'../images/3662019664_f914cc92bd_b.jpg',calories:'175',time:'60 min'},
	{id:'7987', type:'common', title:'Taco Salad',image:'../images/6870397289_8542df73cc_z.jpg',calories:'250',time:'30 min'},
	{id:'8808', type:'common', title:'Chicken Pot Pie',image:'../images/6848890395_73ff3098f5_b.jpg',calories:'275',time:'2 hours 15 min'},
	{"id":"Chicken-Caesar-Pita-548482","title":"Chicken Caesar Pita","calories":558,"time":"36 min","type":"diverse","image":"http://lh6.ggpht.com/DZ5iFrUin4rIqrs3pLK2y-iJwDKMsOrV1YdWGosUClHkN7FvuU1DLCV1J9jvQT-ocyWOwfiIE_NLMutj25dwRQ=s500-c"},{"id":"Dinner-Calzones-My-Recipes","title":"Dinner Calzones","calories":674,"time":"22 min","type":"diverse","image":"http://lh4.ggpht.com/c5Kje9uXCM5yJeE-3EW5dLAIECyABwo2Y8bjrBSu4KZ9g-htUKfGVhpvc7FgNiQwmo955li8g5thK7TfvwzxHg=s500-c"},{"id":"Salami-_-Buffalo-Mozzarella-Pizza-548478","title":"Salami & Buffalo Mozzarella Pizza","calories":354,"time":"21 min","type":"diverse","image":"http://lh3.ggpht.com/Z-YPCsTCEnPYibSA6gXeID8J_PniFJZgLerZnk4XipAY-EbYZ3_lohzxTqg0djxp1QNblN6zJub8OWSlCMnE=s500-c"},{"id":"Potato-and-Mozzarella-Naan-Pizza-548490","title":"Potato and Mozzarella Naan Pizza","calories":320,"time":"7 min","type":"diverse","image":"http://lh5.ggpht.com/26OxYcA32bQWRrlG9hx4Ld-CqE4oP33MV92jwVw4Cx-xN4zFcuvpmAhsCYHQZzSr6tg_KcbMnFpWW5s3KPTE=s500-c"},{"id":"Hobo-Dinner-Allrecipes","title":"Hobo Dinner","calories":741,"time":"6 min","type":"diverse","image":"http://lh5.ggpht.com/Eh6hxSdI0sobUYAo1LwY5ehrjXtqjbKo6uSWju1uiIXzeV0Ps9MuPMfL4uTinCQ_arIIKVk6-GhAWaj2xApVrw=s500-c"},{"id":"Gorgonzola_-Onion-and-Rosemary-Naan-Pizza-548491","title":"Gorgonzola, Onion and Rosemary Naan Pizza","calories":532,"time":"33 min","type":"diverse","image":"http://lh4.ggpht.com/CWYYEq-JlaQOnqeMHn5em9ydGxZ7RsgCqmUrJC-K_3X87j_SGRRT5_OdOR7AUoVLaBUeWxV8HOsyQas-kHZmybQ=s500-c"},{"id":"Chicken-Naanwich-with-Pesto-Mayo-548481","title":"Chicken Naanwich with Pesto Mayo","calories":330,"time":"35 min","type":"diverse","image":"http://lh6.ggpht.com/jQEUSMqsNgzq2MT7orL8mIvuhCiwbxvod_Lhd60OiFo8JpV_Tr7KVnLPCVj_VJ0pjRwHdRgW90ycOaQBz4WbOfQ=s500-c"},{"id":"Dinner-In-A-Packet-TasteOfHome","title":"Dinner in a Packet","calories":677,"time":"21 min","type":"diverse","image":"http://lh5.ggpht.com/XK7dVXuKnC54nlmM6MIWgAoZO2ZA9DsWowgyoGiahBfpPrJ8J_Kmg-_Zw4x9ImV__5YdAh_CbSAjOoqyFDWpUaQ=s500-c"},{"id":"Grilled-Vegetable-and-Goat-Cheese-Pizza-548477","title":"Grilled Vegetable and Goat Cheese Pizza","calories":305,"time":"28 min","type":"diverse","image":"http://lh3.ggpht.com/IKjelr2haDniRPA0z4FGfmNHtWJ2v8TSc5vTPEo27OEKKkB7MBv23OAdfZSuPzsA8Xo9PgZGDAoKm6Ql3POu0A=s500-c"},{"id":"Raspberry-Nutella-Naan-Pizza-548496","title":"Raspberry Nutella Naan Pizza","calories":459,"time":"5 min","type":"diverse","image":"http://lh4.ggpht.com/L2U6zD8T1hVNwa_KCdxwoOQ2o8EkbgW8t-rvllf3MMXyzdqwCwaqNG9X0bUDE_-D9tIOXaVnGGDpXwzltw0O=s500-c"},{"id":"Sweet-chili-chicken-grilled-cheese-sandwich-351206","title":"Sweet Chili Chicken Grilled Cheese Sandwich","calories":633,"time":"15 min","type":"diverse","image":"http://lh4.ggpht.com/yhdW0wkHcGMa8vMtB6xynaDXLc4ZGDbkwsnRkuURXxskHOjG3HVjRCEM0pFfCuXWa8RXX1JvfUP-7r3-6f8QGx4=s500-c"},{"id":"Grilled-Ham-and-Cheese-Sandwiches-Martha-Stewart-194413","title":"Grilled Ham and Cheese Sandwiches","calories":196,"time":"14 min","type":"diverse","image":"http://lh5.ggpht.com/aEQZQRSq5xvWz79q7ubZAsdklKrI4ghilFPlzZmeqTJJy0-kaS0n05zNAoHQqQ8TO_LLt22ByQBSbT46dxlh=s500-c"},{"id":"Crockpot-pulled-pork-_-beer-cheese-grilled-cheese-sandwiches-333339","title":"Crockpot Pulled Pork + Beer Cheese Grilled Cheese Sandwiches","calories":383,"time":"16 min","type":"diverse","image":"http://lh6.ggpht.com/8IePY1QVDnFRWIO0VtXkKalX0RbIW2XKndmbfxyjfEfx8v-Ql3hUAI879FguvFmpdhAWKR27AiPydTYYUHuopQ=s500-c"},{"id":"Corned-beef-cuban-grilled-cheese-sandwich-351490","title":"Corned Beef Cuban Grilled Cheese Sandwich","calories":449,"time":"32 min","type":"diverse","image":"http://lh5.ggpht.com/FHfSUUTkPh33zcM5BpPcT05nhGV0CHuDq-gEGkp8BydLioTp-YJrZy4McWXUVTgdUQ83_-alN5ZvQgUlJqI8eUI=s500-c"},{"id":"Grilled-Chicken-_-Yam-Sandwhich-548311","title":"Grilled Chicken & Yam Sandwhich","calories":393,"time":"42 min","type":"diverse","image":"http://lh6.ggpht.com/ZfClvP1NeAr0MjjffqE8QGB93QJIwCllEXt_1mYCS6drKtxY-MtY0q5l0790J5aLd0ll_7Y1NX-NC4-SV3jfhA=s500-c"},{"id":"Chipotle-Grilled-Chicken-with-Avocado-Sandwich-Simply-Recipes-42983","title":"Chipotle Grilled Chicken with Avocado Sandwich","calories":292,"time":"48 min","type":"diverse","image":"http://lh6.ggpht.com/Wk3OIwCsjtHmwsCOWQ-QYSoxhoNpp4A6yQzY320C1DcXnUUAuxfXTFzIAb3s0To3Ezhvk14j8ctqwt_BFD7Svw=s500-c"},{"id":"Grilled-Chicken-Sandwich-with-Apricot-Sauce-The-Pioneer-Woman-Cooks-_-Ree-Drummond-41268","title":"Grilled Chicken Sandwich with Apricot Sauce","calories":316,"time":"42 min","type":"diverse","image":"http://lh6.ggpht.com/ZSf2qb3qCt9DwKc7dGoyt5v7C4vM4sWYqgYG2Y88gKYfF9ewDzsXvNxw6DwVFmjNNEAcYafScWO0LA7D-hOK-w=s500-c"},{"id":"Sweet-Grilled-Chicken-Sandwich-AllRecipes-38574","title":"Sweet Grilled Chicken Sandwich","calories":206,"time":"36 min","type":"diverse","image":"http://lh5.ggpht.com/oSUnaICFl5GmuW76ASPn-siMYRvlFhwOcTeVyeKNmRSMV8_3dqOR3Lq8G2_0y_4JfgYwLvjN-3pDl0l7xbkMTYc=s500-c"},{"id":"Grilled-steak_-avocado_-and-spicy-crema-sandwiches-302358","title":"Grilled Steak, Avocado, and Spicy Crema Sandwiches","calories":746,"time":"38 min","type":"diverse","image":"http://lh3.ggpht.com/TCUQGC1vMOC40BWSpqIOPhgUumNrKGwxx_64KFD_g6wmvGedex6dLqbeaaoWSFgp5au7986kZs_18kHSrwYsIg=s500-c"},{"id":"Corned-beef-grilled-cheese-sandwich-with-guinness-caramelized-onions-350966","title":"Corned Beef Grilled Cheese Sandwich with Guinness Caramelized Onions","calories":647,"time":"6 min","type":"diverse","image":"http://lh4.ggpht.com/aNzrxau74UZ2hGAb1JJ-glSYhb-mHTB8NbKEP0pOYe9ZoI_ErvCSKb4WTUwnuE4DDpJpRiSNawrsveTahafcdgI=s500-c"},{"id":"Edamame-soup-308789","title":"Edamame Soup","calories":430,"time":"8 min","type":"diverse","image":"http://lh4.ggpht.com/ABQ59x4SlUoomDBy4M3_x_bdG7NGeorhY3Sq_lpCuDVKiByTvcBqkavxp_m7SxkCEBVHPzrXhRzhJE0-DNpEmA=s500-c"},{"id":"Spaghetti-Soup-Allrecipes","title":"Spaghetti Soup","calories":622,"time":"14 min","type":"diverse","image":"http://lh3.ggpht.com/wggO0g0EMCZ1NoDZUwrBxI7TkFdL5nhUKXDnAqT7EA-kHLL4OR4-yZ4oTu9gmuWMQf6pZ4H92rXn8BMtpY4jmts=s500-c"},{"id":"Veggie-pho-_vietnamese-noodle-soup_-333149","title":"Veggie Pho (Vietnamese Noodle Soup)","calories":678,"time":"29 min","type":"diverse","image":"http://lh3.ggpht.com/ILdl5mqYE_pPwr8805NcOwW_ekY7KEPKb8Tnj06UDFRHOttXMZB41sNozd5T9uqYIrdycTdPO37W_baepIji6w=s500-c"},{"id":"Italian-Meatball-Soup-The-Pioneer-Woman-Cooks-_-Ree-Drummond-41291","title":"Italian Meatball Soup","calories":305,"time":"44 min","type":"diverse","image":"http://lh3.ggpht.com/m2V6k_pNT8IeyIxTYYsmbI0XOaJMsOudx1XnmI7rYDtAHBJD_TKdvzV2aKZ2yAGwidUQo9olOF5Mn0ca2W3Lcw=s500-c"},{"id":"Stroganoff-Soup-Allrecipes","title":"Stroganoff Soup","calories":646,"time":"45 min","type":"diverse","image":"http://lh3.ggpht.com/xMVyfLwLWaaaBJk7Fzu3duslKrdpisJ7Kb7cO2-X1irtAMTPzD7i7Y6oV9oHmAsanjPbuVspbnSrbe_8x5IZnA=s500-c"},{"id":"Cannellini-bean-soup-with-roasted-italian-sausage-and-escarole-309660","title":"Cannellini Bean Soup with Roasted Italian Sausage and Escarole","calories":343,"time":"37 min","type":"diverse","image":"http://lh4.ggpht.com/mIvcRlJJJnBQgKkxNjwxSCX18AvZKDKRS77wY20wdq_7hsCwAsB0yYz_RqGrZyqb9zTU_cdAhSH7u9jPe43R=s500-c"},{"id":"Lentil-soup-recipe-with-italian-sausage-and-roasted-red-peppers-309689","title":"Lentil Soup with Italian Sausage and Roasted Red Peppers","calories":428,"time":"18 min","type":"diverse","image":"http://lh6.ggpht.com/BrR6Y2RDVS5kjnJngpuYbLuH7VmlXcI-sQN1sLiFeYlOf2iTvyPf6Z2hve2GjZlfeGSAa87z2kO-fnJYuhIpzA=s500-c"},{"id":"Beef-macaroni-soup-331130","title":"Beef Macaroni Soup","calories":164,"time":"40 min","type":"diverse","image":"http://lh6.ggpht.com/EZSChRwu_NnXD1of26ZL2ARpLO6h2vUsn_hxc7UGJDohRlNy_YxkWcrF5uXkt-I9gVtHEeGNbzK40LQZtBJEHg=s500-c"},{"id":"Black-eyed-pea-and-mexican-chorizo-soup-305792","title":"Black-eyed-pea and Mexican chorizo soup","calories":696,"time":"21 min","type":"diverse","image":"http://lh4.ggpht.com/4RP5zGgqTAlGh-g_teVQia5JLhlQOAPGRlEJXy8__JRsTJpZ7mevAwI9yEhuHHFjc64si2BG7s7lHo8VwI5z=s500-c"},{"id":"Adzuki-butternut-squash-soup-308766","title":"Adzuki Butternut Squash Soup","calories":234,"time":"12 min","type":"diverse","image":"http://lh5.ggpht.com/CYAkdF5XuF5evVU-dDnEvDwRBssIShcGJrgXb4uIpw3QSo5TNSVC9fVjavAHS0yQ_FMCQ8cYpi2ug9rn_QaU-A=s500-c"},{"id":"Chicken-Caesar-Pita-548482","title":"Chicken Caesar Pita","calories":380,"time":"27 min","type":"diverse","image":"http://lh6.ggpht.com/DZ5iFrUin4rIqrs3pLK2y-iJwDKMsOrV1YdWGosUClHkN7FvuU1DLCV1J9jvQT-ocyWOwfiIE_NLMutj25dwRQ=s500-c"},{"id":"Chicken-Naanwich-with-Pesto-Mayo-548481","title":"Chicken Naanwich with Pesto Mayo","calories":555,"time":"49 min","type":"diverse","image":"http://lh6.ggpht.com/jQEUSMqsNgzq2MT7orL8mIvuhCiwbxvod_Lhd60OiFo8JpV_Tr7KVnLPCVj_VJ0pjRwHdRgW90ycOaQBz4WbOfQ=s500-c"},{"id":"Creamy-Chicken-Allrecipes","title":"Creamy Chicken","calories":716,"time":"20 min","type":"diverse","image":"http://lh3.ggpht.com/gxCuuaWwmnS2nN9gKM6SYpBd-MIwYDO-Bzmg5Onx0BZqHIrAV_9FihUvPxEnvqzBJ4Sj5chGig41Px_nY4sqzg=s500-c"},{"id":"Grilled-Chicken_Pesto-and-Two-Cheese-Naan-Pizza-548489","title":"Grilled Chicken,Pesto and Two Cheese Naan Pizza","calories":334,"time":"47 min","type":"diverse","image":"http://lh3.ggpht.com/5WMq3ypOB8HE8l6mlFAoIy9kUsG5snzcXmqcmWV2ANK2p0WaJ6N2DUr33FoscBB5LIhD8v_PhP2LYqNDn3xAcf4=s500-c"},{"id":"Unbelievable-Chicken-Allrecipes","title":"Unbelievable Chicken","calories":226,"time":"43 min","type":"diverse","image":"http://lh3.ggpht.com/e-kg46EPuSNH4oVX-3iQWZ_zW7BC2YTSJzw_23UmSCftSiNUL2C2y_lVop4IlpP7-n9C_Dz_df2E_gkI8dkGXGA=s500-c"},{"id":"Roasted-Chicken_-Bacon-and-Tomato-Alfredo-pizza-548484","title":"Roasted Chicken, Bacon and Tomato Alfredo pizza","calories":305,"time":"49 min","type":"diverse","image":"http://lh5.ggpht.com/u4O1_0Wo-vQKC70ca7YB3VaN1cqsDYJqvAjisfmC2WyigBfuyrdwhyzM4qyhEw2mTlpNa5AVZW0BX89o5fG6UJk=s500-c"},{"id":"Chicken-Fritz-466963","title":"Chicken Fritz","calories":360,"time":"47 min","type":"diverse","image":"http://lh3.ggpht.com/UxAXD4WzOGsSRbRH1MGq8BiiDJn-CQ95khtRooSe8vQL9ISciXr1vBxie2YCsrzdiwVd-Kf9IQ7YpGtk_zmBf1o=s500-c"},{"id":"Lighter-Chicken-Enchiladas-Martha-Stewart","title":"Lighter Chicken Enchiladas","calories":712,"time":"32 min","type":"diverse","image":"http://lh5.ggpht.com/1c3CdCtn_YoopGU_y6fvt6xFS9FC58jOoJG0cSYGjrGubYc40MH000_2gmTZUmTOb-HoGGqoSSXGOFPzlEAalg=s500-c"},{"id":"Chicken-florentine-bowtie-pasta-334939","title":"Chicken Florentine Bowtie Pasta","calories":426,"time":"30 min","type":"diverse","image":"http://lh5.ggpht.com/oeLx_E9OmzThj-VGPmXCLQ2U2SHsMqzn3pY0WMfsom1FMA2dhU_HCCJ4x-UjM0CfuZVrtlQlG317JTL4iSlV9A=s500-c"},{"id":"Chicken-Caprese-512479","title":"Chicken Caprese","calories":659,"time":"31 min","type":"diverse","image":"http://lh5.ggpht.com/MxMrfdlGI8sXJK0lLp3g-Y_FpJrx0JI3zx06jOMf_YUkLUzdDFNR-c7KKiwE10xP5PksrSsjcvf7qphDApWT=s500-c"},{"id":"Mexican-Tostada-Simply-Recipes-42642","title":"Mexican Tostada","calories":384,"time":"19 min","type":"diverse","image":"http://lh4.ggpht.com/3GymAC0L-GZ7Hi3s8EXD7t0DSIQqGmBgkzRNqQsSPzm-v8SDNmb5X7sDfu0sAxyXz_qtNxsNU1jZ-NQyLB8yjg=s500-c"},{"id":"Mexican-lasagna-303683","title":"Mexican Lasagna","calories":420,"time":"29 min","type":"diverse","image":"http://lh4.ggpht.com/y298eQfR62fiX9obk5d0iewQxmieK0gEkEkPySV_Bl1XQNA0subOAE79sFz7Eg4jZtkPjnCgADeLcGLjUVba2A=s500-c"},{"id":"MEXICAN-CHICKEN-753885","title":"MEXICAN CHICKEN","calories":619,"time":"10 min","type":"diverse","image":"http://lh6.ggpht.com/UVt6BTbbCrafsNxLMI5b1mBy737DNi_ykKzMMTEQWEy0cVuVSV2FgeSaztRVBZwPnsJMbMyxgGCYl0CWeaFnfA=s500-c"},{"id":"Mexican-red-lentil-stew-with-lime-and-cilantro-309454","title":"Mexican Red Lentil Stew with Lime and Cilantro","calories":389,"time":"6 min","type":"diverse","image":"http://lh5.ggpht.com/74GEO9PD1CDAFIqbhRenkiyh-jmka_K2XxbibEMqJKoCsV24cT53PyIP2c1YHHu1Q1astqa24rxMQ0Qgdz08=s500-c"},{"id":"Mexican-Tinga-Allrecipes","title":"Mexican Tinga","calories":250,"time":"16 min","type":"diverse","image":"http://lh6.ggpht.com/Uv5YUOvReNKUTNaTGrEmRqYCJ55dYyMDVGYz4_Tv_RDDDCaBB3X-ZyN0cF4UKfwU9oEBkzpbNgqNOOPkBIEd5Q=s500-c"},{"id":"Black-eyed-pea-and-mexican-chorizo-soup-305792","title":"Black-eyed-pea and Mexican chorizo soup","calories":603,"time":"7 min","type":"diverse","image":"http://lh4.ggpht.com/4RP5zGgqTAlGh-g_teVQia5JLhlQOAPGRlEJXy8__JRsTJpZ7mevAwI9yEhuHHFjc64si2BG7s7lHo8VwI5z=s500-c"},{"id":"Mexican-braid-341445","title":"Mexican Braid","calories":267,"time":"47 min","type":"diverse","image":"http://lh4.ggpht.com/YGfdSoxCGHx7029e0itld-6rbuhZLkzfQVXQe09ulRrpNLib8g1hu7AmHC_BHlfRLCo-UxeBUYF29-wzyjv8HA=s500-c"},{"id":"Mexican-baked-eggs-with-black-beans_-tomatoes_-green-chiles_-and-cilantro-309552","title":"Mexican Baked Eggs with Black Beans, Tomatoes, Green Chiles, and Cilantro","calories":235,"time":"17 min","type":"diverse","image":"http://lh5.ggpht.com/c7nYpWhcik_RYT-GLEHUc6hDSxsUOi-UgqkeZ5bwMhs-8iwCgQzJOR549tZ0pKyjVkEyXd_8BuYCi9h1tnCPYvU=s500-c"},{"id":"Tequila-lime-chicken-307229","title":"Tequila Lime Chicken","calories":749,"time":"41 min","type":"diverse","image":"http://lh4.ggpht.com/uYUOyeEDAuwYN-YlgvyXCl-_Sqi5yV12k2GZ1NhIcuE5nNtCItLjRFW-BcyxUzNlO_9IONMeholXYCmiRRPCsA=s500-c"},{"id":"Mexican-burgers-297850","title":"Mexican Burgers","calories":336,"time":"7 min","type":"diverse","image":"http://lh5.ggpht.com/BDax4GQv3GVWJ3MFCF-1MC8jVSESStbPYSZLmKpZ4p6iP8FhIjLcQLkvG4nuF2durZdNra8DBCTXMHQMN3Nh5Q=s500-c"},{"id":"Honey-garlic-chicken-slow-cooker-310273","title":"Honey Garlic Chicken Slow Cooker","calories":650,"time":"13 min","type":"diverse","image":"http://lh5.ggpht.com/9gJds6KpsROhDy_a8H7AQ6Hgc0y3A3EqSa1E0XNImhrpv8n5Fw_SIUb-a1mRy8Ek-g700Gi7s9JZauTFfPtGHA=s500-c"},{"id":"Slow-Cooker-Garlic-Chicken-with-Couscous-Martha-Stewart-260123","title":"Slow-Cooker Garlic Chicken with Couscous","calories":529,"time":"47 min","type":"diverse","image":"http://lh5.ggpht.com/R7uvVjRRLWMlCp4qcdUFT9YkNXB01cY0jZQffHLpPw4Sbbw-BTd22Ij_K2e42QrI72Qh9bzF0YbFvAx-hbGyaqA=s500-c"},{"id":"Chicken-Caesar-Pita-548482","title":"Chicken Caesar Pita","calories":398,"time":"25 min","type":"diverse","image":"http://lh6.ggpht.com/DZ5iFrUin4rIqrs3pLK2y-iJwDKMsOrV1YdWGosUClHkN7FvuU1DLCV1J9jvQT-ocyWOwfiIE_NLMutj25dwRQ=s500-c"},{"id":"Chicken-Naanwich-with-Pesto-Mayo-548481","title":"Chicken Naanwich with Pesto Mayo","calories":247,"time":"29 min","type":"diverse","image":"http://lh6.ggpht.com/jQEUSMqsNgzq2MT7orL8mIvuhCiwbxvod_Lhd60OiFo8JpV_Tr7KVnLPCVj_VJ0pjRwHdRgW90ycOaQBz4WbOfQ=s500-c"},{"id":"Shrimp-with-Garlic-and-Lemon-Martha-Stewart","title":"Shrimp with Garlic and Lemon","calories":304,"time":"47 min","type":"diverse","image":"http://lh5.ggpht.com/AFhM81ogorSkL62xuICnX7DONc61SnX080lidUIrdZ9KK-HyGpmqq-HrnF7UDTKUIOHjULWJYfF-s5_5coH-Ng=s500-c"},{"id":"Roasted-Chicken_-Bacon-and-Tomato-Alfredo-pizza-548484","title":"Roasted Chicken, Bacon and Tomato Alfredo pizza","calories":434,"time":"41 min","type":"diverse","image":"http://lh5.ggpht.com/u4O1_0Wo-vQKC70ca7YB3VaN1cqsDYJqvAjisfmC2WyigBfuyrdwhyzM4qyhEw2mTlpNa5AVZW0BX89o5fG6UJk=s500-c"},{"id":"Grilled-Chicken_Pesto-and-Two-Cheese-Naan-Pizza-548489","title":"Grilled Chicken,Pesto and Two Cheese Naan Pizza","calories":459,"time":"12 min","type":"diverse","image":"http://lh3.ggpht.com/5WMq3ypOB8HE8l6mlFAoIy9kUsG5snzcXmqcmWV2ANK2p0WaJ6N2DUr33FoscBB5LIhD8v_PhP2LYqNDn3xAcf4=s500-c"},{"id":"Linguine-with-Garlic-and-Breadcrumbs-Martha-Stewart","title":"Linguine with Garlic and Breadcrumbs","calories":405,"time":"7 min","type":"diverse","image":"http://lh6.ggpht.com/8is25yBsSHhZ2u-xN6l2w4uE2iN1h3QdD6tEIwjydkuy-GJ9wsB0-C_8720z0E99F4PvIW_nFvloRIldDAPQ=s500-c"},{"id":"Prosciutto-and-Arugula-Pizza-548486","title":"Prosciutto and Arugula Pizza","calories":342,"time":"34 min","type":"diverse","image":"http://lh4.ggpht.com/FCRlO-SGDarFd8OG6mJ5igCYNTw8ZCLL9XWaKw96VKdl3a6qmdQ68sV8xXMRrmqM9XXAOJRyiD2INTKuYTLk=s500-c"},{"id":"Salami-_-Buffalo-Mozzarella-Pizza-548478","title":"Salami & Buffalo Mozzarella Pizza","calories":489,"time":"36 min","type":"diverse","image":"http://lh3.ggpht.com/Z-YPCsTCEnPYibSA6gXeID8J_PniFJZgLerZnk4XipAY-EbYZ3_lohzxTqg0djxp1QNblN6zJub8OWSlCMnE=s500-c"}
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

	var unusedRecipies = getUnusedRecipies(state.liked.concat(state.discard), recipies);
	var commonCount = getCommonCount(state.liked);
	var diverseCount = state.liked.length - commonCount;

	if(commonCount < 5 && diverseCount < 2)
		probabilityOfCommon = 0.5;
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
	$('.welcome').remove();

	var firstPage = $(render(templates.firstPage, {}));
	$('button[data-action="continue"]', firstPage).one('click', function(){
		_nextTutorialPage = 2;
		createNew();
	});
	
	renderPage(firstPage);
	
});

$().ready(preloadImages);

$('.navigation input[type="checkbox"]').on('change', function(e){
	state[$(e.target).attr('name')] = $(e.target).prop('checked');
});

}());