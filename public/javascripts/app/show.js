/**
 * Created with JetBrains WebStorm.
 * User: liuwei3
 * Date: 13-4-8
 * Time: 下午9:51
 * To change this template use File | Settings | File Templates.
 */

$(function(){


    var fov = 70;

    var SCREEN_WIDTH = window.innerWidth;
    var SCREEN_HEIGHT = window.innerHeight;

    var container;

    var camera, controls, scene, loaded;
    var renderer;

    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    var rotatingObjects = [];
    var morphAnimatedObjects = [];


    var title = $("#post-title").val();
    var url = window.location.href;

    var Post = {
        url:url,
        name:title,
        title: title
    };

    _.templateSettings = {
        interpolate : /\{\{(.+?)\}\}/g
    };

    var simpleText = _.escape($("#simple-html-template").html());
    var simpTemp = _.template(simpleText)
    $("#simple-embed-div").html(simpTemp(Post));

    var iframeText = _.escape($("#iframe-template").html());
    var iframTemp = _.template(iframeText);
    $("#iframe-embed-div").html(iframTemp(Post));

    var clock = new THREE.Clock();

    init();

    function init() {

        //model URL
        var postUrl = $("#post-url").val();
        var filePathName = $("#post-name").val();

        container = document.getElementById("postShowContainer");

        renderer = new THREE.WebGLRenderer( {
            antialias: true,
            preserveDrawingBuffer: true  // required to support .toDataURL()
        });


//    renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
        renderer.domElement.style.position = "relative";
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

//    var geometry = Posts.findOne(Session.get("post"));

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
                shading: THREE.SmoothShading
            }
        };

        json1.materials["flamingo1"] = {
            "type": "MeshLambertMaterial",
            "parameters": { color: 0xffffff, morphTargets: true, morphNormals: true, vertexColors: THREE.FaceColors, shading: THREE.FlatShading }};

        json1.defaults = {
            "bgcolor":[255, 255, 255],
            "bgalpha":0.5,
            "camera":"camera1"
        };
        window.addEventListener( 'resize', onWindowResize, false );



        loader.parse(json1, callbackFinished, "http://localhost:3000/upload/monster.dae");


    }

    function callbackFinished( result ) {
//    $( "message" ).style.display = "none";
//    $( "progressbar" ).style.display = "none";
//    alert("callbackFinished");

        camera = result.currentCamera;
//    camera.aspect = container.clientWidth/container.clientHeight;
        camera.updateProjectionMatrix();

        scene = result.scene;

        var opts = {};

        opts.callback = function(url) {

            document.getElementById("picture").src = url;
            document.getElementById("picture").hidden = false;
            setTimeout("document.getElementById('picture').hidden=true",2000);

        };

        opts.width = 150;
        opts.height = 150;

        THREEx.Screenshot.bindKey(renderer, opts);

        var opts1 = {};
        opts1.element = document.getElementById("postShowContainer");

        if( THREEx.FullScreen.available() ) {
            THREEx.FullScreen.bindKey(opts1);
        }

        mesh = new THREE.Mesh( new THREE.SphereGeometry( 500, 60, 40 ), new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( '/images/background/room.jpg' ) } ) );
        mesh.scale.x = -1;
        scene.add( mesh );

        scene.traverse( function ( object ) {

            if (object.geometry) {

                morphColorsToFaceColors(object.geometry);
                object.geometry.computeMorphNormals();

                if (object.geometry.boundingSphere) {
                    var radius = object.geometry.boundingSphere.radius;
//                Posts.update({"name" : object.name}, {"$set" :{"scale" : 60/radius}});
                }
            }

//        if ( object.properties.rotating === true ) {
//
//            rotatingObjects.push( object );
//
//        }

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



        controls = new THREE.OrbitControls( camera);
        controls.addEventListener( 'change', render );

//    document.getElementById("changeBackground").addEventListener('click', function(event) {
//        alert("changebg");
//        if(scene!==null && mesh !== null) {
//            scene.remove( mesh );
//
//            mesh = new THREE.Mesh( new THREE.SphereGeometry( 500, 60, 40 ), new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( '/images/background/'+ event.target[event.target.selected].value +'.jpg' ) } ) );
//            mesh.scale.x = -1;
//            scene.add( mesh );
//        }
//    },false);

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

//    camera.aspect = container.clientWidth/container.clientHeight;
//    camera.updateProjectionMatrix();
//
//    renderer.setSize( container.clientWidth, container.clientHeight);
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

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

    loadBack("room");

    $("#change-back input[type='radio']").click(function(){
        var backVal = $(this).val();
        loadBack(backVal);

    });

    function loadBack(backVal){
        if(!_.isUndefined(scene)===true && !_.isNull(scene)===true) {
            scene.remove( mesh );

            mesh = new THREE.Mesh( new THREE.SphereGeometry( 500, 60, 40 ), new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( '/images/background/'+backVal+'.jpg' ) } ) );
            mesh.scale.x = -1;
            scene.add( mesh );
        }
    };

});
