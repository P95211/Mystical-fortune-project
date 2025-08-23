import { useState, useEffect } from 'react'
import { tarotCards } from './data/tarotCards.js'
import './App.css'

function App() {
  const [deck, setDeck] = useState([])
  const [drawnCards, setDrawnCards] = useState([])
  const [isShuffling, setIsShuffling] = useState(false)
  const [showReading, setShowReading] = useState(false)
  const [flippedCards, setFlippedCards] = useState([false, false, false])

  // Initialize deck on component mount
  useEffect(() => {
    shuffleDeck()
  }, [])

  // Shuffle deck function
  const shuffleDeck = () => {
    setIsShuffling(true)
    const shuffled = [...tarotCards].sort(() => Math.random() - 0.5)

    setTimeout(() => {
      setDeck(shuffled)
      setIsShuffling(false)
    }, 1500)
  }

  // Draw three cards
  const drawCards = () => {
    if (deck.length < 3) return

    const selectedCards = deck.slice(0, 3)
    setDrawnCards(selectedCards)
    setShowReading(true)
    setFlippedCards([false, false, false])
  }

  // Flip a specific card
  const flipCard = (index) => {
    const newFlippedCards = [...flippedCards]
    newFlippedCards[index] = true
    setFlippedCards(newFlippedCards)
  }

  // Reset reading
  const resetReading = () => {
    setDrawnCards([])
    setShowReading(false)
    setFlippedCards([false, false, false])
    shuffleDeck()
  }

  const cardPositions = ['Past', 'Present', 'Future']

  return (
    <div className="app">
      {/* Animated particles background */}
      <div className="particles">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }}></div>
        ))}
      </div>

      <div className="container">
        <header className="header">
          <h1 className="title">✨ Mystical Tarot Reading ✨</h1>
          <p className="subtitle">Discover your past, present, and future</p>
        </header>

        {!showReading ? (
          <div className="deck-section">
            <div className={`deck ${isShuffling ? 'shuffling' : ''}`}>
              <div className="card-back"></div>
              <div className="card-back card-offset-1"></div>
              <div className="card-back card-offset-2"></div>
            </div>

            <div className="controls">
              <button 
                className="btn btn-shuffle" 
                onClick={shuffleDeck}
                disabled={isShuffling}
              >
                {isShuffling ? '🔮 Shuffling...' : '🔄 Shuffle Deck'}
              </button>

              <button 
                className="btn btn-draw" 
                onClick={drawCards}
                disabled={isShuffling || deck.length < 3}
              >
                ✨ Draw Cards
              </button>
            </div>
          </div>
        ) : (
          <div className="reading-section">
            <div className="cards-container">
              {drawnCards.map((card, index) => (
                <div key={card.id} className="card-position">
                  <h3 className="position-label">{cardPositions[index]}</h3>
                  <div 
                    className={`tarot-card ${flippedCards[index] ? 'flipped' : ''}`}
                    onClick={() => !flippedCards[index] && flipCard(index)}
                  >
                    <div className="card-inner">
                      <div className="card-back-face">
                        <div className="card-back-design">🌙</div>
                      </div>
                      <div className="card-front-face">
                        <div className="card-content">
                          <h4 className="card-name">{card.name}</h4>
                          <p className="card-meaning">{card.meaning}</p>
                          <p className="card-description">{card.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="reading-controls">
              <button className="btn btn-reset" onClick={resetReading}>
                🔮 New Reading
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
