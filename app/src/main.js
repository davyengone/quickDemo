/* globals define */
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var ImageSurface = require('famous/surfaces/ImageSurface');


    // create the main context
    var mainContext = Engine.createContext();

    // your app here
    mainContext.setPerspective(1000);

    var images = [
            '/content/images/famous_logo.png',
            '/content/images/Angular.png',
            '/content/images/chrome.jpeg',
            '/content/images/dart.jpeg',
            '/content/images/bower.jpeg',
            '/content/images/grunt.png',
            '/content/images/require.jpeg'
        ];
    var start = 0;

    var logo = new ImageSurface({
        size: [200, 200],
        content: images[0],
        classes: ['backfaceVisibility']
    });

    var movingLogo = new ImageSurface({
        size: [200, 200],
        classes: ['backfaceVisibility']
    });

    

    var initialTime = Date.now();
    var centerSpinModifier = new Modifier({
        align: [0.5, 0.5],
        origin: [0.5, 0.5],
        transform: function() {
            return Transform.rotateY(.002 * (Date.now() - initialTime));
        }
    });

    var movingLogoModifier = new Modifier({
        align: [1, 1],
        origin: [0.5, 0.5],
        transform: rotate
    });

    function rotate(){
        return Transform.rotateY(.002 * (Date.now() - initialTime));
    }

    var rotating = true;

    var interval = setInterval(setContent, 3000);

    logo.on('click', function(){
        if (rotating) {
            centerSpinModifier.halt();
        }else{
            centerSpinModifier.setTransform(rotate);
        }
        rotating = !rotating;
    });

    function setContent(){
        if (start === images.length) start = 0;

        movingLogo.setContent(images[start]);
        logo.setContent(images[start++]);
    }

    mainContext.add(centerSpinModifier).add(logo);
});
