export const date_diff_indays = (date_user, date_event) => {
  return Math.floor(
    (Date.UTC(
      date_event.getFullYear(),
      date_event.getMonth(),
      date_event.getDate()
    ) -
      Date.UTC(
        date_user.getFullYear(),
        date_user.getMonth(),
        date_user.getDate()
      )) /
      (1000 * 60 * 60 * 24)
  );
};

//Caulculate Physical Biorythm
export const bio_fisico = (date_user, date_event) => {
  let dias_transcurridos = date_diff_indays(date_user, date_event);
  return Math.round(
    Math.sin((2 * Math.PI * dias_transcurridos) / 23) * 100
  ).toFixed(2);
};

//Caulculate Emotional Biorythm
export const bio_emocional = (date_user, date_event) => {
  let dias_transcurridos = date_diff_indays(date_user, date_event);
  return Math.round(
    Math.sin((2 * Math.PI * dias_transcurridos) / 28) * 100
  ).toFixed(2);
};

//Caulculate Intellectual Biorythm
export const bio_intelectual = (date_user, date_event) => {
  let dias_transcurridos = date_diff_indays(date_user, date_event);
  return Math.round(
    Math.sin((2 * Math.PI * dias_transcurridos) / 33) * 100
  ).toFixed(2);
};

// Make array for dates in one week
export const setDateRange = () => {
  let newdate;
  let graphDates = [];

  for (let i = -1; i < 7; i++) {
    let dateObj = new Date();
    dateObj.setDate(dateObj.getDate() + i);
    newdate =
      dateObj.getDate() +
      "/" +
      (dateObj.getMonth() + 1) +
      "/" +
      dateObj.getFullYear();
    graphDates.push(newdate);
  }
  return graphDates;
};

// Make array to pass to chart
export const makeBioList = biorythm => {
  let list = [];

  for (let i = -1; i < 7; i++) {
    let dateObj = new Date();
    dateObj.setDate(dateObj.getDate() + i);
    list.push(biorythm(dateObj));
  }
  return list;
};
