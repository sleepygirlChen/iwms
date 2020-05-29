import { dateFormat } from './dateFormat'

export function encodeInfo(info) {
  return encodeURI(JSON.stringify(info));
}

export function decodeInfo(info) {
  return JSON.parse(decodeURI(info));
}

export function dataSplit(data) {
  return JSON.parse(data).map(item => {
    let obj = {}
    let itemStr = item.replace(/(InFluxHardware)|([\"\{])|([\}\"])/g, '');
    itemStr.split(', ').map(v => {
      if (v.split('=')[0] == 'time') {
        obj[v.split('=')[0]] = dateFormat(v.split('=')[1])
      } else {
        obj[v.split('=')[0]] = (v.split('=')[1]).replace(/(\')|(\')]/g, '')
      }
    })
    return obj;
  })
}


export function keyId() {
  return (Math.random().toFixed(3) * 1000 + new Date().getTime()).toString()
}