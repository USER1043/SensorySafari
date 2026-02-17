import Navigation from './Navigation';
import './Layout.css';
import Footer from './Footer';  

function Layout({ children }) {
  return (
    <div className="app-layout">
      <Navigation />
      <main className="main-content" role="main">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;