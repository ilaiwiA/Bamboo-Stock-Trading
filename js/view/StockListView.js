import { Chart } from "chart.js/auto";
import annotationPlugin from "chartjs-plugin-annotation";
import { USER_STOCK, WATCH_LIST } from "../config.js";
import View from "./View.js";

Chart.register(annotationPlugin);

class StockListView extends View {
  _parentElement = document.querySelector(".aside-container");
  _data;

  constructor() {
    super();
  }

  addHandlerRender(handler) {
    ["load"].forEach((a) =>
      window.addEventListener(a, function () {
        handler();
      })
    );
  }

  // render(data, panelType) {
  //   if (!data) return;

  //   this._data = data;

  //   const html = this._generateHTML(panelType);

  //   this._parentElement.insertAdjacentHTML("beforeend", html);
  // }

  _generateHTML = function (panelType) {
    return `
        <div class="side-container">
          <h1>${panelType === WATCH_LIST ? "Watchlist" : "My Stocks"}</h1>
          <div class="stocks-panel panel">
          ${this._data.map(this._generateStocks.bind(this)).join("")}
          </div>
        </div>
        `;
  };

  _generateStocks = function (data) {
    return `
    <a class="stocks" id = "${data.symbol}" href="#stocks/${data.symbol}">
        <div class="ticker">
            <p>${data.symbol}</p>
            ${
              data.quantity
                ? `<p class= "ticker-sub">${data.quantity} ${
                    data.quantity > 1 ? "Shares" : "Share"
                  }`
                : ""
            }
        </div>
    
        <canvas class="ticker-graph">GRAPH</canvas>
    
        <div class="ticker-price ticker">
        <p>${data.lastPrice}<p>
        <p class= "ticker-sub ${this._generateColor(
          data.netPercentChangeInDouble
        )}">${Number(data.netPercentChangeInDouble).toFixed(2)}%<p>
        </div>    
    </a>
    `;
  };

  // _generateChart() {
  //   const mainChart = document.querySelector(".ticker-graph");
  // }
}

export default new StockListView();
