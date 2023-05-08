import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    color: "#000000",
    fontSize: "12px",
    lineHeight: "1.5px",
    padding: 30,
    marginTop: 20,
  },
  section: {
    margin: 10,
  },
  footer: {
    margin: 10,
    marginTop: 20,
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
});

// Create Document Component
function BasicDocument({ formData, setOpen }) {
  const { date, senderDetails, salutation, mainContent, endNote } = formData;
  console.log(formData);
  return (
    <PDFViewer style={styles.viewer}>
      {/* Start of the document*/}
      <Document>
        {/*render a single page*/}
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>{date}</Text>
          </View>
          <View style={styles.section}>
            <Text>{senderDetails}</Text>
          </View>
          <View style={styles.section}>
            <Text>{salutation}</Text>
          </View>
          <View style={styles.section}>
            <Text>{mainContent}</Text>
          </View>
          <View style={styles.footer}>
            <Text>{endNote}</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
export default BasicDocument;
