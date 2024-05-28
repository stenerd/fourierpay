import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const exportToExcel = (jsonData, fileName) => {
    // Convert JSON to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    // Generate Excel file and trigger download
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `${fileName}.xlsx`);
};
