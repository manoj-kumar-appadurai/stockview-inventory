
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (error) {
      setError('Failed to send reset instructions. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-sm">
        <div className="text-center mb-8">
          <img 
            src="/logo/StockView.png" 
            alt="StockView" 
            className="h-8 mx-auto mb-6" 
          />
          <h2 className="text-2xl font-bold text-gray-900">Forgot your password?</h2>
          <p className="text-gray-600 mt-2">
            {!isSubmitted 
              ? "No worries, we'll send you reset instructions."
              : "Check your email for a reset link."}
          </p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-primary" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Reset password'}
              </Button>
              
              <div className="text-center">
                <Link to="/signin" className="flex items-center justify-center text-sm text-primary hover:underline">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to sign in
                </Link>
              </div>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <div className="bg-green-50 text-green-700 p-4 rounded-md mb-6">
              If an account exists with the email <strong>{email}</strong>, we've sent password reset instructions.
            </div>
            <p className="text-gray-600 mb-6">
              Didn't receive the email? Check your spam folder or try again with a different email address.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" asChild>
                <Link to="/signin">Back to Sign In</Link>
              </Button>
              <Button onClick={() => setIsSubmitted(false)}>
                Try Again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
