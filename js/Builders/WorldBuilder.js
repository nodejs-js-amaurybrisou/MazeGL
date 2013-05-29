(function(){

    var f = function(){
        if(typeof window.mmo == "undefined"){
              window.Logger.log(window.Level.CRITICAL, "mmo is not defined", "WorldBuilder");
              return false;
            } else if(typeof window.mmo.Builders == "undefined"){
                      window.Logger.log(window.Level.CRITICAL, "mmo is not defined", "WorldBuilder");
                      return false;
            }
            return true;
        }

        if(!f){
            return;
        }
})();


window.mmo.Builders.WorldBuilder = function(){
    window.mmo.World.call(this);
    
    //var world_scheme = new window.mmo.WORLD_TYPE(); 
     
    this.getCamera();
    this.add(window.mmo.camera);
    window.mmo.camera.lookAt(this.position);
    window.Logger.log(window.Level.FINE, "Camera Loaded ", "WorldBuilder");

    window.mmo.WORLD_TEXTURE = this.getWorldTexture();
    window.mmo.WORLD_TEXTURE.repeat.set( 1024 , 1024 );
    this.WORLD_TEXTURE = window.mmo.WORLD_TEXTURE;
    window.Logger.log(window.Level.FINE, "World_Texture Loaded ", "WorldBuilder");

    //très long à charger
    // window.mmo.SUN = this.getSun();
    // this.add(window.mmo.SUN);
    // window.Logger.log(window.Level.FINE, "Sun Loaded ", "WorldBuilder");

    window.mmo.MAIN_LIGHT = this.getMainLight();
    this.add(window.mmo.MAIN_LIGHT);
    window.Logger.log(window.Level.FINE, "Main Light Loaded ", "WorldBuilder");

    window.mmo.PLANE = this.getPlane();
    this.add(window.mmo.PLANE);
    window.Logger.log(window.Level.FINE, "Plane Loaded ", "WorldBuilder");
    
    window.mmo.AMBIENT_LIGHT = new window.THREE.AmbientLight(window.mmo.AMBIENT_LIGHT);
    this.add(window.mmo.AMBIENT_LIGHT);
    window.Logger.log(window.Level.FINE, "Ambient Light Loaded ", "WorldBuilder");

    window.mmo.ORIGIN_COLOR = new window.THREE.Color("rgb(66,66,66)");
    this.wo_origin = window.mmo.Attributes.Origin();
    for(var i = 0; i < this.wo_origin.length; i++){
        this.add(this.wo_origin[i]);
    }
    window.Logger.log(window.Level.FINE, "Origin Loaded ", "WorldBuilder");

    //Build Stones;
    window.mmo.Builders.StoneBuilder(this);
    window.Logger.log(window.Level.FINE, "Stones Loaded ", "WorldBuilder");

    window.mmo.avatar_kb = new window.mmo.Events.KeyboardEvents.Avatar_kb();
    /*for(nodeBall in this.avatar_obj.nodesBalls){
        this.add(nodeBall);
    }*/
    window.mmo.avatar_obj = this.getAvatar();

    window.mmo.camera.position.set(
        window.mmo.avatar_obj.position.x, 
        window.mmo.avatar_obj.position.y,
        window.mmo.avatar_obj.position.z
    );
        
    window.mmo.camera.lookAt(window.mmo.avatar_obj.position);
    window.mmo.camera.position.x += 0;
    window.mmo.camera.position.y += window.mmo.AVATAR_SCALE/4;
    window.mmo.camera.position.z += window.mmo.AVATAR_SCALE;

    //window.mmo.avatar_obj.add(window.mmo.camera);
  
    this.add(window.mmo.avatar_obj);
    window.Logger.log(window.Level.FINE, "Avatar Loaded ", "WorldBuilder");
    //this.camera = config.camera;

    // if(typeof world_scheme.update != "undefined"){
    //     this.update = world_scheme.update;
    //     window.Logger.log(window.Level.INFO, "An specific update function is define in your world", "WorldBuilder");
    // }

    // //Get animate method from invoc world or take the default World.js animate funnction.
    // if(typeof world_scheme.animate != "undefined"){
    //     this.animate = world_scheme.animate;
    //     window.Logger.log(window.Level.INFO, "A specific animate function is define in your world", "WorldBuilder");
    // }

    //..... ADD content

};

window.mmo.Builders.WorldBuilder.prototype = Object.create(window.mmo.World.prototype);