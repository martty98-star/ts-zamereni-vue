/**
 * URL Autofill utility
 * Načte data z URL parametrů a vyplní formulář
 */

export function getUrlParams() {
  const params = new URLSearchParams(window.location.search)
  const data = {}

  // Header fields
  const headerFields = [
    'sapId',
    'nazevProvozovny',
    'adresaProvozovny',
    'cisloTracku',
    'pozadovanyDatum',
    'kontakt',
    'vyplnilJmeno',
    'vyplnilDatum'
  ]

  headerFields.forEach(field => {
    const value = params.get(field)
    if (value) {
      data[field] = decodeURIComponent(value)
    }
  })

  return data
}

export function autofillFromUrl(state) {
  const urlData = getUrlParams()

  if (Object.keys(urlData).length === 0) {
    return false // Žádná data z URL
  }

  // Vyplň header data
  Object.keys(urlData).forEach(key => {
    if (state.header && state.header.hasOwnProperty(key)) {
      state.header[key] = urlData[key]
    }
  })

  return true // Data byla načtena
}
