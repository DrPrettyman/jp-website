import React, { useState, useRef, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Circle, Share2, Undo2, X, Download } from 'lucide-react';

const GraphBuilder = () => {
  const [mode, setMode] = useState('nodes'); // 'none', 'nodes', 'edges'
  const [nodes, setNodes] = useState(() => {
    // Create an equilateral triangle of nodes
    const centerX = 300;
    const centerY = 300;
    const radius = 200;
    
    return [
      { x: centerX, y: centerY - radius }, // top node
      { 
        x: centerX + radius * Math.cos(Math.PI * 7/6), 
        y: centerY + radius * Math.sin(Math.PI * 7/6) 
      }, // bottom right node
      { 
        x: centerX + radius * Math.cos(Math.PI * 11/6), 
        y: centerY + radius * Math.sin(Math.PI * 11/6) 
      } // bottom left node
    ];
  });
  const [selectedNode, setSelectedNode] = useState(null);
  const [edges, setEdges] = useState(() => [
    { from: 0, to: 1 }, // top to bottom right
    { from: 1, to: 2 }, // bottom right to bottom left
    { from: 2, to: 0 },  // bottom left to top
    { from: 1, to: 0 }  
  ]);
  const [adjacencyMatrix, setAdjacencyMatrix] = useState([]);
  const [pathCounts, setPathCounts] = useState([]);
  const [history, setHistory] = useState({
    nodes: [],
    edges: []
  });
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Constants for drawing
  const NODE_RADIUS = 6;
  const ARROW_HEAD_SIZE = 10;

  // Helper function to multiply two matrices
  const multiplyMatrices = (a, b) => {
    const numRows = a.length;
    const numCols = b[0].length;
    const result = Array(numRows).fill().map(() => Array(numCols).fill(0));
    
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        for (let k = 0; k < b.length; k++) {
          result[i][j] += a[i][k] * b[k][j];
        }
      }
    }
    return result;
  };

  // Helper function to count total paths in a matrix
  const countTotalPaths = (matrix) => {
    return matrix.reduce((sum, row) => 
      sum + row.reduce((rowSum, cell) => rowSum + cell, 0), 0);
  };

  // Update history when nodes or edges change
  const updateHistory = (newNodes, newEdges) => {
    setHistory(prev => ({
      nodes: [...prev.nodes, newNodes],
      edges: [...prev.edges, newEdges]
    }));
  };

  // Undo last action
  const handleUndo = () => {
    if (history.nodes.length > 0) {
      const newNodesHistory = history.nodes.slice(0, -1);
      const newEdgesHistory = history.edges.slice(0, -1);
      
      setNodes(newNodesHistory[newNodesHistory.length - 1] || []);
      setEdges(newEdgesHistory[newEdgesHistory.length - 1] || []);
      
      setHistory({
        nodes: newNodesHistory,
        edges: newEdgesHistory
      });
      
      setSelectedNode(null);
    }
  };

  // Clear all nodes and edges
  const handleClear = () => {
    setNodes([]);
    setEdges([]);
    setHistory({
      nodes: [],
      edges: []
    });
    setSelectedNode(null);
  };

  function createDifferencesArray(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
      return [];
    }
    
    const result = [0]; // First element is 0
    
    for (let i = 1; i < arr.length; i++) {
      const difference = arr[i] - arr[i - 1];
      result.push(difference);
    }
    
    return result;
  }

  // Download path counts as CSV
  const handleDownloadCSV = () => {
    // Create CSV content
    const differencesArray = createDifferencesArray(pathCounts.map(count => count.totalPaths));
    const cumulativeSums = pathCounts.reduce((acc, count, index) => {
      const prevSum = index > 0 ? acc[index - 1] : 0;
      return [...acc, prevSum + count.totalPaths];
    }, []);
    
    const csvHeader = "path_length,n_paths,difference,cumulative_sum\n";
    const csvRows = pathCounts.map((count, index) => 
      `${count.length},${count.totalPaths},${differencesArray[index] ?? ''},${cumulativeSums[index]}`
    ).join("\n");
    const csvContent = csvHeader + csvRows;
    
    // Create blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'path_counts.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Resize and redraw canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (canvas && container) {
      // Set canvas to match container width while maintaining aspect ratio
      const containerWidth = container.clientWidth;
      canvas.width = containerWidth;
      canvas.height = containerWidth / 2;
      
      // Redraw after resize
      draw();
    }
  }, [nodes, edges, selectedNode]);

  // Calculate path counts whenever adjacency matrix changes
  useEffect(() => {
    // Use default 1x1 matrix if no nodes exist
    const matrix = nodes.length > 0 
      ? Array(nodes.length).fill().map(() => Array(nodes.length).fill(0))
      : [[0]];

    // Add edges if nodes exist
    if (nodes.length > 0) {
      edges.forEach(({ from, to }) => {
        matrix[from][to] = 1;
      });
    }

    setAdjacencyMatrix(matrix);

    let currentMatrix = matrix;
    const counts = [];
    
    // Calculate paths for lengths 1 through 15
    for (let n = 1; n <= 15; n++) {
      counts.push({
        length: n,
        totalPaths: countTotalPaths(currentMatrix)
      });
      currentMatrix = multiplyMatrices(currentMatrix, matrix);
    }
    setPathCounts(counts);
  }, [nodes, edges]);

  // Helper function to get node at click position
  const getNodeAtPosition = (x, y) => {
    return nodes.findIndex(node => {
      const distance = Math.sqrt(Math.pow(node.x - x, 2) + Math.pow(node.y - y, 2));
      return distance <= NODE_RADIUS;
    });
  };

  // Draw everything on canvas
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges with arrows
    edges.forEach(({ from, to }) => {
      const fromNode = nodes[from];
      const toNode = nodes[to];
      
      ctx.beginPath();
      ctx.moveTo(fromNode.x, fromNode.y);
      
      // Calculate arrow head
      const angle = Math.atan2(toNode.y - fromNode.y, toNode.x - fromNode.x);
      const endX = toNode.x - NODE_RADIUS * Math.cos(angle);
      const endY = toNode.y - NODE_RADIUS * Math.sin(angle);
      
      ctx.lineTo(endX, endY);
      ctx.stroke();

      // Draw arrow head
      ctx.beginPath();
      ctx.moveTo(endX, endY);
      ctx.lineTo(
        endX - ARROW_HEAD_SIZE * Math.cos(angle - Math.PI / 6),
        endY - ARROW_HEAD_SIZE * Math.sin(angle - Math.PI / 6)
      );
      ctx.moveTo(endX, endY);
      ctx.lineTo(
        endX - ARROW_HEAD_SIZE * Math.cos(angle + Math.PI / 6),
        endY - ARROW_HEAD_SIZE * Math.sin(angle + Math.PI / 6)
      );
      ctx.stroke();
    });

    // Draw nodes
    nodes.forEach((node, index) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, NODE_RADIUS, 0, 2 * Math.PI);
      if (index === selectedNode) {
        ctx.fillStyle = 'red';
      } else {
        ctx.fillStyle = 'black';
      }
      ctx.fill();
    });
  };

  // Handle canvas click with dynamic scaling
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // Calculate scale factors
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    // Get click coordinates in canvas space
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    if (mode === 'nodes') {
      const newNodes = [...nodes, { x, y }];
      setNodes(newNodes);
      updateHistory(newNodes, edges);
    } else if (mode === 'edges') {
      const clickedNodeIndex = getNodeAtPosition(x, y);
      if (clickedNodeIndex !== -1) {
        if (selectedNode === null) {
          setSelectedNode(clickedNodeIndex);
        } else if (selectedNode !== clickedNodeIndex) {
          const newEdges = [...edges, { from: selectedNode, to: clickedNodeIndex }];
          setEdges(newEdges);
          updateHistory(nodes, newEdges);
          setSelectedNode(null);
        }
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Canvas */}
        <div 
          ref={containerRef}
          className="bg-white p-6 rounded-lg shadow flex flex-col"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Digraph Explorer</h2>
            <div className="flex gap-2">
                {/* Button for adding nodes*/}
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded ${mode === 'nodes' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                onClick={() => {
                  setMode(mode === 'nodes' ? 'none' : 'nodes');
                  setSelectedNode(null);
                }}
                title="Add Nodes"
              >
                <Circle size={16} /> 
              </button>

                {/* Button for adding edges*/}
              <button
                title="Add Edges"
                className={`flex items-center gap-2 px-4 py-2 rounded ${mode === 'edges' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                onClick={() => {
                  setMode(mode === 'edges' ? 'none' : 'edges');
                  setSelectedNode(null);
                }}
              >
                <Share2 size={16} /> 
              </button>

              {/* Button for Undo*/}
              <button
                title="Undo"
                className="flex items-center gap-2 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700"
                onClick={handleUndo}
                disabled={history.nodes.length === 0}
              >
                <Undo2 size={16} />
              </button>

              {/* Button for Clear*/}
              <button
                title="Clear"
                className="flex items-center gap-2 px-4 py-2 rounded bg-red-200 dark:bg-red-700"
                onClick={handleClear}
              >
                <X size={16} />
              </button>
            </div>
          </div>
          
          <canvas
            ref={canvasRef}
            className="border border-gray-300 bg-white flex-grow"
            onClick={handleCanvasClick}
          />
        </div>

        {/* Right Column - Data */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Path Counts by Path Length</h3>
            <div className="flex gap-2">
              {/* Download CSV Button */}
              <button
                title="Download CSV"
                className="flex items-center gap-2 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700"
                onClick={handleDownloadCSV}
              >
                <Download size={16} />
              </button>
            </div>
          </div>
          <div className="h-72 p-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pathCounts} margin={{ bottom: 20, left: 20, right: 20, top: 20 }}>
                <XAxis 
                  dataKey="length" 
                  label={{ 
                    value: 'Path Length', 
                    position: 'bottom', 
                    offset: 5 
                  }} 
                />
                <YAxis 
                  label={{ 
                    value: 'Total Paths', 
                    angle: -90, 
                    position: 'left', 
                    offset: 10 
                  }} 
                />
                <Tooltip />
                <Bar dataKey="totalPaths" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphBuilder;