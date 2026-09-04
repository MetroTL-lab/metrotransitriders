import { Navbar } from './Navbar';
import { RiderApplicationPage } from './RiderApplicationPage';
import { Footer } from './Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <RiderApplicationPage onBackToHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
      <Footer />
    </>
  );
}
