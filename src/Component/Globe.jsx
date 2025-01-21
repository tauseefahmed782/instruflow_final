import React, { useEffect, useRef } from 'react';
import planetaryjs from 'planetary.js';
import * as topojson from 'topojson-client';

const Globe = () => {
  const canvasRef = useRef();
  const globeRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const globe = planetaryjs.planet();
    globeRef.current = globe;

    // Custom lakes plugin
    function lakes(options = {}) {
      let lakesData = null;

      return function(planet) {
        planet.onInit(() => {
          // Ensure `world` data exists before proceeding
          if (planet.plugins.topojson.world) {
            lakesData = topojson.feature(planet.plugins.topojson.world, planet.plugins.topojson.world.objects.ne_110m_lakes);
          }
        });

        planet.onDraw(() => {
          if (lakesData) {
            planet.withSavedContext((context) => {
              context.beginPath();
              planet.path.context(context)(lakesData);
              context.fillStyle = options.fill || 'black';
              context.fill();
            });
          }
        });
      };
    }

    // Fetch TopoJSON data and load plugins
    fetch('https://raw.githubusercontent.com/MadeByDroids/madebydroids.github.io/master/world-110m-withlakes%20(1).json')
      .then((response) => response.json())
      .then((worldData) => {
        globe.loadPlugin(planetaryjs.plugins.earth({
          topojson: { world: worldData },
          oceans: { fill: '#0D47A1' },
          land: { fill: '#4CAF50' },
          borders: { stroke: '#4CAF50' }
        }));
        globe.loadPlugin(lakes({ fill: '#0D47A1' }));
        globe.loadPlugin(planetaryjs.plugins.pings());
        globe.loadPlugin(planetaryjs.plugins.zoom({ scaleExtent: [150, 150] }));

        // Set up globe size and position
        globe.projection.scale(150).translate([250, 250]);

        // Retina display support
        if (window.devicePixelRatio === 2) {
          canvas.width = 500;
          canvas.height = 500;
          const context = canvas.getContext('2d');
          context.scale(2, 2);
        }

        // Draw the globe
        globe.draw(canvas);

        // Function to handle scroll rotation
        const handleScroll = () => {
          const scrollPosition = window.scrollY;
          const rotationSpeed = 0.05;
          const rotation = globe.projection.rotate();
          rotation[0] = (scrollPosition * rotationSpeed) % 360;
          globe.projection.rotate(rotation);
          globe.draw(canvas);
        };

        // Attach scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Clean up event listener on unmount
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      })
      .catch((error) => {
        console.error('Error loading TopoJSON data:', error);
      });
  }, []);

  return (
    <div style={{ margin: 'auto', textAlign: 'center' }}>
      <canvas
        ref={canvasRef}
        id="rotatingGlobe"
        width={500}
        height={500}
        style={{ margin: 'auto', textAlign: 'center', height: 'auto' }}
      />
    </div>
  );
};

export default Globe;
