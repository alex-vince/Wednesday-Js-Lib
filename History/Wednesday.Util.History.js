/**
 * Wednesday.Util.History.js
 * @author Alexander Vince < alexv@wednesdayagency.com >
 * @date Sunday 8th December 2013
 * @copyright 2013 Wednesday Agency - Alexander Vince < alexv@wednesdayagency.com >
 * @license New BSD License < http://creativecommons.org/licenses/BSD/ >
 *
 *
 * @dependencies Modernizr, jQuery ( $ ), Wednesday.Util.EventEmitter
 *
 * 
 * Module Sandbox
 * @param  { jQuery } $ Library
 * @param  { Object } window global
 * @param  { Undefined } undefined
 * @return { False }
 */
( function( $, window, undefined )
{

	/**
	 * Set ECMA5 strict mode
	 */
	'use strict';


	/**
	 * Wednesday Namespace
	 * @type { Object }
	 */
	var Wednesday = window.Wednesday = window.Wednesday || {};
	Wednesday.Util = Wednesday.Util || {};
	Wednesday.Util.History = Wednesday.Util.History || {};


	//Localise HTML5 API
	var history = window.history || undefined,

	//Private vars
	supportsHistory = false,

	//Library Initialised
	initialised = false,
	
	//Error prefix,
	errorPrefix = 'History Utils: ',

	//Element to fire custom event on
	$eventContainer = $( 'body' ),
	
	//Prefix to all #hash based uris
	hashBangPrefix  = '!',
	
	//Page back event name
	backEvtName = 'Page/Back',
	
	//Page forward event name
	forwardEvtName = 'Page/Forward',
	
	//
	pageForward = false,

	//
	historyArr = [],

	//
	popped = false,

	//
	initialUrl;


	/**
	 * Instantiate History
	 */
	Wednesday.Util.History.init = function()
	{

		if ( initialised )
		{

			throw new Error( errorPrefix + 'You have already instantiated the History object.' );

		}

		supportsHistory = $( 'html' ).hasClass( 'history' ) ? true : false;
		initialUrl = window.location.href;

		Wednesday.Util.History.store();
		Wednesday.Util.History.addListeners();

		initialised = true;

	};


	Wednesday.Util.History.push = function( title, uri, data )
	{

		pageForward = true;
		popped = true;

		if ( supportsHistory )
		{

			history.pushState( undefined, title, uri );

		}
		else
		{

			window.location.hash = hashBangPrefix + uri;

		}

		var evtData =
		{
			title : title,
			uri : uri,
			data : data
		};

		Wednesday.Util.History.store( title, uri, data );
		Wednesday.Util.EventEmitter.trigger( $eventContainer, forwardEvtName, evtData );

	};


	Wednesday.Util.History.store = function( title, uri, data )
	{

		if ( !title && !uri )
		{

			title = $( 'html head title' ).text();
			uri = Wednesday.Util.Uri.getUri();

		}
		else
		{

			$( 'html head title' ).text( title );

		}

		historyArr.push( { title: title, uri : uri, data : data } );

	};



	Wednesday.Util.History.retrieve = function( uri )
	{

		var retObj;
		
		for ( var _i = 0, _len = historyArr.length; _i < _len; _i++ )
		{

			if ( historyArr[ _i ].uri === uri )
			{

				retObj = historyArr[ _i ];

			}

		}

		return retObj;
		
	};


	Wednesday.Util.History.addListeners = function()
	{

		if ( supportsHistory )
		{

			$( window ).on( 'popstate', Wednesday.Util.History.onPopState );

		}
		else
		{

			$( window ).on( 'hashchange', Wednesday.Util.History.onHashChange );

		}

	};


	Wednesday.Util.History.onPopState = function()
	{

		var initialPop = ( !popped && window.location.href === initialUrl );
  
		if ( initialPop )
		{

			return;

		}

		//retrieve
		var curUri = Wednesday.Util.Uri.getUri(),
		evtData = Wednesday.Util.History.retrieve( curUri );

		$( 'html head title' ).text( evtData.title );

		Wednesday.Util.EventEmitter.trigger( $eventContainer, backEvtName, evtData );

	};



	Wednesday.Util.History.onHashChange = function()
	{

		if ( !pageForward )
		{

			//retrieve
			var curUri = Wednesday.Util.Uri.getUri(),
			evtData = Wednesday.Util.History.retrieve( curUri );

			$( 'html head title' ).text( evtData.title );

			Wednesday.Util.EventEmitter.trigger( $eventContainer, backEvtName, evtData );

		}
		else
		{
			
			pageForward = false;

		}

	};



	Wednesday.Util.History.deactivate = function()
	{

		$( window ).off( 'popstate' );
		$( window ).off( 'hashchange' );

	};


} )( this.jQuery, this );