import { message } from 'antd';
import ExcelJS from 'exceljs';
import { useCallback } from 'react';

export type ExportExcel = {
  excel: {
    sheetName: string;
    sheetData: any[][];
    header: string[]
  }[],
  fileName: string;
}
const useExport = () => {
  const exportExcel = useCallback((props?: ExportExcel) => {
    if (!props) {
      message.error('数据格式有误!');
      return;
    }
    const {
      excel,
      fileName,
    } = props;
  
    if (!Array.isArray(excel)) {
      message.error('数据格式有误!');
      return;
    }
    let workbook = new ExcelJS.Workbook();
    excel.forEach((excelItem) => {
      const sheet = workbook.addWorksheet(excelItem.sheetName);
      sheet.columns = excelItem.header.map((item, index) => ({
        header: item,
        id: `${item}-${index}`,
        width: item.length * 3,
        style: {
          alignment: {
            horizontal: 'center',
            vertical: 'middle',
          },
        },
      }));
      excelItem.sheetData.forEach((item) => {
        sheet.addRow(item);
      });
      if (Array.isArray(excelItem.header) && excelItem.header.length > 0) {
        sheet.getRow(1).font = { bold: true };
      }
    });
  
    workbook.xlsx.writeBuffer().then((fileData) => {
      const blob = new Blob([fileData], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = `${fileName}.xlsx` || '文件.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    }).finally(() => {
      workbook = new ExcelJS.Workbook();
    });
  }, []);

  const mergeExcel: (fileName: string, ...other: ExportExcel[]) => ExportExcel
   = useCallback((fileName, ...other) => {
     if (!other) {
       return other;
     }
     
     const excel = other?.reduce((prev, next) => {
       if (prev && next) {
         prev.excel.push(...next.excel);
       }
       return prev;
     });
     return {
       excel: excel?.excel ?? [],
       fileName,
     };
   }, []);

  return { exportExcel, mergeExcel };
};

export default useExport;
