import c from 'ansi-colors'
import pLimit from 'p-limit'

import configure from './inc/configure.js'
import records from './inc/records.js'
import progressBar from './inc/progress-bar.js'
import downloader from './inc/downloader.js'
import convertImage from './inc/convert-image.js'

(async () => {
  const config = configure()
  const multibar = progressBar.multibar
  const promises = []
  const limit = pLimit(config.concurrentDownloads)

  console.debug(
    c.magenta('Config:'),
    "\n  " + c.cyan('Attachments Directory: ') + c.white(config.attachmentsDir),
    "\n  " + c.cyan('Airtable Base ID: ') + c.white(config.baseId),
    "\n  " + c.cyan('Airtable Table Name: ') + c.white(config.tableName),
    "\n  " + c.cyan('Airtable View Name: ') + c.white(config.viewName),
    "\n  " + c.cyan('Airtable Page Size: ') + c.white(config.pageSize),
    "\n  " + c.cyan('Airtable Attachment Field Name: ') + c.white(config.attachmentFieldName),
    "\n",
  )

  records.gatherRecords(config)
    .then(attachments => {
      console.log(c.magenta('Downloading...'))

      // download attachments
      attachments.forEach((attachment, index, array) => {
        setTimeout(() => {
          const pb = multibar.create(100, 0, { label: attachment.filename });

          promises.push(
            limit(() =>
              downloader.downloadAttachment(attachment.url, attachment.filename, config.attachmentsDir, pb)
                .then(() => {
                  return new Promise(resolve => {
                    pb.update(0, { label: `${attachment.filename} downloaded, converting...` })

                    convertImage.convert(`${config.attachmentsDir}/${attachment.filename}`, attachment.newFilename)
                      .then(result => {
                        pb.update(100, { label: `${attachment.filename} downloaded, converted to ${attachment.newFilename}` })
                        pb.stop()
                        resolve()
                      })
                  })
                })
            )
          )

          if (index === array.length - 1) {
            Promise.all(promises)
              .then(() => {
                multibar.stop()
                console.log("\n", c.magenta('All done!'))
              })
          }

        }, config.downloadInterval * index)
      })
    })
})()