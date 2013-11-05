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


        var fov = 70;

        var SCREEN_WIDTH = document.body.clientWidth ;
        var SCREEN_HEIGHT = document.body.clientHeight ;

        var container;

        var camera, controls, scene, loaded;
        var renderer;

        var windowHalfX = window.innerWidth / 2;
        var windowHalfY = window.innerHeight / 2;

        var rotatingObjects = [];
        var morphAnimatedObjects = [];

        var clock = new THREE.Clock();
        var theObject, theBackground="no", mesh;

        init();

        function init() {

            var postUrl = $("#post-url").val();
            var filePathName = $("#post-name").val();

            container = document.getElementById("postShowContainer");
            var $modelContainer = $("#postShowContainer");
            var conWidth = $("#postShowContainer").css('width');
            var conHeight = $("#postShowContainer").css('height');
            var widthNum = conWidth.replace("px","");
            var heightNum = conHeight.replace("px","");

            renderer = new THREE.WebGLRenderer( {
                antialias: true,
                preserveDrawingBuffer: true  // required to support .toDataURL()
            });

            renderer.setSize( widthNum,heightNum);
            renderer.gammaInput = true;
            renderer.gammaOutput = true;
            renderer.physicallyBasedShading = true;
            container.appendChild( renderer.domElement );

            loader = new THREE.SceneLoader();
            loader.updateProgress = function ( progress ) {

                var message = "Loaded sdfsdfsdf";

                if ( progress.total ) {

                    message += ( 100 * progress.loaded / progress.total ).toFixed(0) + "%";


                } else {

                    message += ( progress.loaded / 1000 ).toFixed(2) + " KB";

                }
                
                return function(){ return message};
                

            };

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
            };
//            container.appendChild(loader.statusDomElement);
            loader.parse(createWrapperJson(filePathName,postUrl), callbackFinished,postUrl);


        }
        /**
         * create object wrapper camral and light
         * @param filePathName
         * @param postUrl
         * @returns {Object}
         */
        function createWrapperJson(filePathName,postUrl){
            var json1 = new Object();
            json1.urlBaseType = "relativeToHTML";
            json1.objects = {};
            json1.geometries = {};
            json1.materials = {};

            json1.objects[filePathName] = {
                "geometry":filePathName,
                "material" : "flamingo",
                "position":[ 0, 0, 0 ],
                "rotation":[ 0, 0, 0 ],
                "scale":[ 1, 1, 1 ],
                "visible":true,
                "mirroredLoop":true,
                "properties":{
                    "rotating":true,
                    "rotateY":true
                }
            };
            json1.objects["light1"] = {
                "type":"DirectionalLight",
                "direction":[ 0, 1, 1 ],
                "color":16777215,
                "intensity":1
            };


            json1.objects["camera1"] = {
                "type":"PerspectiveCamera",
                "fov":70,
                "aspect":window.innerWidth / window.innerHeight,
                "near":1,
                "far":1100,
                "position":[ 0, 0, 100 ],
                "target":[ 0, 0, 0 ]
            };

            json1.geometries[filePathName] = {
                "type":"ascii",
                "url":postUrl
            };

            json1.materials["flamingo"] = {
                "type": "MeshPhongMaterial",
                "parameters": {
                    color: 0xffffff,
                    specular: 0xffffff,
                    shininess: 20,
                    morphTargets: true,
                    morphNormals: true,
                    vertexColors: THREE.FaceColors,
                    shading: THREE.SmoothShading,
                    wireframe: false,
                    opacity: 1.0
                }
            };



            json1.defaults = {
                "bgcolor":[255, 255, 255],
                "bgalpha":0.5,
                "camera":"camera1"
            };

            return json1;
        }

        function callbackFinished( result ) {
            var cameraX = $("#cameraX").val();
            var cameraY = $("#cameraY").val();
            var cameraZ = $("#cameraZ").val();
            var controlsX = $("#controlsX").val();
            var controlsY = $("#controlsY").val();
            var controlsZ = $("#controlsZ").val();

            var background = $("#background").val();


            camera = result.currentCamera;
            if (cameraX &&
                cameraY &&
                cameraZ ) {
                camera.position.x = cameraX;
                camera.position.y = cameraY;
                camera.position.z = cameraZ;
            }
            camera.updateProjectionMatrix();

            scene = result.scene;

            var opts = {};

            opts.callback = function(url) {
            }

            //full screen f code
            opts.width = 160;
            opts.height = 90;
            THREEx.Screenshot.bindKey(renderer, opts);
            var opts1 = {};
            opts1.element = document.getElementById("postShowContainer");
            if( THREEx.FullScreen.available() ) {
                THREEx.FullScreen.bindKey(opts1);
            }
            //full screen button click
            $("#full-btn").click(function(){
                if( THREEx.FullScreen.available() ) {

                    if( THREEx.FullScreen.activated() ){
                        THREEx.FullScreen.cancel();
                    }else{
                        THREEx.FullScreen.request(opts1.element);
                    }
                }
            });
            

            scene.traverse( function ( object ) {

                if (object.geometry) {

                    morphColorsToFaceColors(object.geometry);
                    object.geometry.computeMorphNormals();

                    if (object.geometry.boundingSphere) {
                        theObject = object;
                        var radius = object.geometry.boundingSphere.radius;

                    }
                }


                if ( object instanceof THREE.MorphAnimMesh ) {

                    morphAnimatedObjects.push( object );

                }

                if ( object instanceof THREE.SkinnedMesh ) {

                    if ( object.geometry.animation ) {

                        THREE.AnimationHandler.add( object.geometry.animation );

                        var animation = new THREE.Animation( object, object.geometry.animation.name );
                        animation.JITCompile = false;
                        animation.interpolationType = THREE.AnimationHandler.LINEAR;

                        animation.play();

                    }

                }

            } );

            controls = new THREE.OrbitControls( camera, renderer.domElement);
            if (controlsX &&
                controlsY &&
                controlsZ) {
                controls.center.x = parseFloat(controlsX);
                controls.center.y = parseFloat(controlsY);
                controls.center.z = parseFloat(controlsZ);
            }
            var radius = theObject.geometry.boundingSphere.radius;
            theObject.scale.x = 60/radius;
            theObject.scale.y = 60/radius;
            theObject.scale.z = 60/radius;
            animate();


        }



        function morphColorsToFaceColors( geometry ) {

            if ( geometry.morphColors && geometry.morphColors.length ) {

                var colorMap = geometry.morphColors[ 0 ];

                for ( var i = 0; i < colorMap.colors.length; i ++ ) {

                    geometry.faces[ i ].color = colorMap.colors[ i ];

                }

            }

        }

        function onWindowResize() {

            var conWidth = $("#postShowContainer").css('width');
            var conHeight = $("#postShowContainer").css('height');
            var widthNum = conWidth.replace("px","");
            var heightNum = conHeight.replace("px","");

            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(widthNum,heightNum );

            render();

        }

        function animate() {

            requestAnimationFrame( animate );

            controls.update();
            render();
        }

        function render() {

            var delta = clock.getDelta();

            // update skinning

            THREE.AnimationHandler.update( delta * 1 );

            for ( var i = 0; i < rotatingObjects.length; i ++ ) {

                var object = rotatingObjects[ i ];

                if ( object.properties.rotateX ) object.rotation.x += 1 * delta;
                if ( object.properties.rotateY ) object.rotation.y += 0.5 * delta;

            }

            for ( var i = 0; i < morphAnimatedObjects.length; i ++ ) {

                var object = morphAnimatedObjects[ i ];

                object.updateAnimation( 1000 * delta );

            }

            renderer.render( scene, camera );
        }

        /**
         * crete secne
         * @returns {{scene: THREE.Scene, camera: THREE.PerspectiveCamera}}
         */
        function createLoadScene() {

            var result = {

                scene:  new THREE.Scene(),
                camera: new THREE.PerspectiveCamera( 65, window.innerWidth / window.innerHeight, 1, 1000 )

            };

            result.camera.position.z = 100;
            result.scene.add( result.camera );

            var object, geometry, material, light, count = 500, range = 200;

            material = new THREE.MeshLambertMaterial( { color:0xffffff } );
            geometry = new THREE.CubeGeometry( 5, 5, 5 );

            for( var i = 0; i < count; i++ ) {

                object = new THREE.Mesh( geometry, material );

                object.position.x = ( Math.random() - 0.5 ) * range;
                object.position.y = ( Math.random() - 0.5 ) * range;
                object.position.z = ( Math.random() - 0.5 ) * range;

                object.rotation.x = Math.random() * 6;
                object.rotation.y = Math.random() * 6;
                object.rotation.z = Math.random() * 6;

                object.matrixAutoUpdate = false;
                object.updateMatrix();

                result.scene.add( object );

            }

            result.scene.matrixAutoUpdate = false;

            light = new THREE.PointLight( 0xffffff );
            result.scene.add( light );

            light = new THREE.DirectionalLight( 0x111111 );
            light.position.x = 1;
            result.scene.add( light );

            return result;

        }

    });

});
