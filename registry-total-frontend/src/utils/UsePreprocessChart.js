import { UseTranslator } from "./UseTranslator";
/*
 * @description: Preprocess data for chart
 */
const UsePreprocessChart = function (data, name, type) {
  if (!data) return null;
  if (type == "Năm") {
    let maxYear = parseInt(data[0].split("-")[0]);
    let minYear = parseInt(data[0].split("-")[0]);

    data.forEach((date) => {
      const year = parseInt(date.split("-")[0]);
      if (year > maxYear) {
        maxYear = year;
      }
      if (year < minYear) {
        minYear = year;
      }
    });

    const years = {};
    for (let i = minYear; i <= maxYear; i++) {
      years[i] = 0;
    }

    data.forEach((date) => {
      const year = date.split("-")[0];
      years[year] += 1;
    });
    return {
      options: { xaxis: { categories: Object.keys(years) } },
      series: [{ name: name, data: Object.values(years) }],
    };
  } else if (type == "Tháng") {
    const months = Array(12).fill(0);
    data.forEach((date) => {
      const month = parseInt(date.split("-")[1]);
      months[month - 1] += 1;
    });
    return {
      options: {
        xaxis: { categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
      },
      series: [{ name: name, data: months }],
    };
  } else {
    const quarters = Array(4).fill(0);
    data.forEach((date) => {
      const month = parseInt(date.split("-")[1]);
      const quarter = Math.floor(month / 4);
      quarters[quarter] += 1;
    });
    return {
      options: {
        xaxis: { categories: [1, 2, 3, 4] },
      },
      series: [{ name: name, data: quarters }],
    };
  }
};
export { UsePreprocessChart };
