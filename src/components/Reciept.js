import React from 'react';
import { useSelector } from 'react-redux';
import MyDocument from './DocumentReciept';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
// Create a component to render the PDF
// const MyDocument = () => (
//   <Document>
//     <Page>
//       <Text>Hello, World!</Text>
//     </Page>
//   </Document>
// );

const DownloadButton = ({ loading }) => (
  <div className=''>
    <button className='bg-white w-full rounded-md py-2 px-12 font-bold text-xl text-[#464E4D]'>
      <CloudDownloadIcon className='mb-1' />
      <span className='pl-2 text-sm'>{loading ? `Generating Reciept` : 'Download PDF Receipt'}</span>
    </button>
    <PDFGenerator />
  </div>
)



// Create a React component that wraps the PDFDownloadLink
const PDFGenerator = ({ downloadRef }) => {
  const { transactions, history } = useSelector((state) => state?.dashboard)
  console.log("button", transactions)
  return (
    <div className="w-full">
      {/* <PDFDownloadLink document={<MyDocument transactions={transactions} transact={history} />} fileName={`${history?.name}.pdf`}>
        {({ blob, url, loading, error }) =>

          loading ? 'Generating Receipt' : "Download Reciept"
        }

      </PDFDownloadLink> */}
      <PDFDownloadLink onClick={()=>console.log("clicking")} ref={downloadRef} document={<MyDocument transactions={transactions} transact={history} />} fileName={`${transactions?.payment_link?.name} - ${transactions?.transaction?.in_entity_id?.unique_answer}.pdf`}>
        {({ blob, url, loading, error }) =>
          loading ? (
            <button className='bg-white  border border-gray-300 w-full rounded-md py-2 px-12 font-bold text-xl text-[#464E4D] ' >
              <CloudDownloadIcon className='mb-1' />
              <span className='pl-2 text-sm'>Generating Reciept</span>
            </button>
          ) : (
            <button className='bg-white  border border-gray-300 w-full rounded-md py-2 px-12 font-bold text-xl text-[#464E4D] ' >
              <CloudDownloadIcon className='mb-1' />
              <span className='pl-2 text-sm'>Download PDF Receipt</span>
            </button>
          )
        }
      </PDFDownloadLink>
    </div>
  )
}

// http://localhost:3000/pay/cewAeCcvOJMBEIjaumSS6wUnNvc5WY/reciept/TnVC3HUTAxMnX4Q

// http://localhost:3000/pay/cewAeCcvOJMBEIjaumSS6wUnNvc5WY/reciept/TXNyRfMJgsLmYjb

{/* <PDFDownloadLink document={<MyDocument transactions={transactions} transact={history}/>} fileName={`${history.name}.pdf`}>
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download PDF'
        }
      </PDFDownloadLink> */}

export default PDFGenerator;
