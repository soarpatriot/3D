

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


            /**
            var loader = new THREE.SceneLoader();
            
            loader.addGeometryHandler( "js", THREE.JSONLoader );
            loader.addGeometryHandler( "binary", THREE.BinaryLoader );
            loader.addGeometryHandler( "ctm", THREE.CTMLoader );
            loader.addGeometryHandler( "vtk", THREE.VTKLoader );
            loader.addGeometryHandler( "stl", THREE.STLLoader );
            loader.addHierarchyHandler( "obj", THREE.OBJLoader );
            loader.addHierarchyHandler( "dae", THREE.ColladaLoader );
            loader.addHierarchyHandler( "utf8", THREE.UTF8Loader );**/
//          


            //container.appendChild(loader.statusDomElement);
            //loader.parse(createWrapperJson(filePathName,postUrl), callbackFinished,postUrl);
            //loader.load('/libs/Male02_dds.js', callbackMale);
            //loader.load('/libs/flamingo.js', callbackMale);

            /**
            function onerror(message) {
                console.error(message);
            }**/


            //var testUrl = "http://localhost:8080/files/Male02_dds.js";
                        /**
            zip.useWebWorkers = true;
            zip.createReader(new zip.HttpReader(zipUrl), function(zipReader) {
                zipReader.getEntries(function(entries) {
                    
                    console.log("entries:"+entries);
                    var i = 0;
                    for(;i<entries.length;i++){
                        var filename = entries[i].filename;
                        if(filename==="Male02_dds.js"){
                            loader.load(testUrl, callbackMale);
                        }
                        console.log("filename: "+filename);
                    }
                });
            }, onerror);**/