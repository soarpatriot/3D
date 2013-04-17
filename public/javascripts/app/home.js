/**
 * Created with JetBrains WebStorm.
 * User: soar
 * Date: 13-2-25
 * Time: 下午8:35
 * To change this template use File | Settings | File Templates.
 */
var container, stats;

var camera, scene, renderer;

var cube, plane;

var targetRotation = 0;
var targetRotationOnMouseDown = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
$(function(){
    init();
    animate();

    function init() {

        //container = $("#canvas-element-id");

        console.log("post.name              ******************************************* ");
        alert("ddd");

        camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
        camera.position.y = 150;
        camera.position.z = 500;

        scene = new THREE.Scene();

        // Cube

        var geometry = new THREE.CubeGeometry( 200, 200, 200 );

        for ( var i = 0; i < geometry.faces.length; i ++ ) {

            geometry.faces[ i ].color.setHex( Math.random() * 0xffffff );

        }

        var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors } );

        cube = new THREE.Mesh( geometry, material );
        cube.position.y = 150;
        scene.add( cube );

        // Plane

        var geometry = new THREE.PlaneGeometry( 200, 200 );
        geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

        var material = new THREE.MeshBasicMaterial( { color: 0xe0e0e0 } );

        plane = new THREE.Mesh( geometry, material );
        scene.add( plane );

        renderer = new THREE.CanvasRenderer();
        renderer.setSize( 400,400 );

        $("#contents").append( renderer.domElement );

        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        //$("#contents").append( stats.domElement );

        document.addEventListener( 'mousedown', onDocumentMouseDown, false );
        document.addEventListener( 'touchstart', onDocumentTouchStart, false );
        document.addEventListener( 'touchmove', onDocumentTouchMove, false );

        //

        window.addEventListener( 'resize', onWindowResize, false );

    }

    function onWindowResize() {

        windowHalfX = 200;
        windowHalfY = 200;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( 400,400 );

    }

    //

    function onDocumentMouseDown( event ) {

        event.preventDefault();

        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        document.addEventListener( 'mouseup', onDocumentMouseUp, false );
        document.addEventListener( 'mouseout', onDocumentMouseOut, false );

        mouseXOnMouseDown = event.clientX - windowHalfX;
        targetRotationOnMouseDown = targetRotation;

    }

    function onDocumentMouseMove( event ) {

        mouseX = event.clientX - windowHalfX;

        targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;

    }

    function onDocumentMouseUp( event ) {

        document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
        document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
        document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

    }

    function onDocumentMouseOut( event ) {

        document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
        document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
        document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

    }

    function onDocumentTouchStart( event ) {

        if ( event.touches.length === 1 ) {

            event.preventDefault();

            mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
            targetRotationOnMouseDown = targetRotation;

        }

    }

    function onDocumentTouchMove( event ) {

        if ( event.touches.length === 1 ) {

            event.preventDefault();

            mouseX = event.touches[ 0 ].pageX - windowHalfX;
            targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;

        }

    }

    //

    function animate() {

        requestAnimationFrame( animate );

        render();
        stats.update();

    }

    function render() {

        plane.rotation.y = cube.rotation.y += ( targetRotation - cube.rotation.y ) * 0.05;
        renderer.render( scene, camera );

    }

});
