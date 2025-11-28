import ajax, { CallOptions } from "@/plugins/AjaxService"
import { Feature, FEATURE_ACTIONS } from "@/types/feature/Feature"


/** INDEX */
function index(/*filter?: FEATURE_API_FILTER,*/ opt?: CallOptions): Promise<{ features: Feature[] }> {
	//const filterQuery = filter ? `?filter=${filter}` : ''
	//return ajax.get(`features${filterQuery}`, opt)
	return ajax.get(`features`, opt)
}

/** GET */
function get(id: string, opt?: CallOptions): Promise<Feature> {
	return ajax.get(`features/${id}`, opt)
}


/** POST: CREATE */
function create(feature: Feature, opt?: CallOptions): Promise<{ feature: Feature }> {

	// mi assicuro mandi le cose corrette
	delete feature.id
	delete feature.accountId
	delete feature.status
	delete feature.createdAt
	delete feature.comments
	delete feature.fundings

	return ajax.post(`features`, { feature }, opt)
}

/** PATCH: UPDATE */
function update(feature: Feature, opt?: CallOptions): Promise<{ feature: Feature }> {

	// mi assicuro mandi le cose corrette
	delete feature.status
	delete feature.createdAt
	delete feature.comments
	delete feature.fundings

	return ajax.patch(`features`, { feature }, opt)
}

/** DELETE */
function remove(featureId: string, opt?: CallOptions): Promise<{ success: boolean }> {
	return ajax.delete(`features/${featureId}`, null, opt)
}

function action(featureId: string, action: FEATURE_ACTIONS, opt?: CallOptions): Promise<{ feature: Partial<Feature> }> {
	return ajax.post(`features/${featureId}/action`, { action }, opt)
}



const featureApi = {
	index,
	get,
	create,
	update,
	remove,

	action,
}
export default featureApi