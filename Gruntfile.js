module.exports = function( grunt )
{

	'use strict';

	var FILE_ARR = 
	[
		'Default/Default.js',
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

	grunt.loadNpmTasks( 'grunt-contrib-watch' );


  /**
   * Register Tasks
   */
	grunt.registerTask( 'javascript', [ 'clean', 'jshint', 'jsdoc' ] );
	grunt.registerTask( 'default', [ 'javascript', 'watch' ] );


};