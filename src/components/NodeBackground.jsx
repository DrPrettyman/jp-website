import React, { useRef, useEffect, useState } from 'react';

const NodeBackground = () => {
  const canvasRef = useRef(null);
  const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains('dark'));
  
  useEffect(() => {
    // Set up observer for dark mode changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas dimensions to match window
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Create nodes
    const nodeCount = 200;
    const nodes = [];
    const connectionDistance = 350; // Maximum distance for node connections
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 5 + 1,
        vx: Math.random() * 1 - 0.5,
        vy: Math.random() * 1 - 0.5,
        // Generate random pastel colors
        color: `hsla(${Math.random() * 360}, 70%, 80%, ${Math.random() * 0.5 + 0.25})`
      });
    }
    
    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Add background color based on dark mode
      ctx.fillStyle = darkMode ? 'rgba(42, 56, 111, 0.9)' : 'rgba(251, 243, 216, 0.9)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections between nodes
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            // Opacity based on distance (closer = more opaque)
            const opacity = 1 - (distance / connectionDistance);
            ctx.strokeStyle = `hsla(${Math.random() * 360}, 90%, 80%, ${opacity * 0.5})`;
            
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      
      // Update and draw nodes
      nodes.forEach(node => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off walls
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
      });
      
      animationFrameId = window.requestAnimationFrame(animate);
    };
    
    animate();
    
    // Clean up
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setCanvasSize);
      observer.disconnect();
    };
  }, [darkMode]); // darkMode in dependency array to re-run effect when it changes
  
  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default NodeBackground;