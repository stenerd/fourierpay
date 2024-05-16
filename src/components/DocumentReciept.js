import React from 'react'
import { PDFDownloadLink, Document, Page, Text, StyleSheet, View, Image, Link, Svg } from '@react-pdf/renderer';
import moment from 'moment';
const MyDocument = ({ transactions }) => {
    // console.log("tranmsact", transact)
    const styles = StyleSheet.create({
        page: {
            backgroundColor: 'white',
            padding: 10
        },
        section: {
            margin: 30, paddingTop: 30
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignContent: "center",
            alignItems: "center"
        },
        inner: {
            gap: 10
        },
        reciept: {
            fontSize: 30,
            paddingTop: 10,
        },
        top: {
            gap: 10,
            paddingTop: 20,
            flex: 1
        },
        dateText: {
            fontSize: 10
        },
        image: {
            // width: 90,
            // height: 180,
            // flex:1
        },
        amount: {
            fontSize: 20,
            fontWeight: 'bold',
            color: 'green',
            paddingTop: 3
        },
        general: {
            paddingTop: 10,
            paddingBottom: 10,
            color: 'green',
            fontSize: 10
        },
        small: {
            color: '#999999',
            fontSize: 10
        },
        big: {
            color: "black",
            fontSize: 17,
            paddingTop: 8,
            // marginTop:12
        },
        link: {
            paddingTop: 8,
            fontSize: 12,
        },
        footer: {
            paddingTop: 10,
            display: "flex",
            justifyContent: "space-between",
            // flexDirection:'row',
            // alignContent:"center",
            // alignItems:"center"
        },
        green: {
            color: 'green'
        },
        flex: {
            flex: 1
        },
        images: {
            flex: 1,
            width: 60,
            height: 60
        },
        bigger: {
            fontSize: 25,
            flex: 1,
            lineHeight: 30,
        },
        logo: {
            width: 50,
            // height: 160,
            flex: 1,
            // objectFit:'con'
        },
        container: {
            marginTop: 10,
            paddingTop: 10
        }
    });

    // console.log("button2", transactions)
    return (
        <Document>
            <Page style={styles.page}>
                <View style={styles.section}>
                    <View style={styles.header}>
                        <View style={styles.top}>
                            <Text style={styles.reciept}>Receipt</Text>
                            <Text style={styles.dateText}>{moment(transactions?.transaction?.createdAt).format('dddd, DD MMMM YYYY')}</Text>
                        </View>
                        <Image style={styles.logo} src="/images/fourierlogo.png" alt="" />
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.small}>Amount</Text>
                        <Text style={styles.amount}>{transactions?.payment_link?.amount}</Text>
                    </View>
                    <View style={styles.general}>
                        <Text style={styles.small}>Transaction Reference</Text>
                        <Text style={styles.big}>{transactions?.transaction?.reference}</Text>
                    </View>
                    <View style={styles.general}>
                        <Text style={styles.small}>Status</Text>
                        <Text style={styles.big}>{transactions?.transaction?.status}</Text>
                    </View>
                    <View style={styles.general}>

                        <Text style={styles.small}>Payment Name</Text>
                        <Text style={styles.big}>{transactions?.payment_link?.name}</Text>
                    </View>

                    <View style={styles.general}>
                        <Text style={styles.small}>Payment Link</Text>
                        <Link style={styles.link} src={transactions?.payment_link?.link}>
                            {transactions?.payment_link?.link}
                        </Link>
                    </View>
                    {/* <View style={styles.general}>
                        <Text style={styles.small}>VAT</Text>
                        <Text style={styles.big}>{transactions?.in_entity_id?.charges}</Text>
                    </View>   */}
                    {transactions?.transaction?.in_entity_id?.form.map((form, index) => {
                        return (
                            <View style={styles.general} key={index}>
                                <Text style={styles.small}>{form?.field_name}</Text>
                                <Text style={styles.big}>{form?.answer}</Text>
                            </View>
                        )
                    })}
                    {/* <View style={styles.container}>
                        <Text style={styles.bigger}><Text style={styles.green}> SCAN QR CODE</Text> TO CHECK YOUR TRANSACTION STATUS</Text>
                        <Image src="/images/qrcode.png" alt="" />
                    </View> */}
                    <View>
                        <Text style={{ fontSize: 25, color: "green", paddingTop: 10, paddingBottom: 10 }}>SCAN QR CODE BELOW TO CHECK YOUR TRANSACTION STATUS</Text>
                        <Image src="/images/qrcode.png" alt="" />
                    </View>
                </View>
            </Page>
        </Document>
        //     <Document>
        //     <Page>
        //       <Text>Hello, World!</Text>
        //     </Page>
        //   </Document>

    )

    // Create a component to render the PDF
}

export default MyDocument;