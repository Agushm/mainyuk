import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";

function formatStrToDateTime(
  dateStr: string,
  formatStr: string,
  isFromBE?: boolean | null
) {
  let date = parseISO(dateStr);
  let newDate;
  if (isFromBE == null || isFromBE) {
    newDate = date.setHours(
      date.getHours() - 7,
      date.getMinutes(),
      date.getSeconds()
    );
  } else {
    newDate = date.setHours(
      date.getHours() + 7,
      date.getMinutes(),
      date.getSeconds()
    );
  }

  return format(newDate, formatStr, { locale: id });
}

export { formatStrToDateTime };
