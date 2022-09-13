const CURRENT_YEAR = new Date().getFullYear();
const YEAR_WIDTH = 4;

const filterBy = (
  figures,
  { name = null, min = -2700, max = CURRENT_YEAR, highlight = null }
) => {
  const filtered = [];

  if (!name && !min && !max && !highlight) {
    // save time with early return
    return figures;
  }

  //   if (highlight) {
  //     const highlightedFigure = figures.find(
  //       (figure) => figure.name === highlight
  //     );
  //     max = highlightedFigure.death;
  //     min = highlightedFigure.birth;
  //   }
  //   console.log(highlight, max, min);

  figures.forEach((figure) => {
    const nameMatch =
      !name || figure.name.toLowerCase().includes(name.toLowerCase());
    const minYearMatch = !min || figure.birth >= min;
    const maxYearMatch = !max || (figure.death || CURRENT_YEAR) <= max;

    if (nameMatch && (minYearMatch || maxYearMatch)) {
      filtered.push(figure);
    }
  });

  return filtered;
};

class RowTracker {
  rows = [];
  //   constructor() {
  //     this.rows = [];
  //   }

  assignToRow = ({
    birth,
    death,
  }: {
    birth: number;
    death?: number;
  }): number => {
    const { rows } = this;

    death ||= CURRENT_YEAR;
    const birthOffsetFromCurrentYear = CURRENT_YEAR - birth;
    const deathOffsetFromCurrentYear = CURRENT_YEAR - death;

    let rowIndex = rows.findIndex((row) => {
      return (
        row[row.length - 1] && row[row.length - 1] < deathOffsetFromCurrentYear
      );
    });

    if (rowIndex < 0) {
      rowIndex = rows.length;
    }

    rows[rowIndex] ||= [];
    rows[rowIndex].push(birthOffsetFromCurrentYear);

    return rowIndex;
  };
}

export { filterBy, CURRENT_YEAR, YEAR_WIDTH, RowTracker };
