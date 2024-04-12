import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  coupon: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    border: '1px solid #000000',
  },
});

const CouponReport = ({ coupons }) => (
  <PDFViewer style={{ width: '100%', height: '100vh' }}>
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Coupon Report</Text>
          {coupons.map((coupon, index) => (
            <View key={index} style={styles.coupon}>
              <Text>Coupon ID: {coupon.couponId}</Text>
              <Text>Discount Type: {coupon.discountType}</Text>
              <Text>Discount Percentage: {coupon.discountPercentage}%</Text>
              <Text>Fixed Amount: {coupon.fixedAmount}</Text>
              <Text>Minimum Purchase Count: {coupon.minCount}</Text>
              <Text>Expiration Date: {coupon.ExpDate}</Text>
              <Text>Coupon Visibility: {coupon.couponVisibility}</Text>
              <Text>Customer ID: {coupon.cusId}</Text>
              <Text>Description: {coupon.description}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

export default CouponReport;
