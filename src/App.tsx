import Hero from './components/Hero/Hero'
import './App.css'

function App() {
  return (
    <>
      <Hero />
      
      {/* Scrollable content placeholder - allows hero animation to trigger */}
      <section style={{
        minHeight: '200vh',
        padding: '80px 40px',
        background: '#f8f9fa',
        color: '#333',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>
            Continue scrolling to see more...
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#666' }}>
            The hero section above features an interactive scroll-driven paper tear animation.
            Scroll back up to experience the full effect as your portrait transforms from photo to cartoon.
          </p>
          <p style={{ fontSize: '1rem', marginTop: '30px', color: '#999' }}>
            More content coming soon...
          </p>
        </div>
      </section>
    </>
  )
}

export default App
