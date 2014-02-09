

mesh.scale.set( 1, 1, 1 );

if(scene!==null && mesh !== null) {
    scene.remove( mesh );
    if(theBackground != "no") {
        mesh = new THREE.Mesh( new THREE.SphereGeometry( 500, 60, 40 ), new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( '/images/background/'+ theBackground +'.jpg' ) } ) );
        mesh.scale.x = -1;
        scene.add( mesh );
    } else {

    }
}



 
https://github.com/springmeyer/node-zipfile