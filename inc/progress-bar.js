import cliProgress from 'cli-progress'
import c from 'ansi-colors'

const progressBar = {
  multibar: new cliProgress.MultiBar({
    clearOnComplete: false,
    hideCursor: true,
    forceRedraw: true,
    barsize: 10,
    format: barFormatter,
  }, cliProgress.Presets.shades_grey)
}

function barFormatter(options, params, payload) {
  const percentString = Math.round(params.progress * 100) + ''
  const completeLength = Math.round(params.progress * options.barsize)
  const incompleteLength = options.barsize - completeLength
  const completeString = options.barCompleteString.substr(0, completeLength)
  const incompleteString = options.barIncompleteString.substr(0, incompleteLength)

  const bar = '  ' + c.green(completeString) + c.green(incompleteString)
  const label = c.cyan(payload.label)
  const separator = '  '
  const percent = (() => {
    if (params.value >= params.total) {
      return c.green(percentString.padStart(4, ' ') + '%')
    } else {
      return c.yellow(percentString.padStart(4, ' ') + '%')
    }
  })()

  return bar + percent + separator + label
}

export default progressBar