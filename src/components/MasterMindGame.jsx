import { useState, useEffect } from 'react';

const MasterMindGame = () => {
  // Available colors
  const COLORS = [
    { name: 'red', class: 'bg-red-500' },
    { name: 'blue', class: 'bg-blue-500' },
    { name: 'green', class: 'bg-green-500' },
    { name: 'yellow', class: 'bg-yellow-400' },
    { name: 'purple', class: 'bg-purple-500' },
    { name: 'orange', class: 'bg-orange-500' },
    { name: 'pink', class: 'bg-pink-500' },
    { name: 'cyan', class: 'bg-cyan-500' },
  ];

  const MAX_GUESSES = 8;
  const PEGS_PER_GUESS = 4;

  // Game state
  const [secretCode, setSecretCode] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);

  // Initialize game with random secret code (4 different colors)
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const shuffled = [...COLORS].sort(() => Math.random() - 0.5);
    const code = shuffled.slice(0, PEGS_PER_GUESS).map(c => c.name);
    setSecretCode(code);
    setGuesses([]);
    setCurrentGuess([]);
    setGameWon(false);
    setGameLost(false);
  };

  const handleColorClick = (colorName) => {
    if (gameWon || gameLost) return;
    if (currentGuess.length >= PEGS_PER_GUESS) return;

    const newGuess = [...currentGuess, colorName];
    setCurrentGuess(newGuess);

    // Auto-submit when 4 colors are selected
    if (newGuess.length === PEGS_PER_GUESS) {
      submitGuess(newGuess);
    }
  };

  const submitGuess = (guess) => {
    const feedback = calculateFeedback(guess);
    const newGuesses = [...guesses, { guess, feedback }];
    setGuesses(newGuesses);
    setCurrentGuess([]);

    // Check win condition
    if (feedback.red === PEGS_PER_GUESS) {
      setGameWon(true);
    } else if (newGuesses.length >= MAX_GUESSES) {
      setGameLost(true);
    }
  };

  const calculateFeedback = (guess) => {
    let red = 0;
    let yellow = 0;
    const secretCopy = [...secretCode];
    const guessCopy = [...guess];

    // First pass: count exact matches (red pegs)
    for (let i = 0; i < PEGS_PER_GUESS; i++) {
      if (guessCopy[i] === secretCopy[i]) {
        red++;
        secretCopy[i] = null;
        guessCopy[i] = null;
      }
    }

    // Second pass: count color matches in wrong position (yellow pegs)
    for (let i = 0; i < PEGS_PER_GUESS; i++) {
      if (guessCopy[i] !== null) {
        const foundIndex = secretCopy.indexOf(guessCopy[i]);
        if (foundIndex !== -1) {
          yellow++;
          secretCopy[foundIndex] = null;
        }
      }
    }

    return { red, yellow };
  };

  const getColorClass = (colorName) => {
    return COLORS.find(c => c.name === colorName)?.class || 'bg-gray-300';
  };

  const renderFeedbackPegs = (feedback) => {
    const pegs = [];
    for (let i = 0; i < feedback.red; i++) {
      pegs.push(<div key={`red-${i}`} className="w-2 h-2 bg-red-600 rounded-full" />);
    }
    for (let i = 0; i < feedback.yellow; i++) {
      pegs.push(<div key={`yellow-${i}`} className="w-2 h-2 bg-yellow-300 rounded-full" />);
    }
    while (pegs.length < PEGS_PER_GUESS) {
      pegs.push(<div key={`empty-${pegs.length}`} className="w-2 h-2 bg-gray-300 rounded-full" />);
    }
    return pegs;
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Mastermind</h2>

      {/* Game board - 8 rows */}
      <div className="flex flex-col gap-2 w-full">
        {Array.from({ length: MAX_GUESSES }).map((_, rowIndex) => {
          const guess = guesses[rowIndex];
          const isCurrentRow = rowIndex === guesses.length && !gameWon && !gameLost;

          return (
            <div
              key={rowIndex}
              className={`flex items-center gap-3 p-2 rounded ${
                isCurrentRow ? 'bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
            >
              {/* Guess pegs */}
              <div className="flex gap-2">
                {Array.from({ length: PEGS_PER_GUESS }).map((_, pegIndex) => {
                  let colorClass = 'bg-gray-200 dark:bg-gray-600';

                  if (guess) {
                    colorClass = getColorClass(guess.guess[pegIndex]);
                  } else if (isCurrentRow && currentGuess[pegIndex]) {
                    colorClass = getColorClass(currentGuess[pegIndex]);
                  }

                  return (
                    <div
                      key={pegIndex}
                      className={`w-10 h-10 rounded-full ${colorClass} border-2 border-gray-300 dark:border-gray-500`}
                    />
                  );
                })}
              </div>

              {/* Feedback pegs */}
              <div className="grid grid-cols-2 gap-1 p-2 bg-gray-100 dark:bg-gray-700 rounded">
                {guess ? (
                  renderFeedbackPegs(guess.feedback)
                ) : (
                  Array.from({ length: PEGS_PER_GUESS }).map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full" />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Game status */}
      {gameWon && (
        <div className="text-green-600 dark:text-green-400 font-bold text-lg">
          You won! You cracked the code!
        </div>
      )}
      {gameLost && (
        <div className="text-red-600 dark:text-red-400 font-bold text-lg">
          Game Over! The code was:{' '}
          <div className="flex gap-1 justify-center mt-2">
            {secretCode.map((color, i) => (
              <div key={i} className={`w-6 h-6 rounded-full ${getColorClass(color)}`} />
            ))}
          </div>
        </div>
      )}

      {/* Color palette */}
      <div className="flex flex-col gap-3 w-full">
        <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
          {!gameWon && !gameLost ? (
            `Select ${PEGS_PER_GUESS - currentGuess.length} color${PEGS_PER_GUESS - currentGuess.length !== 1 ? 's' : ''}`
          ) : (
            <button
              onClick={startNewGame}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            >
              New Game
            </button>
          )}
        </div>
        <div className="flex gap-2 justify-center flex-wrap">
          {COLORS.map((color) => (
            <button
              key={color.name}
              onClick={() => handleColorClick(color.name)}
              disabled={gameWon || gameLost}
              className={`w-12 h-12 rounded-full ${color.class} border-2 border-gray-400 dark:border-gray-500
                hover:scale-110 active:scale-95 transition-transform
                ${gameWon || gameLost ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="text-xs text-gray-500 dark:text-gray-400 text-center max-w-xs">
        Click colors to make your guess. Red pegs = correct color & position. Yellow pegs = correct color, wrong position.
      </div>
    </div>
  );
};

export default MasterMindGame;
