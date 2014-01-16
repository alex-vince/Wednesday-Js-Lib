/**
 * Wednesday.Util.Template.js
 * @author Alexander Vince < alexv@wednesdayagency.com >
 * @date Saturday 7th December 2013
 * @copyright 2013 Wednesday Agency - Alexander Vince < alexv@wednesdayagency.com >
 * @license New BSD License < http://creativecommons.org/licenses/BSD/ >
 *
 *
 * @dependencies jQuery ( $ ), Handlebars
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
	Wednesday.Util.Template = Wednesday.Util.Template || {};
	
	var JST = window.JST || {};


	/**
	 * Localise globals and dependencies
	 * @type { Var }
	 */
	var Handlebars = window.Handlebars || undefined;


	/**
	 * publish a template inside a $container
	 * @param  { jQuery } $container to insert template
	 * @param  { String } template ID
	 * @param  { Object } data to be passed to template
	 * @param  { Function } callback
	 */
	Wednesday.Util.Template.publish = function( $container, template, data, callback )
	{

		var html = Wednesday.Util.Template.fetch( template, data );
		$container.html( html );

		Wednesday.Util.Template.callback( callback );

	};


	/**
	 * append a template to a $container
	 * @param  { jQuery } $container to append template
	 * @param  { String } template ID
	 * @param  { Object } data to be passed to template
	 * @param  { Function } callback
	 */
	Wednesday.Util.Template.append = function( $container, template, data, callback )
	{

		var html = Wednesday.Util.Template.fetch( template, data );
		$container.append( html );

		Wednesday.Util.Template.callback( callback );

	};


	/**
	 * prepend a template to a $container
	 * @param  { jQuery } $container to prepend template
	 * @param  { String } template ID
	 * @param  { Object } data to be passed to template
	 * @param  { Function } callback
	 */
	Wednesday.Util.Template.prepend = function( $container, template, data, callback )
	{

		var html = Wednesday.Util.Template.fetch( template, data );
		$container.prepend( html );

		Wednesday.Util.Template.callback( callback );

	};


	/**
	 * fetch a template to be rendered
	 * @param  { String } template ID
	 * @param  { Object } data to be passed to template
	 * @return { String } HTML to be rendered
	 */
	Wednesday.Util.Template.fetch = function( template, data )
	{

		var source,
		html;

		if ( JST[ template ] )
		{

			source = JST[ template ];

		}
		else if ( $( 'body' ).find( '#' + template ).length > 0 )
		{

			source = $( '#' + template ).html();

		}

		html = Wednesday.Util.Template.compile( source, data );

		return html;

	};


	/**
	 * compile a template 
	 * @param  { String } source HTML to compile
	 * @param  { Object } data to be passed to template
	 * @return { String } HTML to be rendered
	 */
	Wednesday.Util.Template.compile = function( source, data )
	{

		var template = Handlebars.compile( source ),
		html =  template( data );
	
		return html;

	};


	/**
	 * callback optionally once a template has been rendered
	 * @param  { Function } callback to be called
	 * @return false
	 */
	Wednesday.Util.Template.callback = function( callback )
	{

		if ( callback )
		{

			callback();

		}

	};


} )( this.jQuery, this );