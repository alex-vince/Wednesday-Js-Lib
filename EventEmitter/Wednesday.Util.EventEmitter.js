/**
 * Wednesday.Util.EventEmitter.js
 * @author Alexander Vince < alexv@wednesdayagency.com >
 * @date Sunday 8th December 2013
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
	Wednesday.Util.EventEmitter = Wednesday.Util.EventEmitter || {};
	

	// var console = window.console || undefined;


	/**
	 * trigger an event
	 * @param  { jQuery } $container to trigger event on
	 * @param  { String } name of the event
	 * @param  { Object } data to emit
	 * @return { Boolean }
	 */
	Wednesday.Util.EventEmitter.trigger = function( $container, name, data )
	{

		return $container.trigger( name, data );

	};


} )( this.jQuery, this );