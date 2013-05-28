(function(){
    //load Builders
    window.mmo.World = function(){
        var f = function(){
         if(typeof window.mmo == "undefined"){
          window.Logger.log("mmo is not Defined", "World");
          return false;
         } else if( typeof window.mmo.Builders.WorldBuilder == "undefined"){
             window.Logger.log("mmo is not Defined", "World");
             return false;
         }
         return true;
        };

        if (!f()){
            return null;
        }
        window.Logger.log("Module Loaded", "World");
    };
})();
//Default World extends window.mmo one to create your own
window.mmo.World = function() {
    window.THREE.Scene.call(this);

    this.getCamera = function(){
        window.mmo.camera = window.mmo.Attributes.Camera();

        window.mmo.camera.position.set(
            window.mmo.CAM_POS_X,
            window.mmo.CAM_POS_Y,
            window.mmo.CAM_POS_Z);
        
        window.mmo.position = {
            x : 0,
            y : 0,
            z : 0
        };
        // window.mmo.camControls = new window.THREE.FirstPersonControls(
        //     window.mmo.camera,
        //     window.mmo.SCREEN_SIZE_RATIO );

        // window.mmo.camControls.movementSpeed = window.mmo.TRANS_VIEW_INCREMENT;
        // window.mmo.camControls.lookSpeed = window.mmo.ROT_VIEW_INCREMENT;
        // window.mmo.camControls.noFly = window.mmo.NO_FLY;
        // window.mmo.camControls.lookVertical = window.mmo.LOOK_VERTICAL;
        return window.mmo.camera;
    };
    
    this.getColor = function(rgb_str){
        return new window.THREE.Color(rgb_str);
    };


    this.getPlane = function(){
        window.mmo.PLANET_MAT = window.mmo.Materials.Planet_Materials();
        window.mmo.PLANET_GEO = window.mmo.Materials.Planet_Geo();
        
        var plane = new window.THREE.Mesh(
            window.mmo.PLANET_GEO,
            window.mmo.PLANET_MAT);
     
        plane.rotation.x = window.mmo.PLANE_ROT_X;
        plane.position.y = window.mmo.PLANE_ROT_Y;
        plane.receiveShadow = window.mmo.PLANE_RECV_SHADOW;
        
        return plane;
    };

    this.getAvatar = function(){

        var avatarMat = window.mmo.Materials.Avatar_mat(
            window.mmo.UNIFORMS,
            window.mmo.Attributes.Avatar);

        var avatar_obj = new window.mmo.AVATAR_TYPE(
            avatarMat, 0, 0, 0,
            null);
        return avatar_obj;
    };

    this.getMainLight = function(){
        
        var MAIN_LIGHT = new window.THREE.SpotLight(window.mmo.LIGHT_COLOR);
        MAIN_LIGHT.castShadow = window.mmo.MAIN_LIGHT_CAST_SHADOW;
        MAIN_LIGHT.shadowCameraFar = window.mmo.WORLDSIZE*2;
        MAIN_LIGHT.shadowCameraFov = 2;
        return MAIN_LIGHT;
    };

    this.getWorldTexture = function(){
        var WORLD_TEXTURE = window.THREE.ImageUtils.loadTexture(window.mmo.WORLD_TEXTURE_URL);
        
        WORLD_TEXTURE.wrapS = WORLD_TEXTURE.wrapT = window.THREE.RepeatWrapping;
        return WORLD_TEXTURE;
    };

    this.getSun = function(){
        var sun_mat = window.mmo.Materials.Sun_mat();
        
        return new window.mmo.World_Objects.Sun_obj(window.mmo.SUN_SIZE, 50, 50,
            sun_mat,
            {
                DAY_NIGHT_SPEED : window.mmo.DAY_NIGHT_SPEED,
                WORLDSIZE : window.mmo.WORLDSIZE,
                FAR : window.mmo.FAR
            });
    };

    this.animate = function(t, position){
        window.mmo.sun.animate(t, window.mmo.position, window.mmo.WORLDSIZE);
    };
};

window.mmo.World.prototype = Object.create(window.THREE.Scene.prototype);
