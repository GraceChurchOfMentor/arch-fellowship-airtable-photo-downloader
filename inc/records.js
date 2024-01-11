import Airtable from 'airtable'
import c from 'ansi-colors'

const records = {
  gatherRecords: (config) => {
    Airtable.configure({
      apiKey: config.apiKey
    })

    return new Promise((resolve, reject) => {
      const output = []
      const base = new Airtable().base(config.baseId)

      base(config.tableName).select({
        view: config.viewName,
        pageSize: config.pageSize,
      }).eachPage(function page(records, fetchNextPage) {
        // console.log(c.magenta('Retrieving page...'))

        records.forEach(record => {
          const attachments = record.get(config.attachmentFieldName)

          if (attachments) {
            const attachment = record.get(config.attachmentFieldName)[0];
            const filename = record.get(config.newFilenameFieldName);

            console.debug('  Retrieved record ' + c.white(record.getId()))

            output.push({
              filename: attachment.filename,
              url: attachment.url
            })
          }
        })

        console.debug('')

        fetchNextPage()
      }, function done(err) {
        if (err) {
          console.error(err)
          reject(err)
        }

        resolve(output)
       })
    })
  }
}

export default records