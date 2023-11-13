puremvc.define(
// CLASS INFO
{
	name : 'jet.view.mediator.gestureMediator',

	/** @constructor */
	constructor : function() {
		var viewerElement = $(".viewer")[0];
	
	// create a simple instance
	// by default, it only adds horizontal recognizers
	var mc = new Hammer(viewerElement);

	// listen to events...
	mc.on("swipeleft swiperight", function(ev) {
    
	if(ev.target instanceof HTMLImageElement){
		var isWidget = $(ev.target).hasClass("WidgetImage");
		var isDraggable = $(ev.target).hasClass("ui-draggable");
		if(isWidget || isDraggable){
			return;
		}
	}
	
	switch(ev.type){
		
		case "swiperight":
		jet.ApplicationFacade.getInstance(
                                         jet.ApplicationFacade.NAME)
                                         .sendNotification( jet.AppConstants.BACK, null);
		break;
		
		case "swipeleft":
		jet.ApplicationFacade.getInstance(
                                         jet.ApplicationFacade.NAME)
                                         .sendNotification( jet.AppConstants.FORWARD, null);
		break;
	}
	 
	});
	}
},

// INSTANCE MEMBERS
{	
/** @override */
},


// STATIC MEMBERS
{
	/**
	 * @static
	 * @type {string}
	 */
	TEXT_CHANGED : 'textChanged'
});
