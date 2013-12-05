( function( $, Handlebars, window, document, undefined )
{

	'use strict';

	//Localise Globals
	var console = window.console || undefined;

	//Namespace
	var Wednesday = window.Wednesday = window.Wednesday || {};
			Wednesday.Template = Wednesday.Template || {};

	//Private vars
	var templateCache = {};


	Wednesday.Template.fetch = function( template, data )
	{

		//Cache expiration
		//Return early
		if ( templateCache[ template ] )
		{

			return templateCache[ template ];

		}

		if ( Wednesday.JST[ template ] )
		{

			//Compile
			Wednesday.Template.compile();

		}
		else if ( $( 'body' ).find( '#' + template ).length > 0 )
		{

			//Script Tag Template
			Wednesday.Template.compile();

		}
		else
		{

			//Ajax
			Wednesday.Template.compile();

		}

	};


	Wednesday.Template.compile = function()
	{



	}


	Wednesday.Template.cache = function()
	{


	}


	Wednesday.Template.publish = function( $container, template, data, callback )
	{

		var html = Wednesday.Template.fetch( template, data )
		$container.html( html );

		if ( callback )
		{

			callback();

		}

	};


	Wednesday.Template.append = function( $container, template, data, callback )
	{

		var html = Wednesday.Template.fetch( template, data )
		$container.append( html );

		if ( callback )
		{

			callback();
			
		}

	};


	Wednesday.Template.prepend = function( $container, template, data, callback )
	{

		var html = Wednesday.Template.fetch( template, data )
		$container.prepend( html );

		if ( callback )
		{

			callback();
			
		}

	};


} )( $, Handlebars, window, document );