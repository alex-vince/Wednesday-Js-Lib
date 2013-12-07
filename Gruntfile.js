module.exports = function( grunt )
{

	'use strict';

	/**
	 * Tasks Config
	 * @type { Object }
	 */
	grunt.initConfig(
		{

			jshint: 
			{
				options: 
				{
					jshintrc: '.jshintrc'
				},
				all: 
				[
					'TemplateUtils/Template.js'
				]
			},


			jsdoc : {
				dist : {
					src: ['TemplateUtils/Template.js'], 
					options: {
						destination: 'Documentation'
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
					files: 
					[ 
						'TemplateUtils/Template.js' 
					],
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
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-jsdoc' );

	grunt.loadNpmTasks( 'grunt-contrib-watch' );


  /**
   * Register Tasks
   */
	grunt.registerTask( 'javascript', [ 'jshint', 'jsdoc' ] );
	grunt.registerTask( 'default', [ 'javascript', 'watch' ] );


};