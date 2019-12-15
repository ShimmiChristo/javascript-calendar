const calendarFn = (function() {
  const calcBody = document.querySelector('#calendar .body');
  const date = new Date();
  const day = date.getDate();
  const dayOfWeek = date.getDay();
  let year = date.getFullYear();
  let month = date.getMonth();

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
  ];
  function buildTitle(month, year) {
    const title = document.getElementById('title');
    title.innerHTML = ``;
    title.textContent = `${months[month]} ${year}`;
  }

  function buildRows(firstDay, daysInMonth, day, week) {
    const createRow = document.createElement('div');
    createRow.classList.add('row');

    for (var i = 0; i < 7; i++) {
      const createCell = document.createElement('div');
      if (i % 7 === 0 || i % 6 === 0) {
        createCell.classList.add('weekend', 'cell');
      } else {
        createCell.classList.add('cell');
      }
      if (week === 1 && i < firstDay) {
        createCell.textContent = '';
        createRow.appendChild(createCell);
      } else if (day > daysInMonth) {
        break;
      } else {
        createCell.textContent = day;
        createRow.appendChild(createCell);
        day++;
      }
    }
    week++;
    calcBody.appendChild(createRow);
    if (day < daysInMonth) buildRows(firstDay, daysInMonth, day, week); // build another row
  }
  function buildMonth() {
    let firstDay = new Date(year, month).getDay();
    let daysInMonth = new Date(year, month + 1, 0).getDate();
    calcBody.innerHTML = ``;
    let day = 1;
    let week = 1;
    buildRows(firstDay, daysInMonth, day, week);
  }
  function nextMonth() {
    if (month === 11) {
      month = 0;
      year++;
    } else {
      month++;
    }
    buildCalendar();
  }
  function previousMonth() {
    if (month === 0) {
      month = 11;
      year--;
    } else {
      month--;
    }
    buildCalendar();
  }

  function buildCalendar() {
    buildTitle(month, year);
    buildMonth(month, year);
  }

  return {
    buildCalendar: buildCalendar,
    nextMonth: nextMonth,
    previousMonth: previousMonth
  };
})();
calendarFn.buildCalendar();

back.addEventListener('click', calendarFn.previousMonth);
next.addEventListener('click', calendarFn.nextMonth);
