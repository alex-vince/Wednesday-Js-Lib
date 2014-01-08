module.exports = function( grunt )
{

	'use strict';

	var PORT 					= 4000,
			RELOAD_PORT 	= 35729;

	var FILE_ARR = 
	[
		'Default/Default.js',
		'URI/Wednesday.Util.Uri.js',
		'EventEmitter/Wednesday.Util.EventEmitter.js',
		'History/Wednesday.Util.History.js',
		'TemplateUtils/Wednesday.Util.Template.js'
	];

	var DOC_DIR = 'Documentation';

	/**
	 * Tasks Config
	 * @type { Object }
	 */
	grunt.initConfig(
		{


			clean : 
			{
				dist : 
				[
					DOC_DIR
				]
			},


			jshint: 
			{
				options: 
				{
					jshintrc: '.jshintrc'
				},
				all: FILE_ARR
			},


			jsdoc : 
			{
				dist : 
				{
					src: FILE_ARR, 
					options: 
					{
						destination: DOC_DIR
					}
				}
			},


			/**
			 * Launch the libs dir via connect middleware
			 * @type { Object }
			 */
			connect : 
			{
				server :
				{
					options:
					{
						hostname : '*',
						port : PORT
						
					}
				}
			},
    

			watch: 
			{
				options: 
				{
				
				},
				libs : 
				{
					files: FILE_ARR,
					tasks : [ 'jshint:all' ]
				}
			}


		}
	);


	grunt.event.on('watch', function( action, filepath ) 
	{

		grunt.config(['javascript', 'all'], filepath);

	});

	/**
	 * Load Tasks
	 */
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-jsdoc' );

	grunt.loadNpmTasks( 'grunt-contrib-connect' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );


  /**
   * Register Tasks
   */
	grunt.registerTask( 'javascript', [ 'clean', 'jshint', 'jsdoc' ] );
	grunt.registerTask( 'default', [ 'javascript', 'connect', 'watch' ] );


};