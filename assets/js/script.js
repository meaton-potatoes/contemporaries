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
      featured: (() => {
        const url = new URL(window.location);
        return url.searchParams.get("person");
      })(),
    },
  },
  people: {
    all: people,
    filteredByYear: {},
    filteredCount: 0,
  },
  ruler: {
    max: null,
    min: null,
  },
};

class Timeline {
  YEAR_WIDTH = 3;
  state = initialState;

  constructor() {
    this.render();
    this.registerSidebarCallbacks();
  }

  setState(newState) {
    this.state = newState;

    setTimeout(() => this.render(), 0);
  }

  filterPeople() {
    const {
      state: {
        settings: { filters },
      },
    } = this;

    // reset
    this.state.people.filteredByYear = {};
    this.state.people.filteredCount = 0;

    const featuredPerson = this.findPersonByName(filters.featured);
    this.state.ruler = {
      min: featuredPerson?.from,
      max: featuredPerson?.to,
    };

    this.state.people.all.forEach((person) => {
      const { type, country, rating, to, from: birth } = person;
      const death = to == 0 ? CURRENT_YEAR : to;

      // if person fits filters
      if (
        [true, undefined].includes(filters.areas[type]) &&
        [true, undefined].includes(filters.countries[country]) &&
        rating * 100 >= filters.prominence &&
        (!filters.years.max || filters.years.max >= death) &&
        (!filters.years.min || filters.years.min <= birth)
      ) {
        this.state.people.filteredCount++;

        // organize filtered people by year
        for (let year = birth; year < death; year++) {
          this.state.people.filteredByYear[year] =
            this.state.people.filteredByYear[year] || [];
          this.state.people.filteredByYear[year].push(person);
        }

        if (!filters.featured) {
          // find ruler.max
          if (!this.state.ruler.max || death > this.state.ruler.max) {
            this.state.ruler.max = death;
          }

          // find ruler.min
          if (!this.state.ruler.min || birth < this.state.ruler.min) {
            this.state.ruler.min = birth;
          }
        }
      }
    });
  }

  renderRuler() {
    const {
      ruler: { min, max },
    } = this.state;

    let rulerElement = document.getElementById("ruler");
    rulerElement.innerHTML = "";
    for (let year = max; year > min; year--) {
      const showTick = year % 20 == 0;
      const yearMark = generateElement("div", {
        classes: ["year", showTick && "tick"].filter((x) => x),
        innerHTML: showTick ? year : "",
        style: {
          left: this.yearLeftPixels(max - year),
        },
      });

      rulerElement.append(yearMark);
    }

    Object.assign(rulerElement.style, {
      width: (max - min) * this.YEAR_WIDTH,
    });
  }

  renderChart() {
    const {
      ruler: { min, max },
      people: { filteredByYear },
      settings: {
        filters: { featured },
      },
    } = this.state;

    let chartElement = document.getElementById("chart");
    chartElement.innerHTML = "";

    let rowTracker = [];

    const personTopPixels = (death, birth) => {
      for (let i = 0; i <= rowTracker.length; i++) {
        if (!rowTracker[i] || rowTracker[i] > death) {
          rowTracker[i] = birth;
          // 26 == person tile height
          return `${25 + 26 * i}px`;
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

          const isFeatured = featured == link;
          const death = to == 0 ? CURRENT_YEAR : to;
          people[i].backgroundColor ||= backgroundColor;
          chartedPeople[name] = true;

          const wikiButton = generateElement("a", {
            innerHTML: '<div class="person-icon wiki"/>',
            href: link,
            target: "_blank",
            classes: ["cursor-pointer"],
          });
          const personSpan = generateElement("span", {
            innerHTML: name,
            style: {
              backgroundColor: backgroundColor,
            },
            eventListeners: {
              onmouseenter: (el) => (el.style.display = "inline-block"),
              onmouseleave: (el) => (el.style.display = "none"),
            },
          });
          const person = generateElement("div", {
            classes: ["person", isFeatured && "featured"],
            eventListeners: {
              click: () => {
                window.location.href = `?person=${name}`;
              },
            },
            style: {
              left: this.yearLeftPixels(max - death),
              top: personTopPixels(death, birth),
              width: `${(death - birth) * this.YEAR_WIDTH - 5}px`,
              backgroundColor: isFeatured ? "" : backgroundColor,
            },
          });
          personSpan.appendChild(wikiButton);
          person.appendChild(personSpan);
          chartElement.appendChild(person);
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

    ["areas", "countries"].forEach((thing) => {
      const {
        state: {
          settings: { filters },
        },
      } = this;

      document
        .getElementById(thing)
        .addEventListener("change", ({ target: { options } }) => {
          let { [thing]: thingFilter } = filters;
          Array.prototype.forEach.call(options, ({ selected, value }) => {
            thingFilter = { ...thingFilter, [value]: selected };
          });
          this.setState({
            ...this.state,
            settings: { filters: { ...filters, [thing]: thingFilter } },
          });
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

  findPersonByName = (personName) =>
    this.state.people.all.find(({ name }) => name === personName);

  yearLeftPixels = (distanceFromNow) =>
    `${distanceFromNow * this.YEAR_WIDTH}px`;

  render() {
    logBenchmarks("filterPeople", () => this.filterPeople());
    logBenchmarks("renderRuler", () => this.renderRuler());
    logBenchmarks("renderChart", () => this.renderChart());
    logBenchmarks("updateFilteredCountDisplay", () =>
      this.updateFilteredCountDisplay()
    );
    document.querySelector("#year-range #max").value = this.state.ruler.max;
    document.querySelector("#year-range #min").value = this.state.ruler.min;
    window.state = this.state;
  }
}
