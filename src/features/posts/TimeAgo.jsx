import { parseISO, formatDistanceToNow } from "date-fns";

const TimeAgo = ({ timestamp }) => {
  let timeAgo = "";
  if (timestamp) {
    const data = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(data);
    timeAgo = `${timePeriod} Ago`;
  }
  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};

export default TimeAgo;
