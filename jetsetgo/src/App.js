import React from 'react';
import { Plane, LogIn } from 'lucide-react';
import GoogleSignIn from './pages/GoogleSignIn';

function App() {
  return (
    <div className="min-h-screen bg-navy-blue flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <Plane className="mx-auto h-12 w-12 text-sunshine-yellow" />
          <h2 className="mt-6 text-3xl font-extrabold text-navy-blue">JetSetGo</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
        </div>
        <div className="mt-8 space-y-6">
          {/* Use the GoogleSignIn component */}
          <GoogleSignIn />
        </div>
      </div>
    </div>
  );
}

export default App;
