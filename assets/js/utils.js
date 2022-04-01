const CURRENT_YEAR = new Date().getFullYear();
const COLORS = [
  "#e29eff",
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

const logBenchmarks = (name, callback) => {
  const now = new Date();
  callback();
  console.log("BENCHMARK", name, new Date() - now);
};
