import React from "react";
import { Document, Page, Font, StyleSheet, Text, View } from "@react-pdf/renderer";

const PdfGen = (props) => {

	const styles = StyleSheet.create({
		page: {display: 'flex', flexDirection: 'column', justifyContent: 'center'},
		topandbot: {flex: .1, paddingTop:10, width:'95%', textAlign: 'center'},
		middle: { display: 'flex', flexDirection: 'row', flex: .8},
		right: { flex:.6, marginRight:10, border:.5, padding:10, borderColor:'#e0e0e0'},
		left: { flex:.4, marginLeft:10, border:.5, borderRight:0, padding:10, width:'100%', borderColor:'#e0e0e0'},
		sectionTitle: { textAlign: 'center', borderBottom:.5, marginBottom: 10, paddingBottom:5}
	});
		
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.topandbot}>
					<Text style={{marginTop: 5,textAlign: 'center', fontSize: 25, fontWeight: 'bold'}}>{props.title}</Text>
					<Text style={{fontSize:10}}>{props.date}</Text>
				</View>
				<View style={styles.middle}>
					<View style={styles.left}>
						<Text style={styles.sectionTitle}>Cues</Text>
						{props.cues.trim().split('\n').map((cue) => (
              <Text style={{fontSize: 12}}>&#8226; {cue}</Text>
            ))}
					</View>
					<View style={styles.right}>
						<Text style={styles.sectionTitle}>Notes</Text>
						<Text style={{fontSize: 12}}>{props.notes}</Text>
					</View>
				</View>
				<View style={styles.topandbot}>
					<Text style={styles.sectionTitle}>Summary</Text>
					<Text>{props.summary}</Text>
				</View>
			</Page>
		</Document>
	);
}

export default PdfGen;