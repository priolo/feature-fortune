import commentApi from "../../api/comment-BB5wkVtF.js";
import featureApi from "../../api/feature-UgSXkzAA.js";
import { createStore as bn } from "../../node_modules/@priolo/jon/dist/index.es-DEeDXcIY.js";
const setup = {
  state: {
    /** FEATURE in show/edit */
    feature: null,
    /** last FEATURE loaded */
    featureLoaded: null
  },
  getters: {},
  actions: {
    /**
     * Carico per intero una FEATURE
     */
    fetch: async (_, store) => {
      const feature = await featureApi.get(store.state.feature.id);
      store.state.featureLoaded = { ...feature };
      store.setFeature(feature);
    },
    // aggiorno la FEATURE in editazione con i dati parziali
    updateSelected(featurePartial, store) {
      store.state.featureLoaded = { ...store.state.featureLoaded, ...featurePartial };
      store.setFeature({ ...store.state.feature, ...featurePartial });
    },
    clearEdit: async (_, store) => {
      store.setFeature(null);
      store.state.featureLoaded = null;
    },
    /**
     * L'AUTHOR crea o aggiorna la FEATURE
     */
    async save(_, store) {
      var _a, _b;
      const feature = store.state.feature;
      let updatedFeature;
      if (!!feature.id) {
        updatedFeature = (_a = await featureApi.update(feature)) == null ? void 0 : _a.feature;
      } else {
        updatedFeature = (_b = await featureApi.create(feature)) == null ? void 0 : _b.feature;
      }
      store.state.featureLoaded = { ...updatedFeature };
      store.setFeature(updatedFeature);
    },
    /**
     * L'AUTHOR cancella la FEATURE
     */
    async remove(_, store) {
      const feature = store.state.feature;
      await featureApi.remove(feature.id);
    },
    async action(action, store) {
      var _a;
      const feature = store.state.feature;
      const updatedFeature = (_a = await featureApi.action(feature.id, action)) == null ? void 0 : _a.feature;
      store.updateSelected(updatedFeature);
    },
    async addComment(comment, store) {
      var _a, _b;
      comment.entityType = "feature";
      comment.entityId = featureDetailSo.state.feature.id;
      const newComment = (_a = await commentApi.save(comment)) == null ? void 0 : _a.comment;
      if (!newComment) return;
      store.setFeature({
        ...featureDetailSo.state.feature,
        comments: ((_b = featureDetailSo.state.feature.comments) == null ? void 0 : _b.concat(newComment)) ?? [newComment]
      });
    }
  },
  mutators: {
    setFeature: (feature) => ({ feature })
  }
};
const featureDetailSo = bn(setup);
export {
  featureDetailSo as default
};
//# sourceMappingURL=detail-DycfNP2b.js.map
