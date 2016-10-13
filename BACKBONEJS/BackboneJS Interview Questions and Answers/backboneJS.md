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

###13. What are the three js files that you require to setup a working environment for backbone?

you are required following three js files to setup a working environment for backbone

* jQuery
* Backbone
* Underscore

In your application put these files within js folder and use it in your index.html page