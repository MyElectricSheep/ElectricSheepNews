import {
  differenceInMinutes,
  differenceInHours,
  differenceInCalendarDays,
  parseISO,
} from "date-fns";

const formatTime = (created_at) => {
  if (!created_at) return "Some time ago";

  let parsedDate;

  try {
    parsedDate = parseISO(created_at, 1);
  } catch (e) {
    console.log(e.message);
    return "Some time ago";
  }

  // https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments
  // https://date-fns.org/v2.21.3/docs/differenceInMinutes
  const timeDifferenceInMinutes = differenceInMinutes(Date.now(), parsedDate);
  const timeDifferenceInHours = differenceInHours(Date.now(), parsedDate);
  const timeDifferenceInDays = differenceInCalendarDays(Date.now(), parsedDate);

  const pluralMinutes = timeDifferenceInMinutes > 1 ? "s" : "";
  const pluralHours = timeDifferenceInHours > 1 ? "s" : "";
  const pluralDays = timeDifferenceInDays > 1 ? "s" : "";

  if (timeDifferenceInDays >= 1)
    return `${timeDifferenceInDays} day${pluralDays} ago`;
  if (timeDifferenceInHours >= 1)
    return `${timeDifferenceInHours} hour${pluralHours} and ${
      timeDifferenceInMinutes - 60 * timeDifferenceInHours
    } minute${pluralMinutes} ago`;
  if (timeDifferenceInMinutes < 60)
    return `${timeDifferenceInMinutes} minute${pluralMinutes} ago`;

  return "Some time ago";
};

export default formatTime;
