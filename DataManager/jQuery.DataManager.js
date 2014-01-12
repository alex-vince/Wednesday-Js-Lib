/**
 * jQuery.DataManager.js
 * @author Alexander Vince < alexv@wednesdayagency.com >
 * @date Sunday 12th January 2014
 * @copyright 2013 Wednesday Agency - Alexander Vince < alexv@wednesdayagency.com >
 * @license New BSD License < http://creativecommons.org/licenses/BSD/ >
 *
 *
 * @dependencies jQuery ( $ )
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

	'use strict';


	/**
	 * jQuery plugin name
	 * @type { String }
	 */
	var PLUGIN_NAME = 'DataManager';
	

	/**
	 * Function constructor for DataManager
	 * @return { Object } this instance
	 */
	var DataManager = function()
	{

		this.feeds = [];
		return this;

	};


	/**
	 * Add a feed to the Data Manager
	 * @param { String } id A unique id to identify the feed by
	 * @param { String } url The url to poll
	 * @param { Array } callback Array containing objects with onData and onError functions
	 * @param { Number } interval Optional for regularly updating data
	 * @return { Object } this instance
	 */
	DataManager.prototype.addFeed = function( id, url, callback, interval )
	{

		if ( !id || !url || !callback )
		{

			throw new Error( 'DataManager: You must provide a valid id, url and callback.' );

		}

		if ( this.find( id ) )
		{

			throw new Error( 'DataManager: You must provide a unique feed id.' );

		}

		var feedObj =
		{
			id : id,
			url : url,
			callback : callback,
			start : true,
			interval : interval
		};

		this.feeds.push( feedObj );

		return this;

	};


	/**
	 * Start 
	 * @param  { String } url
	 * @return { Object } this instance
	 */
	DataManager.prototype.start = function( id )
	{

		var feed = this.find( id );

		if ( feed )
		{

			this.feeds[ feed.idx ].start = true;
			feed.start = true;


			this.load( feed.params );

		}

		return this;

	};


	/**
	 * Stop a feed
	 * @param  { String } url
	 * @return { Object } this instance
	 */
	DataManager.prototype.stop = function( id )
	{

		var feed = this.find( id );

		if ( feed )
		{

			this.feeds[ feed.idx ].start = false;

		}

		return this;

	};


	/**
	 * Post data to server
	 * @param { String }   id A unique id to identify the feed by
	 * @param { String }   url The url to poll
	 * @param { Object }   data To post
	 * @param { Function } callback Object with onData and onError functions
	 * @return { Object } this instance
	 */
	DataManager.prototype.post = function( id, url, data, callback )
	{

		var postObj =
		{
			id : id,
			url : url,
			callback : callback,
			data : data
		};

		this.load( postObj );

		return this;

	};


	/**
	 * Find a feed params object
	 * @param  { String } url of the feed to search for
	 * @return { Object } feed params object and array index
	 */
	DataManager.prototype.find = function( id )
	{

		var retObj;

		for ( var _i=0, _len = this.feeds.length; _i < _len; _i++ )
		{

			var feed = this.feeds[ _i ];

			if ( feed.id === id )
			{

				retObj = { idx: _i, params : feed };

			}

		}

		return retObj;

	};


	/**
	 * Load request
	 * @param  { Object } params object for url to load
	 * @return { Object } this instance
	 */
	DataManager.prototype.load = function( params )
	{

		var that = this;

		$.ajax(
		{
			type: 'POST',
			url : params.url,
			data : params.data ? params.data : undefined,
			dataType : 'json',
			success : function( data )
			{

				that.success( data, params );

			},
			error : function( err )
			{

				that.error( err, params );

			}

		} );

		this.setFeedInterval( params );
		return this;

	};


	/**
	 * Set Interval for feed to be polled again
	 * @param { Object } params for feed
	 * @return { Object } this instance
	 */
	DataManager.prototype.setFeedInterval = function( params )
	{

		var that = this;

		if ( params.interval && params.start )
		{

			window.setTimeout( function()
			{

				var feed = that.find( params.id );

				if ( feed.params.start )
				{

					that.start( params.id );

				}

			}, params.interval );

		}

		return this;

	};


	/**
	 * Respond to ajax request
	 * @param  { Boolean } success of request
	 * @param  { Object } data from request
	 * @param  { Object } params for feed
	 * @return { Object } this instance
	 */
	DataManager.prototype.response = function( success, data, params )
	{

		if ( !params )
		{

			throw new Error( 'DataManager: Response function not passed valid params' );

		}


		for ( var _i=0, _len = params.callback.length; _i < _len; _i++ )
		{

			var callback = params.callback[ _i ],
			on = success ? 'onData' : 'onError';

			if ( !callback[ on ] )
			{

				throw new Error( 'DataManager: You must provide a valid ' + on + ' callback.' );

			}

			callback.onData( params.id, data );

		}


		return this;

	};


	/**
	 * Success reponse callback
	 * @param  { Object } data for callback
	 * @param  { Params } params for feed
	 * @return { Object } this instance
	 */
	DataManager.prototype.success = function( data, params )
	{

		this.response( true, data, params );
		return this;

	};


	/**
	 * Error reponse callback
	 * @param  { String } err message for callback
	 * @param  { Params } params for feed
	 * @return { Object } this instance
	 */
	DataManager.prototype.error = function( err, params )
	{

		this.response( false, err, params );
		return this;

	};


	/**
	 * Instantiate the DataManager as a jQuery object
	 */
	$[ PLUGIN_NAME ] = new DataManager();


})( this.jQuery, this );