import React from 'react';
import PriceChartDisplay from '../components_D/PriceChartDisplay_D';
import PrintOrderForm from '../components_D/PrintOrderForm_D';

function PrintRequestPage() {
  return (
    <div>
      <h1><center>Welcome to our Print Services!</center></h1>
      <PriceChartDisplay />
      <PrintOrderForm />
    </div>
  );
}

export default PrintRequestPage;
