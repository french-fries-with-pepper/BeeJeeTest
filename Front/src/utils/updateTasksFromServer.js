export default function (apiService, store) {
  return apiService
    .getTasks(store.currentPage, store.sortOrder)
    .then((res) => res.json())
    .then((res) => {
      const { page, tasks, totalPages } = res;
      store.updateTasks(page, tasks, totalPages);
    });
}
