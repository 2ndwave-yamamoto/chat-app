import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

export function now() {
  return format(new Date(), 'yyyy年MM月dd日 HH:mm:ss', { locale: ja })
}

export function formatDate(date: Date) {
  return format(date, 'yyyy年MM月dd日 HH:mm:ss', { locale: ja })
}
