import 'dotenv/config'

const defaultConfig = {
  attachmentsDir: './attachments',
  concurrentDownloads: 5,
  downloadInterval: 100,
  pageSize: 100,
}

const configure = () => {
  return {
    attachmentsDir: process.env.PHOTOS_DIR ? process.env.PHOTOS_DIR : defaultConfig.attachmentsDir,
    concurrentDownloads: process.env.CONCURRENT_DOWNLOADS ? parseInt(process.env.CONCURRENT_DOWNLOADS) : defaultConfig.concurrentDownloads,
    downloadInterval: process.env.DOWNLOAD_INTERVAL ? parseInt(process.env.DOWNLOAD_INTERVAL) : defaultConfig.downloadInterval,
    pageSize: process.env.AIRTABLE_PAGE_SIZE ? parseInt(process.env.AIRTABLE_PAGE_SIZE) : defaultConfig.pageSize,
    apiKey: process.env.AIRTABLE_API_KEY,
    baseId: process.env.AIRTABLE_BASE_ID,
    tableName: process.env.AIRTABLE_TABLE_NAME,
    viewName: process.env.AIRTABLE_VIEW_NAME,
    attachmentFieldName: process.env.AIRTABLE_ATTACHMENT_FIELD_NAME,
    newFilenameFieldName: process.env.AIRTABLE_NEW_FILENAME_FIELD_NAME,
  }
}

export default configure