/**
 * Wednesday.Util.QueryString.js
 * @author Alexander Vince < alexv@wednesdayagency.com >
 * @date Saturday 11th January 2014
 * @copyright 2013 Wednesday Agency - Alexander Vince < alexv@wednesdayagency.com >
 * @license New BSD License < http://creativecommons.org/licenses/BSD/ >
 *
 *
 * @dependencies Underscore ( _ )
 *
 * 
 * Module Sandbox
 * @param  { Underscore } _ Library
 * @param  { Object } window global
 * @param  { Undefined } undefined
 * @return { False }
 */
( function( _, window, undefined )
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
	Wednesday.Util.QueryString = Wednesday.Util.QueryString || {};


	/**
	 * make a query string from an object
	 * @param  { Object } obj to make string from
	 * @return { String } 
	 */
	Wednesday.Util.QueryString.make = function( obj )
	{

		var objLength = ( _.size( obj ) - 1 ),
		idx = 0,
		queryString = '?';

		for ( var type in obj )
		{

			if ( obj.hasOwnProperty( type ) )
			{

				queryString += type + '=' + obj[ type ];

				if ( idx < objLength )
				{
					queryString += '&';
				}

				idx++;

			}

		}

		return queryString;

	};


	/**
	 * get a query string from the address bar
	 * @return { Obj } object representation of a query string
	 */
	Wednesday.Util.QueryString.get = function()
	{

		var queryString = window.location.search.substring( 1, window.location.search.length ),
		parts = queryString.split( '&' ),
		obj = {};
		
		for ( var _i=0, _len = parts.length; _i < _len; _i++ )
		{

			var query = parts[ _i ],
			split = query.split( '=' );
			
			obj[ split[ 0 ] ] = split[ 1 ];

		}

		return obj;

	};

	

} )( this._,  this );