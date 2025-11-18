import commentApi from '../../api/comment-q_qPa1FP.js';
import featureApi from '../../api/feature-DKjbSCSw.js';
import { createStore as bn } from '../../node_modules/@priolo/jon/dist/index.es-8v3wK2PD.js';

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
      const feature = store.state.feature;
      let updatedFeature;
      if (!!feature.id) {
        updatedFeature = (await featureApi.update(feature))?.feature;
      } else {
        updatedFeature = (await featureApi.create(feature))?.feature;
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
      const feature = store.state.feature;
      const updatedFeature = (await featureApi.action(feature.id, action))?.feature;
      store.updateSelected(updatedFeature);
    },
    async addComment(comment, store) {
      comment.entityType = "feature";
      comment.entityId = featureDetailSo.state.feature.id;
      const newComment = (await commentApi.save(comment))?.comment;
      if (!newComment) return;
      store.setFeature({
        ...featureDetailSo.state.feature,
        comments: featureDetailSo.state.feature.comments?.concat(newComment) ?? [newComment]
      });
    }
  },
  mutators: {
    setFeature: (feature) => ({ feature })
  }
};
const featureDetailSo = bn(setup);

export { featureDetailSo as default };
//# sourceMappingURL=detail-BTgOX7nk.js.map
