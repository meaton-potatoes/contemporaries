// const filterPeople = (people, { prominence, areas, countries, years }) => {
//   // reset 
//   let filteredByYear = {}
//   let filteredCount = 0
//   let yearLimits = {}

//   this.state.people.all.forEach((person, i) => {
//     const { type, country, rating, to, from: birth } = person
//     const death = (to == 0 ? CURRENT_YEAR : to)

//     // // find default filters to save time on first loop
//     // if (!defaultFiltersLoaded) {
//     //   areas[type] = true
//     //   countries[country] = true
//     //   this.state.defaultFiltersLoaded = true
//     // }

//     // if person fits filters
//     if (
//         areas[type] &&
//         countries[country] &&
//         (rating * 100 >= prominence) &&
//         (years.max >= death && years.min <= birth)
//       ) {
//       // debugger
//       filteredCount++

//       // organize filtered people by year
//       for (let year = birth; year < death; year++) {
//         filteredByYear[year] = filteredByYear[year] || []
//         filteredByYear[year].push(person)
//       }

//       // find ruler.max
//       if (!yearLimits.max || death > yearLimits.max) {
//         yearLimits.max = death
//       }

//       // find ruler.min
//       if (!yearLimits.min || birth < yearLimits.min) {
//         yearLimits.min = birth
//       }
//     }
//   })

//   return { filteredPeople, filteredCount, yearLimits }
// }
