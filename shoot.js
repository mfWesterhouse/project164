AFRAME.registerComponent("paint-ball", {
    init: function () {
      this.shootPaintBall();
    },
    shootPaintBall: function () {
      window.addEventListener("keydown", (e) => {
        if (e.key === "p") {
          var paint = document.createElement("a-entity");
  
          paint.setAttribute("geometry", {
            primitive: "sphere",
            radius: 0.1,
            color: "#FFF"
          });
  
          var cam = document.querySelector("#camera");
  
          pos = cam.getAttribute("position");
  
          paint.setAttribute("position", {
            x: pos.x,
            y: pos.y,
            z: pos.z,
          });
  
          var camera = document.querySelector("#camera").object3D;
  
          var direction = new THREE.Vector3();
          camera.getWorldDirection(direction);
  
          paint.setAttribute("velocity", direction.multiplyScalar(-10));
  
          var scene = document.querySelector("#scene");
  
          paint.setAttribute("dynamic-body", {
            shape: "sphere",
            mass: "0",
          });
  
          paint.addEventListener("collide", this.removePaint);
  
          scene.appendChild(paint);
  
          this.shootSound();
        }
      });
    },
    removePaint: function (e) {
      var element = e.detail.target.el;
  
      var elementHit = e.detail.body.el;
  
      if (elementHit.id.includes("box")) {
        elementHit.setAttribute("material", {
          opacity: 1,
          transparent: true,
        });
  
        var impulse = new CANNON.Vec3(-2, 2, 1);
        var worldPoint = new CANNON.Vec3().copy(
          elementHit.getAttribute("position")
        );
  
        elementHit.body.applyImpulse(impulse, worldPoint);
  
        element.removeEventListener("collide", this.removeBullet);
  
        var scene = document.querySelector("#scene");
        scene.removeChild(element);
      }
    },
    shootSound: function () {
      var entity = document.querySelector("#splat");
      entity.components.sound.playSound();
    },
  });