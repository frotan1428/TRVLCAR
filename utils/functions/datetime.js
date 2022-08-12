import moment from "moment";

const formatDateTime = (date, time) => {
  console.log(date, time);
  const dateStr = moment(date, "YYYY-MM-DD").format("YYYY-MM-DD"); // Bunun amacı gelen tarihteki saat kısmını silmek

  return moment(`${dateStr} ${time}`, "YYYY-MM-DD HH:mm").format(
    "MM/DD/YYYY HH:mm"
  );
};

const checkDates = (dates) => {
  const { pickUpDate, pickUpTime, dropOffDate, dropOffTime } = dates;

  const date1 = formatDateTime(pickUpDate, pickUpTime);
  const date2 = formatDateTime(dropOffDate, dropOffTime);

  return date2 > date1;
};

export { formatDateTime, checkDates };
