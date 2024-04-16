import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3 }) => {
  return (
    <div className="flex justify-center items-center space-x-6">
      <StepLink step={step1} to="/shipping">Shipping</StepLink>
      {step2 && <hr className="w-8 border-t-2 border-gray-300" />}
      <StepLink step={step2} to="/payment">Payment</StepLink>
      {step3 && <hr className="w-8 border-t-2 border-gray-300" />}
      <StepLink step={step3} to="/place">Place Order</StepLink>
    </div>
  );
};

const StepLink = ({ step, to, children }) => {
  return (
    <Link
      to={to}
      className={`text-lg font-medium ${
        step ? 'text-blue-600 text-lg' : 'text-gray-500'
      }`}
    >
      {children}
    </Link>
  );
};

export default CheckoutSteps;
