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
            fontSize: 15,
            paddingTop: 10,
        },
        top: {
            gap: 10,
            paddingTop: 20,
            flex: 1,
            textAlign: 'right'
        },
        dateText: {
            fontSize: 10
        },
        amount: {
            fontSize: 23,
            fontWeight: 700,
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
        },
        link: {
            paddingTop: 8,
            fontSize: 12,
        },
        footer: {
            paddingTop: 10,
            display: "flex",
            justifyContent: "space-between",
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
            // width: "100%",
            // height: 35,
            width: "2rem",
            flex: 1,
            objectFit: "contain"
        },
        container: {
            marginTop: 10,
            paddingTop: 10
        }
    });
    return (
        <Document>
            <Page style={styles.page}>
                <View style={styles.section}>
                    <View style={styles.header}>
                        <View style={styles.logo}>
                            <Image style={{ width: 120 }} src="/images/logoo.png" alt='logo' />
                        </View>
                        <View style={styles.top}>
                            <Text style={styles.reciept}>Transaction Receipt</Text>
                            <Text style={styles.dateText}>{moment(transactions?.transaction?.createdAt).format('dddd, DD MMMM YYYY')}</Text>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.small}>Amount</Text>
                        <Text style={styles.amount}>#{Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(transactions?.payment_link?.amount || 0)}</Text>
                    </View>
                    <View style={styles.general}>
                        <Text style={styles.small}>Transaction Reference</Text>
                        <Text style={styles.big}>{transactions?.transaction?.reference}</Text>
                    </View>
                    <View style={styles.general}>
                        <Text style={styles.small}>STATUS</Text>
                        <Text style={styles.big}>{transactions?.transaction?.status.toUpperCase()}</Text>
                    </View>
                    <View style={styles.general}>
                        <Text style={styles.small}>PAYMENT NAME</Text>
                        <Text style={styles.big}>{transactions?.payment_link?.name.toUpperCase()}</Text>
                    </View>
                    <View style={styles.general}>
                        <Text style={styles.small}>PAYMENT LINK</Text>
                        <Link style={styles.link} src={transactions?.payment_link?.link}>
                            {transactions?.payment_link?.link}
                        </Link>
                    </View>
                    <View style={styles.general}>
                        <Text style={styles.small}>TRANSACTION LOOKUP</Text>
                        <Link style={styles.link} src={`https://app.fourierpay.com/reciept/${transactions?.transaction?.reference}`}>
                            {`https://app.fourierpay.com/reciept/${transactions?.transaction?.reference}`}
                        </Link>
                    </View>
                    {transactions?.transaction?.in_entity_id?.form.map((form, index) => {
                        return (
                            <View style={styles.general} key={index}>
                                <Text style={styles.small}>{form?.field_name.toUpperCase()}</Text>
                                <Text style={styles.big}>{form?.answer.toUpperCase()}</Text>
                            </View>
                        )
                    })}
                    <View style={{ display: "flex", justifyContent: "space-between", alignContent: "flex-start", alignItems: "flex-start", flexDirection: 'row', gap: 20, marginTop: 15 }}>
                        <Text style={{ fontSize: 30, paddingTop: 10, flex: 1, textAlign: 'left' }}><Text style={{ fontWeight: 'bold', color: 'green' }}>SCAN QR CODE</Text> TO CHECK YOUR TRANSACTION STATUS</Text>
                        <View>
                            <Image style={{ width: 150 }} src="/images/qrcode.png" alt="" />
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default MyDocument;