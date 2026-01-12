import Navigation from './Navigation';
import './Layout.css';

function Layout({ children }) {
  return (
    <div className="app-layout">
      <Navigation />
      <main className="main-content" role="main">
        {children}
      </main>
      <footer className="app-footer">
        <p>Animal Learning App for Kids 🌟</p>
      </footer>
    </div>
  );
}

export default Layout;