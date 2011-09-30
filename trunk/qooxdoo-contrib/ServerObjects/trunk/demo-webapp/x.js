var x = [ {
	'asset-let' : {
		'qx.icontheme' : [ 'Tango' ]
	},
	'cache' : {
		'compile' : '/var/folders/xq/5bt7jkbj2gz__6sbny8xtvcc0000gp/T/qx1.5/cache',
		'downloads' : '/var/folders/xq/5bt7jkbj2gz__6sbny8xtvcc0000gp/T/qx1.5/cache/downloads',
		'invalidate-on-tool-change' : True
	},
	'compile' : {
		'type' : 'hybrid'
	},
	'compile-options' : {
		'code' : {
			'except' : [ 'com.zenesis.*', 'grasshopper.*', 'demoapp.*',
					'demoapp.*', '*' ],
			'locales' : [ 'en' ]
		},
		'paths' : {
			'app-root' : 'source',
			'file' : './source/script/demoapp.js'
		},
		'uris' : {
			'add-nocache-param' : False
		}
	},
	'config-warnings' : {},
	'desc' : 'create a hybrid version (app classes as source files, others compiled)',
	'environment' : {
		'qx.application' : 'demoapp.Application',
		'qx.revision' : '21333:21433M',
		'qx.theme' : 'demoapp.theme.Theme',
		'qx.version' : '1.5'
	},
	'extend' : [ 'common', 'libraries', 'includes', 'cache' ],
	'include' : [ 'demoapp.Application', 'demoapp.theme.Theme' ],
	'let' : {
		'API_EXCLUDE' : [ 'qx.test.*', 'demoapp.theme.*', 'demoapp.test.*',
				'demoapp.simulation.*' ],
		'APPLICATION' : 'demoapp',
		'APPLICATION_MAIN_CLASS' : 'demoapp.Application',
		'BUILD_PATH' : './build',
		'CACHE' : '/var/folders/xq/5bt7jkbj2gz__6sbny8xtvcc0000gp/T/qx1.5/cache',
		'CACHE_KEY' : {
			'compile' : '/var/folders/xq/5bt7jkbj2gz__6sbny8xtvcc0000gp/T/qx1.5/cache',
			'downloads' : '/var/folders/xq/5bt7jkbj2gz__6sbny8xtvcc0000gp/T/qx1.5/cache/downloads',
			'invalidate-on-tool-change' : True
		},
		'HOME' : '/Users/john',
		'LOCALES' : [ 'en' ],
		'OPTIMIZE' : [ 'basecalls', 'variables', 'privates', 'strings',
				'variants', 'comments' ],
		'PYTHON_CMD' : '/usr/bin/python',
		'QOOXDOO_PATH' : '/Users/john/os/qooxdoo-1.5-sdk',
		'QOOXDOO_REVISION' : '21333:21433M',
		'QOOXDOO_VERSION' : '1.5',
		'QXICONTHEME' : [ 'Tango' ],
		'QXTHEME' : 'demoapp.theme.Theme',
		'ROOT' : '.',
		'TMPDIR' : '/var/folders/xq/5bt7jkbj2gz__6sbny8xtvcc0000gp/T',
		'USERNAME' : None
	},
	'library' : [
			{
				'class' : 'source/class',
				'encoding' : 'utf-8',
				'manifest' : '/Users/john/os/qooxdoo-1.5-sdk/framework/Manifest.json',
				'namespace' : 'qx',
				'path' : '/Users/john/os/qooxdoo-1.5-sdk/framework',
				'qooxdoo-versions' : [ '1.5' ],
				'resource' : 'source/resource',
				'translation' : 'source/translation',
				'type' : 'library',
				'uri' : '/qooxdoo/framework',
				'version' : '1.5'
			},
			{
				'class' : 'source/class',
				'encoding' : 'utf-8',
				'manifest' : '/Volumes/MIRROR/Users/john/dev/QSO/trunk/client/qso-lib/Manifest.json',
				'namespace' : 'com.zenesis.qx.remote',
				'path' : '/Volumes/MIRROR/Users/john/dev/QSO/trunk/client/qso-lib',
				'qooxdoo-versions' : [ '1.0.1' ],
				'resource' : 'source/resource',
				'translation' : 'source/translation',
				'type' : 'application',
				'uri' : '/qso-lib',
				'version' : 'trunk'
			},
			{
				'class' : 'source/class',
				'encoding' : 'utf-8',
				'manifest' : '/Volumes/MIRROR/Users/john/dev/QSO/trunk/client/demoapp/Manifest.json',
				'namespace' : 'demoapp',
				'path' : '/Volumes/MIRROR/Users/john/dev/QSO/trunk/client/demoapp',
				'qooxdoo-versions' : [ '1.1' ],
				'resource' : 'source/resource',
				'translation' : 'source/translation',
				'type' : 'application',
				'version' : 'trunk'
			} ]
} ];