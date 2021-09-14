const CURRENT_YEAR = (new Date).getFullYear()
const ALL_ITEMS_IN_CATEGORY = 'ALL_ITEMS_IN_CATEGORY'
const COLORS = ["#E29EFF", "#5ee440", "#f25f10", "#f3c401", "#7088ed", "#e06394", "#5be0ad", "#be8058", "#709b32", "#52dbed", "#cb68cf", "#ec605a", "#c4cf8e", "#0398ce", "#a183b1", "#579c74", "#fcb1ef", "#b4d744", "#fe4878", "#eac56d", "#33a254", "#ef4db2", "#6e9592"]
const YEAR_WIDTH = 3
const PERSON_HEIGHT = 26

const yearLeftPixels = distanceFromNow => `${distanceFromNow * YEAR_WIDTH}px`

const initialState = {
  settings: {
    filters: {
      areas: {},
      countries: {},
      prominence: 0,
      years: {
        min: null,
        max: null
      }
    }
  },
  people: {
    all: [],
    filteredByYear: {},
    filteredCount: 0
  },
  ruler: {
    max: null,
    min: null
  },
  defaultFiltersLoaded: false,
  viewport: {}
}

const logBenchmarks = (name, callback) => {
  const now = new Date()
  callback()
  console.log(name, new Date() - now)
}

class Timeline {
  state = initialState

  constructor(people) {
    this.state.people.all = people
    this.registerSidebarCallbacks()
  }

  filterPeople() {
    const { settings: { filters }, defaultFiltersLoaded } = this.state

    // reset years before finding ruler max and min
    this.state.ruler = { max: null, min: null }

    // reset 
    this.state.people.filteredByYear = {}
    this.state.people.filteredCount = 0

    this.state.people.all.forEach((person, i) => {
      const { type, country, rating,to, from: birth } = person
      const death = (to == 0 ? CURRENT_YEAR : to)
      // find default filters to save time on first loop
      if (!defaultFiltersLoaded) {
        filters.areas[type] = true
        filters.countries[country] = true
        this.state.defaultFiltersLoaded = true
      }

      // if person fits filters
      if (
          filters.areas[type] &&
          filters.countries[country] &&
          (rating * 100 >= filters.prominence)
        ) {
        this.state.people.filteredCount++

        // organize filtered people by year
        for (let year = birth; year < death; year++) {
          this.state.people.filteredByYear[year] = this.state.people.filteredByYear[year] || []
          this.state.people.filteredByYear[year].push(person)
        }

        // find ruler.max
        if (death == 0) {
          this.state.ruler.max = CURRENT_YEAR
        } else if (!this.state.ruler.max || death > this.state.ruler.max) {
          this.state.ruler.max = death
        }

        // find ruler.min
        if (!this.state.ruler.min || birth < this.state.ruler.min) {
          this.state.ruler.min = birth
        }
      }
    })
  }

  renderRuler() {
    const { ruler: { min, max }, people: { filteredByYear } } = this.state

    let rulerElement = $('#ruler')
    rulerElement.empty()
    for (let year = max; year > min; year--) {
      const showTick = year % 20 == 0
      const yearMark = $(`<div class='year ${showTick ? 'tick' : ''}'></div>`)
                        .html(showTick ? year : ' ')
                        .css({
                          left: yearLeftPixels((max - year)),
                          width: `${YEAR_WIDTH}px`
                        })
      rulerElement.append(yearMark)
    }
    rulerElement
      .css({ width: `${(max - min) * YEAR_WIDTH}px` })
      .mousemove(({ offsetX }) => {
        const year = Math.floor(CURRENT_YEAR - (offsetX / YEAR_WIDTH))
        console.log(year, filteredByYear[String(year)])
      })
  }

  renderChart() {
    const { ruler: { min, max }, people: { filteredByYear, all } } = this.state

    let chartElement = $('#chart')
    chartElement.empty()

    let rowTracker = []
    const personTopPixels = (death, birth) => {
      for (let i = 0; i <= rowTracker.length; i++) {
        if (!rowTracker[i] || rowTracker[i] > death) {
          rowTracker[i] = birth
          return `${25 + (PERSON_HEIGHT * i)}px`
        }
      } 
    }

    let chartedPeople = {}
    for (let year = max; year > min; year--) {
      const people = filteredByYear[year] || []
      people.forEach(({ name, link, to, from: birth }, i) => {
        if (chartedPeople[name]) {
          return false
        }

        const death = (to == 0 ? CURRENT_YEAR : to)
        const color = COLORS[Math.floor(Math.random() * COLORS.length)]
        const personElement = $(`<div class='person'></div>`)
                                .html($(`<span>${name}</span>`).css({ 'background-color': color }))
                                .css({
                                  'left': yearLeftPixels(max - death),
                                  'top': personTopPixels(death, birth),
                                  'width': `${((death - birth) * YEAR_WIDTH) - 5}px`,
                                  'background-color': color
                                })
                                .click(() => window.open(link, '_blank'))
        chartElement.append(personElement)
        chartedPeople[name] = true
      })
    }
  }

  renderFilteredValues() {
    const { people: { filteredCount }, ruler, settings: { filters } } = this.state
    $('#filteredCount').html(`Displaying ${filteredCount.toLocaleString()} people`)
    $('#max').val(filters.years.max || ruler.max)
    $('#min').val(filters.years.min || ruler.min)
  }

  updateYearRange(key, value) {
    this.state.settings.filters.years[key] = value

    this.render()
  }

  updateAreas(key, value) {
    if (key == ALL_ITEMS_IN_CATEGORY) {
      Object.keys(this.state.settings.filters.areas).forEach(key => this.state.settings.filters.areas[key] = value)
    } else {
      this.state.settings.filters.areas[key] = value
    }

    this.render()
  }

  updateCountries(key, value) {
    if (key == ALL_ITEMS_IN_CATEGORY) {
      Object.keys(this.state.settings.filters.countries).forEach(key => this.state.settings.filters.countries[key] = value)
    } else {
      this.state.settings.filters.countries[key] = value
    }

    this.render()
  }

  updateProminence(value) {
    this.state.settings.filters.prominence = value

    $('#prominence #limit').html(`${value}%`)

    this.render()
  }

  registerSidebarCallbacks() {
    // years
    $('#year-range input').change(({ currentTarget: { id, value }}) => {
      this.updateYearRange(id, value)
    })

    // prominence
    $('#person-prominence').change(({ currentTarget: { value } }) => {
      this.updateProminence(value)
    })

    // areas
    $('#areas input:checkbox').change(({ currentTarget: { checked, value } }) => {
      this.updateAreas(value, checked)
    })

    $('#areas .select-all').click(_ => {
      $('#areas input:checkbox').prop('checked', true)
      this.updateAreas(ALL_ITEMS_IN_CATEGORY, true)
    })

    $('#areas .remove-all').click(_ => {
      $('#areas input:checkbox').prop('checked', false)
      this.updateAreas(ALL_ITEMS_IN_CATEGORY, false)
    })

    // countries
    $('#countries input:checkbox').change(({ currentTarget: { checked, value } }) => {
      this.updateCountries(value, checked)
    })

    $('#countries .select-all').click(_ => {
      $('#countries input:checkbox').prop('checked', true)
      this.updateCountries(ALL_ITEMS_IN_CATEGORY, true)
    })

    $('#countries .remove-all').click(_ => {
      $('#countries input:checkbox').prop('checked', false)
      this.updateCountries(ALL_ITEMS_IN_CATEGORY, false)
    })

    $('#show-about').click(_ => {
      $('#about').show()
    })

    $('#about').click(_ => {
      $('#about').hide()
    })
  }

  render() {
    console.log('render')
    logBenchmarks('filterPeople', () => this.filterPeople())
    logBenchmarks('renderRuler', () => this.renderRuler())
    logBenchmarks('renderChart', () => this.renderChart())
    logBenchmarks('renderFilteredValues', () => this.renderFilteredValues())
  }
}
