import { makeAutoObservable } from "mobx";
import sortOrder from "./utils/sortOrder";
class Store {
  warningText = "";
  isWarningShown = false;
  editedTask = {};
  isEditPanelShown = false;
  sortOrder = sortOrder.nameAsc;
  currentPage = 1;
  totalPages = 1;
  tasks = [];
  isLoggedIn = false;
  constructor() {
    makeAutoObservable(this);
  }
  updateTasks(page, tasks, totalPages) {
    this.currentPage = page;
    this.tasks = tasks;
    this.totalPages = totalPages;
  }
  updateUserStatus(isLoggedIn) {
    this.isLoggedIn = isLoggedIn;
  }
  updateSortOrder(order) {
    this.sortOrder = order;
  }
  openEditPanel() {
    this.isEditPanelShown = true;
  }
  closeEditPanel() {
    this.isEditPanelShown = false;
  }
  loadEditedTask(task) {
    this.editedTask = task;
  }
  hideWarning() {
    this.isWarningShown = false;
  }
  showWarning(text) {
    this.isWarningShown = true;
    this.warningText = text;
  }
}

export default new Store();
