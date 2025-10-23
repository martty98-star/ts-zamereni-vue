/**
 * PDF Generator utility
 * Používá html2canvas + jspdf pro vytvoření PDF snapshotu formuláře
 */

import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

/**
 * Vygeneruje PDF snapshot celého formuláře
 * @returns {Promise<{pdfBase64: string, pdfBlob: Blob}>}
 */
export async function generatePdfSnapshot() {
  try {
    const formWrapper = document.getElementById('formWrapper')

    if (!formWrapper) {
      throw new Error('Form wrapper element not found')
    }

    // Vytvoř canvas snapshot
    const canvas = await html2canvas(formWrapper, {
      scale: 2, // Vyšší kvalita
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: formWrapper.scrollWidth,
      windowHeight: formWrapper.scrollHeight
    })

    // Vypočti rozměry pro PDF (A4 formát)
    const imgWidth = 210 // A4 width v mm
    const pageHeight = 297 // A4 height v mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight

    const pdf = new jsPDF('p', 'mm', 'a4')
    let position = 0

    // Převeď canvas na image
    const imgData = canvas.toDataURL('image/png')

    // Přidej první stránku
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    // Pokud obsah přesahuje jednu stránku, přidej další stránky
    while (heightLeft > 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    // Vrať Base64 string a Blob
    const pdfBase64 = pdf.output('datauristring').split(',')[1]
    const pdfBlob = pdf.output('blob')

    return { pdfBase64, pdfBlob }
  } catch (error) {
    console.error('PDF generation failed:', error)
    // Fallback: vytvoř textové PDF s klíčovými údaji
    return generateFallbackPdf()
  }
}

/**
 * Fallback PDF generátor (textový)
 * Použije se, pokud html2canvas selže
 */
function generateFallbackPdf() {
  const pdf = new jsPDF('p', 'mm', 'a4')

  pdf.setFontSize(16)
  pdf.text('Zaměřovací list - Výčepní technika', 20, 20)

  pdf.setFontSize(12)
  pdf.text('PDF snapshot se nepodařilo vygenerovat.', 20, 40)
  pdf.text('Prosím zkontrolujte JSON export pro kompletní data.', 20, 50)

  const pdfBase64 = pdf.output('datauristring').split(',')[1]
  const pdfBlob = pdf.output('blob')

  return { pdfBase64, pdfBlob }
}

/**
 * Vytvoří PDF filename na základě dat formuláře
 */
export function generatePdfFileName(formData) {
  const sapId = formData.header?.sapId || 'NEZNAMY'
  const nazev = (formData.header?.nazevProvozovny || 'PROVOZOVNA')
    .replace(/[^a-zA-Z0-9]/g, '_')
    .substring(0, 30)
  const timestamp = new Date().toISOString().split('T')[0]

  return `${sapId}_${nazev}_${timestamp}_souhrn.pdf`
}
