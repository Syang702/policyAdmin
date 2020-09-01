import defaultSettings from '@/settings'

const title = defaultSettings.title || '健康商城'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
