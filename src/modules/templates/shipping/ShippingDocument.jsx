import PropTypes from 'prop-types';
import {Document, Page, Text, View, StyleSheet, Font} from '@react-pdf/renderer';

Font.register({
  family: 'Poppins',
  src: '/fonts/Poppins-Regular.ttf',
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 32,
    fontFamily: 'Poppins',
  },
  value: {padding: 12, margin: 12, alignSelf: 'flex-end'},
  from: {padding: 12, margin: 12},
  to: {
    padding: 12,
    margin: 12,
    alignSelf: 'flex-end',
  },
});

const ShippingDocument = ({
  senderName,
  senderLocation,
  recipientData: {value, name, address, code, city},
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.value}>
          <Text>{`${value} PLN`}</Text>
        </View>
        <View style={styles.from}>
          <Text>{senderName}</Text>
          <Text>{senderLocation.address}</Text>
          <Text>{`${senderLocation.code} ${senderLocation.city}`}</Text>
        </View>
        <View style={styles.to}>
          <Text>{name}</Text>
          <Text>{address}</Text>
          <Text>{`${code} ${city}`}</Text>
        </View>
      </Page>
    </Document>
  );
};
ShippingDocument.propTypes = {
  senderName: PropTypes.string.isRequired,
  senderLocation: PropTypes.objectOf(PropTypes.string).isRequired,
  recipientData: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ShippingDocument;
