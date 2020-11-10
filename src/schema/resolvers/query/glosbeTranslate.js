import Axios from 'axios'
import cheerio from 'cheerio'

const globeTranslate = async (_, { word, from, dest }) => {
  const response = await Axios.get(
    `https://glosbe.com/${from}/${dest}/${encodeURIComponent(word.trim())}`,
  )

  const $ = cheerio.load(response.data)

  const list = $('.phraseMeaning')
    .map((index, meaningBlock) => {
      const translation = $(meaningBlock).find($('.phr')).text()
      const originalExample = $(meaningBlock)
        .find(".examples > .row-fluid > .span6[dir='ltr']")
        .text()
      const translateExample = $(meaningBlock)
        .find(".examples > .row-fluid > .span6 > div[dir='ltr']")
        .text()

      return {
        word: translation,
        examples:
          originalExample && translateExample
            ? [originalExample, translateExample]
            : null,
      }
    })
    .toArray()

  return list
}

export default globeTranslate
