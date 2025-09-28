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


const featureApi = {
	index,
	get,
}
export default featureApi