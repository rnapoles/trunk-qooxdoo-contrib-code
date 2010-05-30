/* ************************************************************************

   Copyright:
     Copyright (C) 2009 Arcode Corporation
     
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Dave Bagget (Main code)
     * Christian Boulanger (Contributionizing, small changes)

************************************************************************ */

/* ************************************************************************

#asset(searchbox/*)

************************************************************************ */

/**
 *  The SearchBox allows the user to enter search strings. It fires events to
 *  tell the application what should be done (start a search, stop a search in 
 *  progress, restore the view, etc.)
 * 
 *  Rather than a single icon argument, this widget takes a map of state names to
 *  icon names:
 * 
 *  default     icon used when no icon is specified
 *  idle        icon used when SearchBox is in idle state (no keys have been
 *              pressed)
 *  waiting     icon used when SearchBox is in waiting state (waiting for
 *              keypresses to stop so search can begin)
 *  viewing     icon used when SearchBox is in viewing state (user is viewing
 *              filtered results)
 * 
 *  @todo this widget also has a list, like a normal ComboBox, but it's not hooked
 *        up to anything yet. The intent is to populate this with search suggestions, 
 *        then use this.open() and this.close() to control the list's visibilty.
 * 
 *  dmb - Sep 2009 - 
 */
qx.Class.define("searchbox.SearchBox", 
{
	extend : qx.ui.form.ComboBox,
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */  

  /**
   * Constructor
   * @param label {String}
   * @param icons {Object}
   */
	construct : function(label, icons) 
  {
		this._label = label;
		this._icons = icons ? icons : {};
		this._id = -1;

		this.base(arguments);

		this._button = this.getChildControl("button");
		this._textfield = this.getChildControl("textfield");

		//
		// When the user erases the text in the search box, stop the
		// current search and restore the view.
		//
		this._textfield.setLiveUpdate(true);
		this._textfield.addListener("changeValue", function(e) 
    {
		  if ( e.getData()=="")
      {
        this.fireDataEvent("restore-view");
      }
			//
			// TBD: this really isn't right, because we don't
			// know that a search is actually
			// in progress at this point:
			//
			this.fireDataEvent("search-stop", { "id" : this._id });
			this.__toState("idle");
		}, this);

		//
		// The superclass passes focusin/out events to the textfield,
		// and we don't want that, because it means that the textfield 
    // gets focused when the button is clicked, clearing
		// the placeholder text. So we have to remove these event
		// handlers.
		//
		// TBD: this doesn't seem to do anything helpful; the problem is
		// still there.
		//
		if (false) 
    {
			var event_manager = qx.event.Registration.getManager(this);
			var handlers = {
				"focusin" : null,
				"focusout" : null
			}
			for (var event in handlers) 
      {
				handlers[event] = event_manager.getListeners(this,event, /* capture: */false);
				for (var handler in handlers[event])
        {
					this._textfield.removeListener(event, handlers[event][handler].handler);
        }
			}
		}

		this._add(this._button);
		this._add(this._textfield, { flex : 1 });

		//
		// The SearchBox can be in any of these states:
		//
		// idle       waiting for the user to type something
		//            into the text field
		// waiting    waiting for the user to stop typing
		//            before initiating a search
		// viewing    viewing filtered search results
		//
		// It starts out idle.
		//
		this.__toState("idle");
	},
  
  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */

	events : 
  {
		/**
		 * The info event is fired when the button is pressed while the
		 * search box is in the idle state. This means we should, e.g.,
		 * show search help to the user.
		 */
		"info" : "qx.event.type.Data",

		/**
		 * The search event is fired when a search should be initiated.
		 * 
		 * Event data: A map: { id: <unique id for this search>, query:
		 * <the search query string> }
		 */
		"search-start" : "qx.event.type.Data",

		/**
		 * The search-stop event is fired when an ongoing search should
		 * be suspended to save resources (since we're about to initiate
		 * a new search and throw the results of the previous search
		 * away).
		 * 
		 * Event data: A map: { id: <unique id for this search> }
		 */
		"search-stop" : "qx.event.type.Data",

		/**
		 * The restore-view event is fired when the user clicks the
		 * button while we're in the "viewing" state. This means the
		 * user wants to stop any search in progress and restore the
		 * unfiltered (normal) message view.
		 */
		"restore-view" : "qx.event.type.Data"
	},

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
	members : 
  {
    
    
		_waiting_timer : null,
		_label : null,
		_icons : null,

		// overridden
		_createChildControlImpl : function(id) 
    {
			var control;
			switch (id)   
      {
				case "textfield" :
					control = new qx.ui.form.TextField();
					control.setFocusable(false);
					control.addState("inner");
					control.addListener("keypress", this._onKeypress,
							this);
					break;

				case "button" :
					control = new qx.ui.form.Button(this._label,
							this._icons.idle);
					control.setFocusable(false);
					control.setKeepActive(true);
					control.addState("inner");
					break;

				case "list" :
					// Get the list from the AbstractSelectBox
					control = this.base(arguments, id)

					// Change selection mode
					control.setSelectionMode("single");
					break;
			}

			return control || this.base(arguments, id);
		},
    
    /**
     * Move state machine to spcified state, updating the icon accordingly.
     * @param {} state
     */
		__toState : function(state) 
    {
			// Do nothing if we're already in the right state
			if (this.hasState(state)) return;

			// Replace the current state with the new one
			if (this.hasState("idle"))
      {
        this.replaceState("idle", state);
      }	
			else if (this.hasState("waiting"))
      {
				this.replaceState("waiting", state);
      }
      else if (this.hasState("viewing"))
      {
				this.replaceState("viewing", state);
      }
      else
      {
				this.addState(state);
      }
      
			// Update the icon to reflect the current state
			this._button.setIcon(this._icons[state] || this._icons["default"]);
		},

		// overridden
		_onClick : function(e) 
    {
			var target = e.getTarget();
			if (target == this.getChildControl("button")) 
      {
				if (this.hasState("idle")) 
        {
					//
					// The user has pressed the button while we're idle.
					// Fire an event to
					// notify listeners that the user wants search info.
					//
					this.fireDataEvent("info");
				} 
        else if (this.hasState("viewing")) 
        {
					//
					// The user has pressed the button while viewing
					// search results; this means
					// we should stop the search if one is in progress,
					// and restore the previous
					// message list view. In other the words, the user
					// wants to "close" the search
					// view and return the view to normal, and we
					// shouldn't waste any more time
					// trying to compute search results.
					//
					// We fire a "restore-view" event to notify
					// listeners that the view should
					// be restored since we don't know how to do it
					// ourselves.
					//
					this.stop();
					this.fireDataEvent("search-stop", { "id" : this._id });
					this.fireDataEvent("restore-view");
				}
				// e.stopPropagation();
			}
		},

		__searchInitiateKeys : 
    {
			"Enter" : true,
			"Tab" : true
		},
    
    
    // overridden?
		_onKeypress : function(e) 
    {
			if (this.hasState("viewing")) 
      {
				//
				// As far as we know, the user is viewing search
				// results, but has now pressed a
				// key. We should stop the current search and enter
				// "idle" mode, but leave the
				// filtered view up. Intuitively, this means that
				// whatever the user types will
				// soon start another search.
				//
				this.__toState("idle");
				this.fireDataEvent("search-stop", { "id" : this._id });
			}

			if (!this.hasState("viewing")) 
      {
				//
				// The user has pressed a key while not viewing results.
				// If the key intuitively
				// suggests "go", like Enter or Tab, start the search
				// immediately with whatever
				// text is in the text field. Otherwise, enter the
				// "waiting" state and fire a
				// search event in one second unless another key is
				// pressed (in which case we
				// stay in the "waiting" state, but reset the
				// no-keypress timer).
				//
				if (this._waiting_timer) 
        {
					clearTimeout(this._waiting_timer);
					this._waiting_timer = null;
				}

				var key = e.getKeyIdentifier();
				if (this.__searchInitiateKeys[key]) 
        {
					// Search immediately
					this._search();
					return;
				}

				//
				// The user pressed some other key. Enter the "waiting"
				// state, which means we're
				// waiting for there to be no keypresses for a while.
				// Initiate a search after
				// one second of no keypresses.
				//
				if (this.hasState("idle"))
        {
					this.__toState("waiting");
        }
        var This = this;
				this._waiting_timer = setTimeout(function() 
        {
				  This._search.call(This);
				}, 1000);
			}
		},

		/**
     * This is called to initiate a search. We don't actually know
     * how to do that; we just
     * fire an event telling the listener to do it, and what the
     * query text is.
     * @param e {qx.event.type.Event}
		 */
		_search : function(e) 
    {
			if (!this.hasState("viewing")) 
      {
				var query = this._textfield.getValue();
				if (query) 
        {
					this.__toState("viewing");
					this.fireDataEvent("search-start", {
						"id" : ++this._id,
						"query" : query
					});
				} 
        else 
        {
					//
					// There's no query text. This can happen when, for
					// example, the user just
					// presses shift keys while the text field is
					// focused. Go back to the idle
					// state.
					//
					this.__toState("idle");
				}
			}
		},

		/**
		 * This should be called when the user restores the view; i.e.,
		 * ends "viewing results mode". This clears the search box and 
     * returns us to the "idle" state.
		 */
		stop : function() 
    {
			if (this.hasState("viewing")) 
      {
				this.__toState("idle");
				this._textfield.setValue("");
			}
		}
	}
});