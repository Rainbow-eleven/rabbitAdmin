import { createStore } from "vuex";
export interface GlobalLoadingStore {
  isLoading: boolean;
}
const ModuleLoading = createStore<GlobalLoadingStore>({
  state: {
    isLoading: false,
  },
});
export default ModuleLoading;
