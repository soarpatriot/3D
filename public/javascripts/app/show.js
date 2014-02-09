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
        'three':'three',
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

        var camera, scene;
        var renderer;

        var zmesh, geometry;

        var render_canvas = 1, render_gl = 1;
        var has_gl = 0;
        
        var postUrl = $("#post-url").val();
        var controls;

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
            
            renderer = new THREE.WebGLRenderer( {
                antialias: true,
                preserveDrawingBuffer: true  // required to support .toDataURL()
            });
            //renderer.setClearColor( 0xffffff );
            renderer.setSize(SCREEN_WIDTH,SCREEN_HEIGHT);
            renderer.gammaInput = true;
            renderer.gammaOutput = true;
            renderer.physicallyBasedShading = true;
            container.appendChild( renderer.domElement );

            var loader = new THREE.JSONLoader();
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
                
            };

            var callbackMale = function ( geometry, materials ) { 
                createScene( geometry, materials, 0, 0, 0, 105 ) 
            };

            //add controls
            controls = new THREE.OrbitControls( camera, renderer.domElement);
            controls.addEventListener( 'change', render );

            controls.center.x = 0;
            controls.center.y = 0;
            controls.center.z = 0;
            var zipUrl = "http://localhost:8080/files/male02.js";
            loader.load(postUrl, callbackMale);
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
            zmesh.scale.set( 1, 1, 1 );
            scene.add( zmesh );
        } 


        function animate() {

            requestAnimationFrame( animate );
            controls.update();
            render();
        }

        function render() {
            camera.lookAt( scene.position );
            renderer.render( scene, camera );
            //if ( render_canvas ) canvasRenderer.render( scene, camera );
        }   
         
    });
});