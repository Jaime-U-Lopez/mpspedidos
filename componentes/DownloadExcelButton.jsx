import Link from 'next/link';

function DownloadExcelButton() {
  return (
    <Link href="/api/downloadExcel">
      <p>Descargar Excel</p>
    </Link>
  );
}

export default DownloadExcelButton;
