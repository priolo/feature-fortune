import ajax, { CallOptions } from "@/plugins/AjaxService"
import { Feature } from "@/types/feature/Feature"



/** INDEX */
function index(opt?: CallOptions): Promise<Feature[]> {
	return ajax.get(`features`, opt)
}

/** GET */
function get(id: string, opt?: CallOptions): Promise<Feature> {
	return ajax.get(`features/${id}`, opt)
}


/** CREATE */
function save(featureData: Feature, opt?: CallOptions): Promise<Feature> {
	// mi assicuro mandi le cose corrette
	const feature = <Feature>{
		id: featureData.id,
		title: featureData.title,
		description: featureData.description,
		githubRepoId: featureData.githubRepoId,
		githubDevId: featureData.githubDevId,
		accountDevId: featureData.accountDevId,
	}
	return ajax.post(`features`, { feature }, opt)
}


const featureApi = {
	index,
	get,
	save,
}
export default featureApi