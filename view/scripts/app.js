import View  from './view.js';
import Controller from './controller.js';
import Data from './data.remote.js';
import Charts from "./charts.js";
import Popup from "./popup.js";

const charts = new Charts();
const popup = new Popup();
const view = new View(".action-bar",".table-wrapper", charts, popup);
const data = new Data("http://localhost:3000");
const controller = new Controller(view, data);

window.addEventListener('load', () => {
    controller.loadAndRender();
});
