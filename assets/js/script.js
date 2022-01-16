const CURRENT_YEAR = new Date().getFullYear();
const ALL_ITEMS_IN_CATEGORY = "ALL_ITEMS_IN_CATEGORY";
const COLORS = [
  "#E29EFF",
  "#5ee440",
  "#f25f10",
  "#f3c401",
  "#7088ed",
  "#e06394",
  "#5be0ad",
  "#be8058",
  "#709b32",
  "#52dbed",
  "#cb68cf",
  "#ec605a",
  "#c4cf8e",
  "#0398ce",
  "#a183b1",
  "#579c74",
  "#fcb1ef",
  "#b4d744",
  "#fe4878",
  "#eac56d",
  "#33a254",
  "#ef4db2",
  "#6e9592",
];
const YEAR_WIDTH = 3;
const PERSON_HEIGHT = 26;

const generateElement = (elementType, attributes) => {
  const classList = (attributes.classes || []).join(" ");
  const element = Object.assign(document.createElement(elementType), {
    ...attributes,
    classList,
  });
  Object.assign(element.style, attributes.style);
  Object.keys(attributes.eventListeners || {}).forEach((eventType) => {
    element.addEventListener(eventType, attributes.eventListeners[eventType]);
  });
  return element;
};

const yearLeftPixels = (distanceFromNow) => `${distanceFromNow * YEAR_WIDTH}px`;

const initialState = {
  settings: {
    filters: {
      areas: {},
      countries: {},
      prominence: 0,
      years: {
        min: parseInt(document.querySelector("#year-range #min").value),
        max: parseInt(document.querySelector("#year-range #max").value),
      },
    },
  },
  people: {
    all: [],
    filteredByYear: {},
    filteredCount: 0,
  },
  ruler: {
    max: null,
    min: null,
  },
  defaultFiltersLoaded: false,
};

const logBenchmarks = (name, callback) => {
  const now = new Date();
  callback();
  console.log(name, new Date() - now);
};

class Timeline {
  state = initialState;

  constructor(people) {
    this.state.people.all = people;
    this.registerSidebarCallbacks();
  }

  setState(newState) {
    this.state = newState;
    console.log(this.state);

    this.render();
  }

  filterPeople() {
    const {
      state: {
        settings: { filters },
        defaultFiltersLoaded,
      },
    } = this;

    // reset
    this.state.people.filteredByYear = {};
    this.state.people.filteredCount = 0;
    this.state.ruler = { max: null, min: null };

    this.state.people.all.forEach((person, i) => {
      const { type, country, rating, to, from: birth } = person;
      const death = to == 0 ? CURRENT_YEAR : to;

      // find default filters to save time on first loop
      if (!defaultFiltersLoaded) {
        filters.areas[type] = true;
        filters.countries[country] = true;
        this.state.defaultFiltersLoaded = true;
      }

      // if person fits filters
      if (
        filters.areas[type] &&
        filters.countries[country] &&
        rating * 100 >= filters.prominence &&
        filters.years.max >= death &&
        filters.years.min <= birth
      ) {
        this.state.people.filteredCount++;

        // organize filtered people by year
        for (let year = birth; year < death; year++) {
          this.state.people.filteredByYear[year] =
            this.state.people.filteredByYear[year] || [];
          this.state.people.filteredByYear[year].push(person);
        }

        // find ruler.max
        if (!this.state.ruler.max || death > this.state.ruler.max) {
          this.state.ruler.max = death;
        }

        // find ruler.min
        if (!this.state.ruler.min || birth < this.state.ruler.min) {
          this.state.ruler.min = birth;
        }
      }
    });
  }

  renderRuler() {
    const {
      ruler: { min, max },
      people: { filteredByYear },
    } = this.state;

    let rulerElement = document.getElementById("ruler");
    rulerElement.innerHTML = "";
    for (let year = max; year > min; year--) {
      const showTick = year % 20 == 0;
      const yearMark = generateElement("div", {
        classes: ["year", showTick && "tick"].filter((x) => x),
        innerHTML: showTick ? year : "",
        style: {
          left: yearLeftPixels(max - year),
        },
      });

      rulerElement.append(yearMark);
    }

    Object.assign(rulerElement.style, {
      width: (max - min) * YEAR_WIDTH,
    });
    // rulerElement.addEventListener('mousemove', ({ offsetX }) => {
    //   const year = Math.floor(CURRENT_YEAR - (offsetX / YEAR_WIDTH))
    //   console.log(year)
    // })
  }

  renderChart() {
    const {
      ruler: { min, max },
      people: { filteredByYear, all },
    } = this.state;

    let chartElement = document.getElementById("chart");
    chartElement.innerHTML = "";

    let rowTracker = [];
    const personTopPixels = (death, birth) => {
      for (let i = 0; i <= rowTracker.length; i++) {
        if (!rowTracker[i] || rowTracker[i] > death) {
          rowTracker[i] = birth;
          return `${25 + PERSON_HEIGHT * i}px`;
        }
      }
    };

    let chartedPeople = {};
    for (let year = max; year > min; year--) {
      const people = filteredByYear[year] || [];
      people.forEach(
        (
          {
            name,
            link,
            to,
            from: birth,
            backgroundColor = COLORS[Math.floor(Math.random() * COLORS.length)],
          },
          i
        ) => {
          if (chartedPeople[name]) {
            return false;
          }

          const death = to == 0 ? CURRENT_YEAR : to;
          people[i].backgroundColor ||= backgroundColor;
          chartElement.appendChild(
            generateElement("div", {
              classes: ["person"],
              innerHTML: `<span style='background-color: ${backgroundColor};'>${name}</span>`,
              style: {
                left: yearLeftPixels(max - death),
                top: personTopPixels(death, birth),
                width: `${(death - birth) * YEAR_WIDTH - 5}px`,
                backgroundColor,
              },
              eventListeners: { click: () => window.open(link, "_blank") },
            })
          );
          chartedPeople[name] = true;
        }
      );
    }
  }

  updateFilteredCountDisplay() {
    const {
      people: { filteredCount },
    } = this.state;

    document.getElementById(
      "filteredCount"
    ).innerHTML = `Displaying ${filteredCount.toLocaleString()} people`;
  }

  updateYearRange(key, value) {
    let { state: newState } = this;

    newState.settings.filters.years[key] = parseInt(value);

    this.setState(newState);
  }

  updateAllFilterItems(filter, value) {
    const {
      state: {
        settings: { filters },
      },
    } = this;
    const updatedItems = Object.keys(filters[filter]).reduce(
      (obj, itemName) => {
        obj[itemName] = value;
        return obj;
      },
      {}
    );
    this.setState({
      ...this.state,
      settings: { filters: { ...filters, [filter]: updatedItems } },
    });
  }

  updateProminence(prominence) {
    const {
      state: {
        settings: { filters },
      },
    } = this;
    document.querySelector(
      "#prominence #limit"
    ).innerHTML = `${prominence}% Threshold`;
    this.setState({
      ...this.state,
      settings: { filters: { ...filters, prominence } },
    });
  }

  registerSidebarCallbacks() {
    // years
    document.querySelectorAll("#year-range input").forEach((el) => {
      el.addEventListener("change", ({ currentTarget: { id, value } }) => {
        this.updateYearRange(id, value);
      });
    });

    // prominence
    document
      .getElementById("person-prominence")
      .addEventListener("change", ({ currentTarget: { value } }) =>
        this.updateProminence(value)
      );

    // areas
    document.querySelectorAll("#areas input[type=checkbox]").forEach((el) => {
      el.addEventListener("change", ({ currentTarget: { checked, value } }) => {
        const {
          state: {
            settings: { filters },
          },
        } = this;
        this.setState({
          ...this.state,
          settings: {
            filters: {
              ...filters,
              areas: { ...filters.areas, [value]: checked },
            },
          },
        });
      });
    });

    document
      .querySelector("#areas .select-all")
      .addEventListener("click", (_) => {
        document
          .querySelectorAll("#areas input[type=checkbox]")
          .forEach((el) => {
            el.checked = true;
            this.updateAllFilterItems("areas", true);
          });
      });

    document
      .querySelector("#areas .remove-all")
      .addEventListener("click", (_) => {
        document
          .querySelectorAll("#areas input[type=checkbox]")
          .forEach((el) => {
            el.checked = false;
            this.updateAllFilterItems("areas", false);
          });
      });

    // countries
    document
      .querySelectorAll("#countries input[type=checkbox]")
      .forEach((el) => {
        el.addEventListener(
          "change",
          ({ currentTarget: { checked, value } }) => {
            const {
              state: {
                settings: { filters },
              },
            } = this;
            this.setState({
              ...this.state,
              settings: {
                filters: {
                  ...filters,
                  countries: { ...filters.countries, [value]: checked },
                },
              },
            });
          }
        );
      });

    document
      .querySelector("#countries .select-all")
      .addEventListener("click", (_) => {
        document
          .querySelectorAll("#countries input[type=checkbox]")
          .forEach((el) => {
            el.checked = true;
            this.updateAllFilterItems("countries", true);
          });
      });

    document
      .querySelector("#countries .remove-all")
      .addEventListener("click", (_) => {
        document
          .querySelectorAll("#countries input[type=checkbox]")
          .forEach((el) => {
            el.checked = false;
            this.updateAllFilterItems("countries", false);
          });
      });

    document
      .getElementById("show-about")
      .addEventListener(
        "click",
        () => (document.getElementById("about").style.display = "block")
      );
    document
      .getElementById("about")
      .addEventListener(
        "click",
        () => (document.getElementById("about").style.display = "none")
      );
  }

  render() {
    console.log("render");
    logBenchmarks("filterPeople", () => this.filterPeople());
    logBenchmarks("renderRuler", () => this.renderRuler());
    logBenchmarks("renderChart", () => this.renderChart());
    logBenchmarks("updateFilteredCountDisplay", () =>
      this.updateFilteredCountDisplay()
    );
    window.state = this.state;
  }
}
