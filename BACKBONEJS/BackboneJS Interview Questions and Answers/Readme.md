# BackboneJS Interview Question and Answers

###1. How do you sort a collection? When is it important to explicitly invoke “sort()” on a collection?

With Backbone.js, collections can be sorted by defining comparator on the collection object. By default, collections are not explicitly sorted. By defining a comparator, a collection is sorted whenever a model is added or the “sort()” method is invoked on a collection:

	var Fruits = Backbone.Collection.extend({
		comparator: function(a, b) { /* .. */ }
	})
	// Or
	var Fruits = Backbone.Collection.extend({})
	var fruits = new Fruits()
	fruits.comparator = function(a, b) { /* .. */ }

The comparator property can be a function with one argument (similar to one used in “sortBy”) or two arguments (similar to one used in “sort”), or a string identifying the attribute by name to sort on.

When an attribute of a model in a collection changes, the collection doesn’t sort itself. This is a scenario where sort must be invoked explicitly to update the order of models in the collection.

###2. What are some alternatives to Backbone.js’s dependencies?

Backbone.js has only one hard dependency: Underscore.js. However, you often need to include jQuery and json2.js to support certain features. Sometimes it is possible to use Lo-Dash and Zepto (two more lightweight alternatives to Underscore.js and jQuery) when it comes to using Backbone.js.


###3.Why would you want to bind event handlers using “listenTo()” instead of “on()”?

There are two advantages to using “listenTo()” instead of using “on()”. Typically, the way they are used is a bit different:

	listener.listenTo(object, event, callback)
	object.on(event, callback)

With “listenTo()”, the object whose events you want to listen to is passed as the first argument. In the case of “on()”, it is actually a method on that object.

The advantages of “listenTo()” over “on()” are:

The listener keeps track of all the event handlers, making it easier to remove them all at once when needed.
The callback’s context is always set to the listener itself.

###4. What function would you change to override Backbone.js’s default support for REST APIs?

To override the default behavior on a per-model basis, you can set a custom function to “Model.sync”. To make the change global, you can set the custom function to “Backbone.sync”. Ideally, the “sync” function should handle four methods: “create”, “read”, “update”, and “delete”. The function receives the CRUD method name, the model itself, and an object with some additional options. Sometimes setting “Backbone.emulateJSON” to true can often do the job, in which case all you need to do is submit requests as “application/x-www-form-urlencoded” instead of “application/json”.

###5. How can you watch for changes on a single attribute of a model?

Model objects fire the “change” event whenever some data changes within the model. However, the object fires another event with a name specific to the attribute that has changed: “change:[attribute]”. For example:

	var Fruit = Backbone.Model.extend({})
	var fruit = new Fruit({
		weight: 3.25
	})
	fruit.on(‘change:weight, function() {
		// Event “change:weight” will fire whenever the weight attribute of fruit changes.
	})


###6. How do you define a model that when you try to fetch or save uses the URL “/api/records/{timestamp}”? Where “{timestamp}” is the number of seconds elapsed since epoch.

URLs for models are defined by setting the “url” attribute. The attribute can be set as a string or a function. We can set a function that returns a string satisfying the URL pattern in question:

	var Record = Backbone.Model.extend({
		url: function() {
			return ‘/api/records/’+Math.round(new Date().getTime()/1000)
		}
	})

Another less recommended approach to this would be to use an appropriately generated URL whenever and wherever you invoke “fetch()”.

###7. Why is it not recommended to change the “el” property of a view directly? How should it be done instead?

Attempting to change the “el” property may lead to inconsistent behavior from the Backbone view. This is because changing the “el” property directly doesn’t automatically update the cached jQuery object property corresponding to it, which is “$el”. The correct way to do this is to use “setElement()” on the view:

	view.setElement(otherElement)

###8. What is the difference between the properties “id” and “cid” on a model object?

The “id” property on a model is automatically assigned based on the “id” set in the model’s attributes hash. Ideally, this is the ID that you receive from the rest API for the resource that you are querying. On the other hand, “cid” is an ID temporarily assigned to each model and is useful until an actual ID is determined for the object. For example, a model pushed to a collection that has not yet been persisted can be addressed using “cid”, until it is saved in the database and an actual ID is generated for it.

###9. Explain what is backbone.js ?

Backbone.js is a JavaScript client-side (front end) framework, which helps to organize your code and makes it easier to develop single page applications.  It allows you to structure JavaScript code in an MVC  (Model, View , Controller) fashion

* Model: It is a part of your code that populates  and retrieves the data
* View: It is the HTML representation of this model
* Controller:  It enables you to save your javascript application via a hashbang URl

###10. What are the main components of Backbone.js ?

The main component of Backbone.js are

* Model
* View
* Collection
* Router
* Event class object

###11.Explain what is Backbone.js collections ?

An ordered set of models are represented by Backbone.js collections. Any event in model will trigger an event in collection directly.  For example, you can bind “change” event to be notified in a case when any model in the collection has been modified.

###12. Explain what is Backbone.js router is used for ?

Whenever an application want to change their URL fragment in order to provide bookmarkable and shareable URLs for an Ajax heavy application, backbone.js router is used.

###13. What is Backbone events ?

Backbone events is a module that can be mixed in to any object,  giving the object the ability to bind and trigger custom named events.  Events are not declared before they are bound to any object . Events reflects the state of the model.

###14. What are the keypoints of Backbone ?

* It has hard dependency with underscore.js to make it more functional and supporting a range of useful collection based operations
* With jQuery it has a soft dependency
* When the model changes it can update the HTML of your application automatically
* It uses client-side rendering framework or Javascript templating to render html which avoid you to embed HTML code inside JavaScript code
* For UI updates and DOM manipulations if offers a significantly clean and elegant way

###15.Why you have to use Backbone ? Advantages ?

* By using JavaScript with the minimal set of data-structuring ( models & collections) and user interface (views & URLs) it enables you to develop a web application
* Backbone is best useful to develop MVC like web applications, single page web applications or complex JavaScript web applications in an organized and structured manner without JavaScript code mixing with HTML
* Provides key value binding and custom events
* API with tons of functions
* Robust event handling
* API connetion over a RESTful JSON interface



###16. Explain when you require Backbone.js ?

Backbone.js is required in following condition

* When developing a web application that requires a lot of JavaScript
* It is required when you want to give structure to your code, if your application needs to be scalable
* Backbone is useful when a web application has to work with jQuery to traverse the DOM or give animations

###17.  Explain what is view in Backbone.js?

Backbone view is a Javascript object that manages a specific DOM element and descendants.

* Views are not HTML
* It is a description of a model
* The HTML code comes from templates
* Works with any template system

###18. Explain what is Backbone.js Models?

Backbone.js models are object and core of backbone.js. It contains an array of attributes and listens for events. To represent your data, Backbone provides a model object.  For example, you have a to do list, you would have a model representing each item on that list.

###19. Explain how you can use backbone.js for multiple page web app ?

For multiple page web app in backbone.js there are lots of consideration but here are two which can be useful

* Serving the page : In this, where you want to have your web server route everything to the server route everything to serve the same static page. That means that everything in http://guru99.com/* will serve /var/www/guru99.com/index.html. once the static page is loaded, the JS on that page will decide what to do given the url

* Push State : You can still use backbone routing to do your routing, but don’t use hashbangs.  This will allow you to navigate to URLs without actually needing a page refresh.

###20. Explain what is Modelbinder in Backbone.js ?

To make synchronization process of views and models together, ModelBinder class is used.

###21. What is the most powerful capabilities of the ModelBinder ?

The most powerful capabilities of ModelBinder class is that it enables you to define scope when you create your bindings using jQuery.

* If your views are simple, you can rely on default scoping rules that are based off of the html “name” attribute.
* You can define scoping with jQuery selectors if your views are complex.

###22. Explain what is Converter in Backbone.js ?

A function is called when model’s attribute is copied to an html element or when an html element value is copied into a model’s attribute, this function is referred as Converter in Backbone.js

###23. What is model.attributes ?

The attributes property is the internal hash containing the model’s state,  usually a form of the JSON object representing the model data on the server. It is often a straightforward serialization of a row from the database

###24.  What is the function of toJSON ?

It returns a shallow copy of the model’s attribute for JSON stringification. This function is used for persistence, serialization and for augmentation before being sent to the server. This does not return a JSON string

###25. Explain when you can use Unbinding function in Backbone.js ?

When you want to remove the validation binding on the model or all models , removing all events hooked up on the collection, you can use Unbinding function.

For example : Backbone.Validation.Unbind(view)   [ This will remove the validation binding]

###26. What are the configuration options available ?

The configuration options available are

* InitialCopyDirection
* modelSetOptions
* change Triggers
* boundAttribute
* suppressThrows
* converter

###27.Mention what are the typical problems you might face with the Backbone view code ?

* Application models don’t change very often
* Application pages are frequently refreshed from scratch from the server
* Between different view models are not shared

###28. What is the function of escape ?

It gets the current value of an attribute from the model but returns the HTML-escaped version of a model’s attribute.  It is helpful in preventing XSS attacks, if you are interpolating data from the model into HTML

###29.  Explain what is the function of parse ?

Whenever a model’s data is returned by the server, in fetch and save , this data is called parse. It is called by Backbone whenever a collection’s models are returned by server, in fetch.

###30. What is Backbone.sync is used for ?

When Backbone wants to save or read a model to the server it calls out a function called as Backbone.sync.

###31. In Backbone View, what is the use of setElement ?

setElement function is used when Backbone view has to be applied to a different DOM element.

###32. Explain what is model.cid ?

Model.cid works as a unique identifier. It is a special property of models, the cid or client id is automatically assigned to all models when they are first created. This property is useful when the model is not saved to the server, but needs to be visible in the UI. It takes the from c1,c2….

###33. What are the three js files that you require to setup a working environment for backbone?

you are required following three js files to setup a working environment for backbone

* jQuery
* Backbone
* Underscore

In your application put these files within js folder and use it in your index.html page

### 34.What is backbone Js?

It is JavaScript framework which helps to write the code in organize way and reduce the development time by providing lot of inbuilt functions. It also support MVC (Model, View, Controller). Its data binding framework.

### 35.What is initial release date of backbone JS?

October 13, 2010

### 36.What is current Stable Version and Release date?

1.3.2 / March 12, 2016


### 37.In which language, backbone JS is writeen?

javaScript

### 38.What is offical URL of Backbone JS?

http://backbonejs.org/

### 39.What are main components of Backbone Js?

* Model
* View
* controller
* Router
* Event class object

### 40.What is Model in Backbone JS?

We use Model for retrieves the data from server.

### 41.What is View in Backbone JS?

We use View for representation of HTML.


### 42.What is controller in Backbone JS?

We use controller for writing application logic.


### 43.What is Collection in Backbone JS?

Set of models are represented by collections.

### 44.What is Router in Backbone JS?

application want to change their URL fragment.

### 45.What is Model in Event class object JS?

events is a module that can be mixed in to any object.

### 46.What are the three js files that you require to setup backbone Js?

* jQuery
* Backbone
* Underscore

### 47.What is the function of toJSON?

toJSON is used for persistence, serialization and for augmentation before being sent to the server

### 48.What are the configuration options available?

* InitialCopyDirection
* modelSetOptions
* change Triggers
* boundAttribute
* suppressThrows
* converter

### 49.What are the keypoints of Backbone?

* It has hard dependency with underscore.js to make it more functional and supporting.
* With jQuery it has a soft dependency.
* When the model changes it can update the HTML of your application automatically.
* Significantly clean and elegant way for DOM manipulations and UI updates

### 50.What is Backbone.sync?

When Backbone wants to save or read a model to the server it calls out a function called as Backbone.sync


###51. What is Backbone.js? How Does It Help Developers?

BackboneJs is a JavaScript framework which allows the developers to make their life easier by providing the below features:

* Model – Store data
	1.Model can have listeners bound to them to detect changes to their values
* Collection – Group of models
* View – Represents UI
* Routing – Manages how to show appropriate view when request through URL

###52 What is Model in Backbone.js?

Models are used to represent data from your server. Model in BackboneJs contains:

* Interactive data
* Business Logic
* Conversions
* Validations
* Computed properties
* Access control

Code Example:-

	MyClass = Backbone.Model.extend({
	        initialize: function(){
	            alert("I will initialize the model when it is created. I am like constructor.");
	        }
	    });
	var myObj = new MyClass();


###53. How Can You Set Attributes of a Model?

You can set attributes of a model in two ways. Using constructor parameter or .set(). See the below example:

	var myObj = new MyClass({ attrib1: "Thomas", attrib2: 67});

	//Or we can set afterwards, these operations are equivalent
	var myObj = new MyClass();
	myObj.set({ attrib1: "Thomas", attrib2: 67});

###54. How Can You Get the Attribute Value of a Model?

You can get the value of model attribute by using .get() method. See the example below:

	//Set attributes
	var obj = new MyClass({ attrib1: "Attribute1", attrib2: 50});

	//Get attributes
	var attrib1 = obj.get("name"); // "Attribute1"
	var attrib2 = obj.get("age"); // 50

###55. Can You Have Default Values for Model? If Yes, How?

Yes, we can set default values for the model attributes. See the example below:

	MyClass = Backbone.Model.extend({
	        defaults: { //sets default values
	            attrib1: 'Default Attribute1 Value',
	            attrib2: 0
	        },
	        initialize: function(){
	            alert("It is so easy to set default values. Isn't it?");
	        }
	    });

###56. How Can You Write the Business Logic in Model?

We can write the methods which contain the business logic. See the example below:


	Person = Backbone.Model.extend({
	        defaults: {
	            name: 'Fetus',
	            age: 0,
	            child: ''
	        },
	        initialize: function(){
	            alert("This class has adop() method which contains business logic to set new child.");
	        },
	        adopt: function( newChildsName ){
	            this.set({ child: newChildsName });
	        }
	    });

	var person = new Person({ name: "Thomas", age: 67, child: 'Ryan'});
	person.adopt('John Resig');
	 var child = person.get("child"); // 'John Resig'

###57. How Can You Track Any Change in Model Attribute Value?

All attributes of a model can have listeners bound to them to detect changes to their values. In our initialize function, we are going to bind a function call everytime we change the value of our attribute. In this case, if the name of our “person” changes, we will alert their new name. Syntax for attaching callback to change event of attribute is this.on(“change”, function(model){});. See the example below:

	Person = Backbone.Model.extend({
	        defaults: {
	            name: 'Fetus',
	            age: 0
	        },
	        initialize: function(){
	            alert("Below we are attaching callback to change event of 'name' attribute");
	            this.on("change:name", function(model){
	                var name = model.get("name"); // 'Stewie Griffin'
	                alert("Changed my name to " + name );
	            });
	        }
	    });

    var person = new Person({ name: "Thomas", age: 67});
    person.set({name: 'Stewie Griffin'}); // This triggers a change and will alert()

###58. How the Actions Performed on Model is Translated to RESTful Operations? Give an Example.

Models are used to represent data from your server and actions you perform on them will be translated to RESTful operations. The id attribute of a model identifies how to find it on the database usually mapping to the surrogate key.

Suppose you have a table Users with columns id, name, email and you want to save the model back on server when user clicks save button. If the id attribute of the model is null, Backbone.js will send a POST request to the urlRoot of the server. For this, see the example below:


	var UserModel = Backbone.Model.extend({
	        urlRoot: '/user', //RESTful API relative path
	        defaults: {
	            name: '',
	            email: ''
	        }
	    });
	    var user = new UserModel();
	    // Notice that we haven't set an `id`. In case of update operation, we need to pass 'id' as well.
	    var userDetails = {
	        name: 'Thomas',
	        email: 'youemailid@domain.com'
	    };
	    // Because we have not set a `id` the server will call
	    // POST /user with a payload of {name:'Thomas', email: 'youremailid@domain.com'}
	    // The server should save the data and return a response containing the new `id`
	    user.save(userDetails, {
	        success: function (user) {
	            alert(user.toJSON());
	        }
	    })

###59.How Backbone Decides if it Should Use POST/GET/ Request to the Server? What are the Methods Backbone has Reserved for these Operations?

* If we instantiate a model with an id, Backbone.js will automatically perform a GET request to the urlRoot + ‘/id’ using fetch() method. (conforming to RESTful conventions)

* If the id attribute of the model is null, Backbone.js will send a POST request to the urlRoot of the server using save() method.

* If the id attribute of the model is not null, Backbone.js will send a PUT request instead of a POST request using save() method.

* If a model has an id we know that it exists on the server, so if we wish to remove it from the server we can call destroy() method. destroy will fire off a DELETE /user/id (conforming to RESTful conventions).

See the example below for all these above operations:

	// Here we have set only the `id` of the model so it will call fetch() method.
	    var user = new Usermodel({id: 1});

	    // The fetch below will perform GET /user/1
	    // The server should return the id, name and email from the database
	    user.fetch({
	        success: function (user) {
	            alert(user.toJSON());
	        }
	    })



	// Here we have set all the attributes, along with id,
	// of the model so it will call save() method with PUT
	    var user = new Usermodel({
	        id: 1,
	        name: 'Thomas',
	        email: 'myemailid@domain.com'
	    });

	    // Let's change the name and update the server
	    // Because there is `id` present, Backbone.js will fire
	    // PUT /user/1 with a payload of `{name: 'Davis', email: 'myemailid@domain.com'}`
	    user.save({name: 'Davis'}, {
	        success: function (model) {
	            alert(user.toJSON());
	        }
	    });


	// Here we have set all the properties of model.
	    var user = new Usermodel({
	        id: 1,
	        name: 'Thomas',
	        email: 'thomasalwyndavis@gmail.com'
	    });

	    // Because there is `id` present, Backbone.js will fire
	    // DELETE /user/1
	    user.destroy({
	        success: function () {
	            alert('Destroyed');
	        }
	    });

###60. What are the Tips/Tricks/Practice, with Respect to Model, You Follow?

Below are some practices you should follow while working with Backbone models:

***Get all the Current Attributes***

obj.attributes gives a direct reference to the attributes and you should be careful when playing with it. Best practice would suggest that you use .set() to edit attributes of a model to take advantage of backbone listeners.

	var person = new Person({ name: "Thomas", age: 67});
	var attributes = person.toJSON(); // { name: "Thomas", age: 67}
	/* This simply returns a copy of the current attributes. */

	var attributes = person.attributes;

***Validate Data Before You Set or Save It***

Always implement validate() method so that Backbone validates the input before setting any attribute value. It ensures that invalid data is not stored on your server.

	Person = Backbone.Model.extend({
	        // If you return a string from the validate function,Backbone will throw an error
	        validate: function( attributes ){
	            if( attributes.age < 0 && attributes.name != "Dr Manhatten" ){
	                return "You can't be negative years old";
	            }
	        },
	        initialize: function(){
	            //Bind callback for error event
	            this.bind("error", function(model, error){
	                // We have received an error, log it, alert it or forget it <img alt=":)" class="wp-smiley" src="http://synvistech.com/blogs/wp-includes/images/smilies/simple-smile.png" style="height: 1em; max-height: 1em;" />
	                alert( error );
	            });
	        }
	    });

	    var person = new Person;
	    person.set({ name: "Mary Poppins", age: -1 });
	    // Will trigger an alert outputting the error

	    var person = new Person;
	    person.set({ name: "Dr Manhatten", age: -1 });

Note: Dear readers, please let me know if you follow some other best practices so that I can add it.

###61. What is View in Backbone.js?

1. Reflect what your applications’ data models look like.
2. Used to listen to events and react accordingly.

###62. How Do You Define View in Backbone.js?

You can define views in Backbone.js similar to Backbone models. See example below:

	SearchView = Backbone.View.extend({
	        initialize: function(){
	            alert("WOW! SearchView has been defined.");
	        }
	    });

	    // The initialize function is always called when instantiating a Backbone View.
	    // Consider it the constructor of the class.
	    var search_view = new SearchView();
	    //You can specify el property for the view or else it will create empty div and assign it
	<div id="search_container"></div>

###63. What is “el” Property of Backbone.js View?

The “el” property references the DOM object created in the browser. Every Backbone.js view has an “el” property, and if it is not defined, Backbone.js will construct its own, which is an empty div element.

###64. How Can You Use Underscore Templates in Backbone.js Views?

* First, create an underscore template
* Create div for el property of the view
* Compile the template using underscore
* Load the compiled HTML into Backbone “el”

See the below example:

	<script type="text/template" id="search_template">
	  <label>Search</label>

###65. How Can You Attach Listeners to Events in a View?

Use the “events” attribute of Backbone.View. Remember that event listeners can only be attached to child elements of the “el” property.

See example below:

	SearchView = Backbone.View.extend({
	    initialize: function(){
	        this.render();
	    },
	    render: function(){
	        var template = _.template( $("#search_template").html(), {} );
	        this.$el.html( template );
	    },
	    //Attach listener to click event of the search button
	    events: {
	        "click input[type=button]": "doSearch"
	    },
	    doSearch: function( event ){
	        // Button clicked, you can access the element that was clicked with event.currentTarget
	        alert( "Search for " + $("#search_input").val() );
	    }
	});

###67. How Can You Use Template Variables?
You can access template variables with <%= %>.

	<script type="text/template" id="search_template">
	<label><%= search_label %>

###68. What is Router in Backbone.js?

Backbone routers are used for routing your applications URLs when using hash tags(#). In the traditional MVC sense, they don’t necessarily fit the semantics and if you have read “What is a view?” it will elaborate on this point. Though a Backbone “router” is still very useful for any application/feature that needs URL routing/history capabilities.

* Defined routers should always contain at least one route and a function to map the particular route to.

* Routes interpret anything after “#” tag in the URL. All links in your application should target “#/action” or “#action”. (Appending a forward slash after the hashtag looks a bit nicer, e.g. http://example.com/#/user/help).

Code:

	<script>
	    var AppRouter = Backbone.Router.extend({
	        routes: {
	            "*actions": "defaultRoute" // matches http://example.com/#anything-here
	        }
	    });
	    // Initiate the router
	    var app_router = new AppRouter;

	    app_router.on('route:defaultRoute', function(actions) {
	        alert(actions);
	    })

	    // Start Backbone history a necessary step for bookmarkable URL's
	    Backbone.history.start();

	</script>


###69. What is Dynamic Routing?

In case of Dynamic Routing, you can use variables in the route. For example, you might want to retrieve a post with a variable id with a friendly URL string. You can specify variable name in the route as :variablename in dynamic routing.

	<script>
	    var AppRouter = Backbone.Router.extend({
	        routes: {
	            "posts/:id": "getPost",
	            "*actions": "defaultRoute" // Backbone will try to match the route above first
	        }
	    });
	    // Instantiate the router
	    var app_router = new AppRouter;
	    app_router.on('route:getPost', function (id) {
	        // Note the variable in the route definition being passed in here
	        alert( "Get post number " + id );
	    });
	    app_router.on('route:defaultRoute', function (actions) {
	        alert( actions );
	    });
	    // Start Backbone history a necessary step for bookmarkable URL's
	    Backbone.history.start();

	</script>

###70. What are “:params” and “*splats” in Dynamic Routing?

Backbone uses two styles of variables when implementing routes:

* “:params” match any URL components between slashes. You can specify single fragment using “.params”
* “*splats” match any number of URL fragments after the query.
* Note that due to the nature of a “*splat”, it will always be the last variable in your URL as it will match any and all * components.
* “*splats” or “:params” in route definitions are passed as arguments (in respective order) to the associated function.
* A route defined as “/:route/:action” will pass 2 variables (“route” and “action”) to the callback function.

Just to refresh the URL components with example, refer to the below example URL:


	foo://example.com:8042/over/there?name=ferret#nose
	  \_/   \_________/ \__/\_________/\__________/ \__/
	   |         |        |     |           |        |
	scheme      host    port   path       query   fragment

The below example will help clear your understanding about use of “.params” and “*splats”:

	routes: {
	            "posts/:id": "getPost",
	            // &lt;a href="http://example.com/#/posts/121">Example&lt;/a>

	            "download/*path": "downloadFile",
	            // &lt;a href="http://example.com/#/download/user/images/hey.gif">Download&lt;/a>

	            ":route/:action": "loadView",
	            // &lt;a href="http://example.com/#/dashboard/graph">Load Route/Action View&lt;/a>
	        },

	        app_router.on('route:getPost', function( id ){
	            alert(id); // 121
	        });
	        app_router.on('route:downloadFile', function( path ){
	            alert(path); // user/images/hey.gif
	        });
	        app_router.on('route:loadView', function( route, action ){
	            alert(route + "_" + action); // dashboard_graph
	        });

###71. What is Collection in Backbone.js?

* Backbone collections are simply an ordered set of models.
* Typically, your collection will only use one type of model but models themselves are not limited to a type of collection.

code:-

	var Song = Backbone.Model.extend({
	      initialize: function(){
	          console.log("Music is the answer");
	      }
	  });

	  var Album = Backbone.Collection.extend({
	    model: Song
	  });

###72. Can You Give An Example of How to Build a Collection?

	var Song = Backbone.Model.extend({
	        defaults: {
	            name: "Not specified",
	            artist: "Not specified"
	        },
	        initialize: function(){
	            console.log("Music is the answer");
	        }
	    });

	    var Album = Backbone.Collection.extend({
	        model: Song
	    });

	    var song1 = new Song({ name: "How Bizarre", artist: "OMC" });
	    var song2 = new Song({ name: "Sexual Healing", artist: "Marvin Gaye" });
	    var song3 = new Song({ name: "Talk It Over In Bed", artist: "OMC" });

	    var myAlbum = new Album([ song1, song2, song3]);
	    console.log( myAlbum.models ); // [song1, song2, song3]
