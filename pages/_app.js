import '@/styles/globals.css';
import { useState } from 'react';
import { Navbar_Prim, Footer, VectorPad } from '../components';
import RobotAssistant from '../components/RobotAssistant';

export default function App({ Component, pageProps }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-transparent overflow-hidden min-h-screen">
      {/* Global Navigation */}
      <Navbar_Prim />

      {/* Page Content */}
      <Component {...pageProps} setOpen={setOpen} />

      {/* Global Footer */}
      <Footer setOpen={setOpen} />

      {/* Global Robot Assistant */}
      <RobotAssistant />

      {/* Global Modal */}
      {open && (
        <VectorPad
          onSelectTechnical={() => {
            window.open('https://docs.google.com/forms/d/e/1FAIpQLSeYCluNgFEkYtMb5uVdfotvmqKduGwDhof92pWDRueX-V_Plw/viewform?usp=header', '_blank');
            setOpen(false);
          }}
          onSelectNonTechnical={() => {
            window.open('https://docs.google.com/forms/d/e/1FAIpQLScTDNff49n1LQCitTSIFDPUSABn-FnItnwoSYN8ztqfFeOrbA/viewform?usp=header', '_blank');
            setOpen(false);
          }}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
