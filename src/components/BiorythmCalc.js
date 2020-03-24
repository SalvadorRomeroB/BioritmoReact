export const date_diff_indays = dt2 => {
  let dt1 = new Date("08/04/1997"); // 'month/day/year'
  return Math.floor(
    (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
      Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
      (1000 * 60 * 60 * 24)
  );
};

//Caulculate Physical Biorythm
export const bio_fisico = dt2 => {
  let dias_transcurridos = date_diff_indays(dt2);
  return Math.round(
    Math.sin((2 * Math.PI * dias_transcurridos) / 23) * 100
  ).toFixed(2);
};

//Caulculate Emotional Biorythm
export const bio_emocional = dt2 => {
  let dias_transcurridos = date_diff_indays(dt2);
  return Math.round(
    Math.sin((2 * Math.PI * dias_transcurridos) / 28) * 100
  ).toFixed(2);
};

//Caulculate Intellectual Biorythm
export const bio_intelectual = dt2 => {
  let dias_transcurridos = date_diff_indays(dt2);
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
