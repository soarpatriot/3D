/**
 * Created with JetBrains WebStorm.
 * User: liuwei3
 * Date: 13-4-8
 * Time: 下午9:51
 * To change this template use File | Settings | File Templates.
 */
require.config({

    baseUrl: '/javascripts',
    waitSeconds: 30,
    shim: {

        'underscore': {
            exports: '_'
        },
        'bootstrap':{
            deps: ['jquery']
        },
        'noty':{
            deps: ['jquery']
        },
        'noty-top':{
            deps: ['noty']
        },
        'noty-topCenter':{
            deps: ['noty']
        },
        'noty-default':{
            deps: ['noty']
        },
        'tip':{
            deps: ['jquery']
        },

        'three':{
            exports:'THREE'
        },
        'three-fullscreen':{
            deps: ['three']
        },
        'three-screenshot':{
            deps: ['three']
        },
        
        'lzma':{
            deps: ['three']
        },
        'ctm':{
            deps: ['three']
        },
        'CTMLoader':{
            deps: ['three']
        },
        'BinaryLoader':{
            deps: ['three']
        },
        'OBJLoader':{
            deps: ['three']
        },
        'VTKLoader':{
            deps: ['three']
        },
        'STLLoader':{
            deps: ['three']
        },
        'ColladaLoader':{
            deps: ['three']
        },
        'UTF8Loader':{
            deps: ['three']
        },
        'MTLLoader':{
            deps: ['three']
        },
        'OrbitControls-Touch':{
            deps: ['three']
        }
    },
    paths: {
        'bootstrap': 'bootstrap',
        'jquery': 'jquery-1.10.2.min',
        'jquery.spin': 'jquery.spin',
        'rails': 'rails',
        'three':'three.min',
        'underscore': 'underscore-min',
        'noty': 'noty/jquery.noty',
        'noty-top': 'noty/layouts/top',
        'noty-topCenter': 'noty/layouts/topCenter',
        'noty-default': 'noty/themes/default',
        'tip' : 'app/tip',

        'three-fullscreen':'THREEx.FullScreen',
        'three-screenshot':'THREEx.screenshot',
        'orbitControls':'OrbitControls',
        'lzma':'loaders/ctm/lzma',
        'ctm':'loaders/ctm/ctm',
        'CTMLoader':'loaders/ctm/CTMLoader',
        'BinaryLoader':'loaders/BinaryLoader',
        'OBJLoader':'loaders/OBJLoader',
        'VTKLoader':'loaders/VTKLoader',
        'STLLoader':'loaders/STLLoader',
        'ColladaLoader':'loaders/ColladaLoader',
        'UTF8Loader':'loaders/UTF8Loader',
        'MTLLoader':'loaders/MTLLoader',
        'OrbitControls-Touch':'OrbitControls-Touch'
    }
});



require(['jquery', 'underscore','jquery.spin','three','bootstrap','noty',
    'noty-top','noty-topCenter','noty-default','tip',
    'three-fullscreen','three-screenshot','OrbitControls-Touch',
    'lzma','ctm','CTMLoader','BinaryLoader','OBJLoader',
    'VTKLoader','STLLoader','ColladaLoader', 'UTF8Loader',
    'MTLLoader'
    ], function($,_) {
    $(function(){


        var container;


    


        var windowHalfX = window.innerWidth / 2;
        var windowHalfY = window.innerHeight / 2;

        var SCREEN_WIDTH = window.innerWidth;
        var SCREEN_HEIGHT = window.innerHeight;
        var FLOOR = -250;



        var camera, scene;
        var renderer;

        var mesh, zmesh, geometry;

        var mouseX = 0, mouseY = 0;

        var windowHalfX = window.innerWidth / 2;
        var windowHalfY = window.innerHeight / 2;

        var render_canvas = 1, render_gl = 1;
        var has_gl = 0;


        document.addEventListener( 'mousemove', onDocumentMouseMove, false );


   
        init();
        animate();
        function init() {
            

            container = document.getElementById("postShowContainer");
            camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 100000 );
            camera.position.z = 500;

            scene = new THREE.Scene();



            // LIGHTS

            var ambient = new THREE.AmbientLight( 0x221100 );
            scene.add( ambient );

            var directionalLight = new THREE.DirectionalLight( 0xffeedd );
            directionalLight.position.set( 0, -70, 100 ).normalize();
            scene.add( directionalLight );

            // RENDERER
            /**
            webglRenderer = new THREE.WebGLRenderer();
            webglRenderer.setClearColor( 0xffffff );
            webglRenderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
            webglRenderer.domElement.style.position = "relative";

            container.appendChild( webglRenderer.domElement );

            has_gl = 1;**/











            renderer = new THREE.WebGLRenderer();
            renderer.setClearColor( 0xffffff );
            renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
            renderer.domElement.style.position = "relative";

            container.appendChild( renderer.domElement );

            has_gl = 1;

            var loader = new THREE.JSONLoader();



            /**
            renderer = new THREE.WebGLRenderer( {
                antialias: true,
                preserveDrawingBuffer: true  // required to support .toDataURL()
            });

            renderer.setSize(widthNum,heightNum);
            renderer.gammaInput = true;
            renderer.gammaOutput = true;
            renderer.physicallyBasedShading = true;
            container.appendChild( renderer.domElement );

            loader = new THREE.SceneLoader();

            loader.addGeometryHandler( "binary", THREE.BinaryLoader );
            loader.addGeometryHandler( "ctm", THREE.CTMLoader );
            loader.addGeometryHandler( "vtk", THREE.VTKLoader );
            loader.addGeometryHandler( "stl", THREE.STLLoader );
            loader.addHierarchyHandler( "obj", THREE.OBJLoader );
            loader.addHierarchyHandler( "dae", THREE.ColladaLoader );
            loader.addHierarchyHandler( "utf8", THREE.UTF8Loader );

            window.addEventListener( 'resize', onWindowResize, false );
            var $spinContainer = $('<div class="spin-container"></div>');
            var $spinner = $('<div class="preview"></div>');
            var $spinMessage = $('<div id="spinMessage" class="spin-message">0%</div>');
            loader.onLoadStart = function(){
                $spinContainer.append($spinner);
                $spinContainer.append($spinMessage);
                $('body').append($spinContainer);
                $spinner.spin({color: '#fff'});
            };
            loader.onLoadComplete = function () {
                $spinner.spin(false);
                $spinContainer.remove();
                
            };**/

            var callbackMale = function ( geometry, materials ) { 
                createScene( geometry, materials, 90, FLOOR, 50, 105 ) 
            };
//            container.appendChild(loader.statusDomElement);
            //loader.parse(createWrapperJson(filePathName,postUrl), callbackFinished,postUrl);
            loader.load('/libs/Male02_dds.js', callbackMale);
        }

        function onWindowResize() {

            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( window.innerWidth, window.innerHeight );
            //if ( webglRenderer ) webglRenderer.setSize( window.innerWidth, window.innerHeight );
            //if ( canvasRenderer ) canvasRenderer.setSize( window.innerWidth, window.innerHeight );

        }

        function createScene( geometry, materials, x, y, z, b ) {

            zmesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
            zmesh.position.set( x, y, z );
            zmesh.scale.set( 3, 3, 3 );
            scene.add( zmesh );

            //createMaterialsPalette( materials, 100, b );

        } 
        function onDocumentMouseMove(event) {

            mouseX = ( event.clientX - windowHalfX );
            mouseY = ( event.clientY - windowHalfY );

        }

        //

        function animate() {

            requestAnimationFrame( animate );

            render();

        }

        function render() {

            camera.position.x += ( mouseX - camera.position.x ) * .05;
            camera.position.y += ( - mouseY - camera.position.y ) * .05;

            camera.lookAt( scene.position );

            renderer.render( scene, camera );
            //if ( render_canvas ) canvasRenderer.render( scene, camera );

        }        

    });
});