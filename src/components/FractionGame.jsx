import React, { useState, useEffect, useRef } from 'react';

const FractionGame = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [targetFraction, setTargetFraction] = useState([0, 0]);
  const [currentFraction, setCurrentFraction] = useState(0);
  const [score, setScore] = useState(null);
  const [showScore, setShowScore] = useState(false);
  const [useDecimal, setUseDecimal] = useState(false);
  const svgRef = useRef(null);

  const createFraction = () => {
    // Create a fraction with a denominator between 1 and 25
    const denominator = Math.floor(Math.random() * 20) + 1;
    // Create a numerator between 1 and the denominator
    const numerator = Math.floor(Math.random() * (denominator - 1) + 1);
    return [numerator, denominator];
  };

  const formatFraction = (fraction) => {
    if (useDecimal) {
      // Display as decimal with 2 decimal places
      return fraction.toFixed(2);
    } else {
      // Convert to fraction with denominator up to 25
      // Find the best approximation with denominator <= 25
      const denominator = 25;
      const numerator = Math.round(fraction * denominator);
      
      // Simplify the fraction using GCD
      const gcd = (a, b) => b ? gcd(b, a % b) : a;
      const divisor = gcd(numerator, denominator);
      
      return `${numerator/divisor}/${denominator/divisor}`;
    }
  };

  // Initialize the game with random fractions
  useEffect(() => {
    const [numerator, denominator] = createFraction();
    setCurrentFraction(0.5);
    setTargetFraction([numerator, denominator]);
  }, [useDecimal]);

  // Calculate visualization dimensions
  const calculateDimensions = () => {
    const width = 260;
    const height = 100;
    const fillWidth = width * currentFraction;

    return {
      width,
      height,
      fillWidth
    };
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    if (showScore) return;

    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());

    // Calculate fraction based on x position
    const { width } = calculateDimensions();
    // Get the position relative to the left edge of our rectangle
    const relativeX = svgP.x;
    
    // Constrain to 0-1 range
    let fraction = Math.max(0, Math.min(1, relativeX / width));
    
    setCurrentFraction(fraction);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSubmit = () => {
    // Calculate the absolute difference
    const difference = Math.abs(targetFraction[0] / targetFraction[1] - currentFraction);
    
    // Score from 0-100% based on the difference
    // 0 difference = 100%, 1.0 difference = 0%
    const scorePercent = Math.max(0, 100 - (difference * 100));
    let score;
    if (scorePercent >= 95) {
      score = 'Awesome!';
    } else if (scorePercent >= 90) {
      score = 'Excellent!';
    } else if (scorePercent >= 80) {
      score = 'Good!';
    } else if (scorePercent >= 70) {
      score = 'OK';
    } else {
      score = 'Not great...';
    }
    
    setScore(score);
    setShowScore(true);
  };

  const handleReset = () => {
    // Random fraction between 0 and 1
    const [numerator, denominator] = createFraction();
    setCurrentFraction(0.5); // Reset to middle
    setTargetFraction([numerator, denominator]);
    setScore(null);
    setShowScore(false);
  };

  const dimensions = calculateDimensions();

  return (
    <div className="w-full max-w-md rounded-lg border border-gray-200 shadow-sm bg-white dark:bg-gray-900">
      <div className="p-6 pb-2 flex justify-between items-center">
        <h2 className="text-xl font-semibold tracking-tight">Fraction Estimation Game</h2>
        <button 
            onClick={() => {
              setUseDecimal(!useDecimal);
              setScore(null);
              setShowScore(false);
            }} 
            className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100"
        >
            {useDecimal ? 'decimal' : 'fraction'}
        </button>
      </div>
      <div className="p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="text-lg space-y-2 text-center">
            <div>{useDecimal ? `Target Fraction: ${formatFraction(targetFraction[0] / targetFraction[1])}` : `Target Fraction: ${targetFraction[0]} / ${targetFraction[1]}`}</div>
            <div>{showScore ? `Your Fraction: ${formatFraction(currentFraction)} — ${score}` : 'Drag the handle to match the target fraction'}</div>
          </div>
          
          <svg
            ref={svgRef}
            width="300"
            height="300"
            className="border border-gray-200 rounded"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Container rectangle */}
            <rect
              x="20"
              y="100"
              width={dimensions.width}
              height={dimensions.height}
              fill="none"
              stroke="black"
              strokeWidth="2"
            />
            
            {/* Filled portion representing the fraction */}
            <rect
              x="20"
              y="100"
              width={dimensions.fillWidth}
              height={dimensions.height}
              fill="rgba(0, 0, 255, 0.3)"
            />
            
            {/* Draggable handle */}
            <rect
              x={dimensions.fillWidth + 18}
              y="100"
              width="4"
              height={dimensions.height}
              fill="blue"
              cursor="ew-resize"
              onMouseDown={handleMouseDown}
            />
          </svg>

          <div className="flex gap-4 items-center">
            <button 
              onClick={handleSubmit} 
              disabled={showScore}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit
            </button>
            <button 
              onClick={handleReset} 
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
            >
              New Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FractionGame;