import React from 'react'
import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer';
const Document = () => {
    return (
        <Document>
            <Page>
                <Text>Hello, World!</Text>
            </Page>
        </Document>
    )
}

export default Document