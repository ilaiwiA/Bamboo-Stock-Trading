// import * as model from "../model/model.js";

import * as model from "../model/model.js";
import { WATCH_LIST, USER_STOCK } from "../config.js";

import StockListView from "../view/StockListView.js";
import PurchaseView from "../view/PurchaseView.js";
import NewsView from "../view/NewsView.js";
import StockDetailsView from "../view/StockDetailsView.js";
import PortfolioChartView from "../view/PortfolioChartView.js";

// (async function () {
//   await model.loadStockList(USER_STOCK);
//   await model.loadStockList(WATCH_LIST);

//   StockListView.render(model.state[USER_STOCK], USER_STOCK);
//   StockListView.render(model.state[WATCH_LIST], WATCH_LIST);
//   console.log("done");
// })();

const controllerStockList = async function (panelType) {
  try {
    console.log(window.location.href);

    await model.loadStockList(panelType);
    await model.loadNews();

    StockListView.render(model.state[panelType], panelType);
    StockDetailsView.render(model.state[panelType][0]);
    NewsView.render(model.state.news);
    // PurchaseView.render(model.state[USER_STOCK][1]);
  } catch (error) {
    console.error(error);
  }
};

// const controllerPurchasePanel = async function (panelType) {
//   try {
//     await model.loadStockList(USER_STOCK);
//     PurchaseView.render(model.state[USER_STOCK][4]);
//   } catch (error) {
//     console.error(error);
//   }
// };

// controllerPurchasePanel();

const controllerSidePanels = async function () {
  await model.loadStockList(USER_STOCK);
  await model.loadNews();

  StockListView.render(model.state[USER_STOCK], USER_STOCK);
  NewsView.render(model.state.news);
};

const controllerChangePage = async function () {
  const val = window.location.hash.indexOf("/") + 1;
  const ticker = window.location.hash.slice(val);

  await model.loadStock(ticker);
  PortfolioChartView.render(model.state.stock);
};

const init = function () {
  StockListView.addHandlerChangePage(controllerChangePage);
  StockListView.addHandlerRender(controllerSidePanels);
  PortfolioChartView.addHandlerPortfolio(controllerChangePage);
};

init();
