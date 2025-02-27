import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export const downloadPDF = async (elementId: string, fileName: string) => {
  const element = document.getElementById(elementId)
  if (!element) return

  try {
    const canvas = await html2canvas(element, {
      scale: 2, // HTML을 2배 크기로 렌더링
      useCORS: true, // 외부 이미지 허용
      logging: false, // 디버그 로그 비활성화
      imageTimeout: 0, // 이미지 로딩 제한시간 없음
      removeContainer: true, // 임시 컨테이너 자동 제거
      backgroundColor: '#ffffff', // 배경색 지정
    })

    const pdf = new jsPDF({
      unit: 'mm', // 단위를 밀리미터로 설정
      format: 'a4', // A4 크기 (210mm x 297mm)
      compress: true, // PDF 내부 압축 활성화
    })

    const imgData = canvas.toDataURL('image/png')

    // PDF 페이지 크기 가져오기
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()

    // 이미지가 페이지에 맞도록 비율 계산
    const widthRatio = pageWidth / canvas.width
    const heightRatio = pageHeight / canvas.height
    const ratio = Math.min(widthRatio, heightRatio)

    // 최종 이미지 크기 계산
    const imgWidth = canvas.width * ratio
    const imgHeight = canvas.height * ratio

    // 가로, 세로 여백을 계산하여 중앙 정렬
    const x = (pageWidth - imgWidth) / 2
    const y = (pageHeight - imgHeight) / 2

    pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight)
    pdf.save(`${fileName}.pdf`)
  } catch (error) {
    console.error('PDF 생성 중 오류 발생:', error)
  }
}
