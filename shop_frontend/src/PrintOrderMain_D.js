import React from 'react';
import PriceChartDisplay_D from './PriceChartDisplay_D';
import PrintOrderForm_D from './PrintOrderForm_D';

function PrintRequestPage() {
  return (
    <div>
      <h1><center>Welcome to our Print Services!</center></h1>
      <PriceChartDisplay_D />
      <PrintOrderForm_D />
    </div>
  );
}

export default PrintRequestPage;