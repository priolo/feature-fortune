import { afterEach, beforeEach, describe, expect, jest, test } from "@jest/globals";
import { RootService } from "@priolo/julian";
import CronoService from "../crono/CronoService.js";



class TestCrono extends CronoService {

	get stateDefault() {
		return {
			...super.stateDefault,
			name: "test-crono",
			onTick: <(() => void) | null>null,
		}
	}
	declare state: typeof this.stateDefault

	protected async onCronoTick(): Promise<void> {
		console.log("TestCrono tick at", new Date().toISOString())
		this.state.onTick?.()
	}
}

describe("CronoService", () => {

	let root: RootService | undefined
	let consoleLogSpy: ReturnType<typeof jest.spyOn> | undefined

	const startCrono = async (stateOverrides: Partial<TestCrono["stateDefault"]> = {}) => {
		root = await RootService.Start({
			class: TestCrono,
			...stateOverrides,
		})
		const service = root.nodeByPath<TestCrono>("/test-crono")
		if (!service) throw new Error("TestCrono node not found")
		return service
	}

	beforeEach(() => {
		jest.useFakeTimers()
		consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => void 0)
	})

	afterEach(async () => {
		consoleLogSpy?.mockRestore()
		jest.clearAllTimers()
		if (root) {
			await RootService.Stop(root)
			root = undefined
		}
		jest.useRealTimers()
	})

	test("registers node in root", async () => {
		const testCrono = await startCrono()
		expect(testCrono).toBeDefined()
	})

	test("autoStart schedules ticks based on delay", async () => {
		const service = await startCrono()
		const onTick = jest.fn()
		service.setState({ delay: 25, onTick })
		await jest.advanceTimersByTimeAsync(25)
		expect(onTick).toHaveBeenCalledTimes(1)
	})

	test("changing delay restarts the timer", async () => {
		const service = await startCrono()
		const onTick = jest.fn()
		service.setState({ delay: 100, onTick })
		await jest.advanceTimersByTimeAsync(60)
		expect(onTick).not.toHaveBeenCalled()
		service.setState({ delay: 10 })
		await jest.advanceTimersByTimeAsync(9)
		expect(onTick).not.toHaveBeenCalled()
		await jest.advanceTimersByTimeAsync(1)
		expect(onTick).toHaveBeenCalledTimes(1)
	})

	test("stopCrono cancels any scheduled tick", async () => {
		const service = await startCrono()
		const onTick = jest.fn()
		service.setState({ delay: 30, onTick })
		;(service as any).stopCrono()
		await jest.advanceTimersByTimeAsync(100)
		expect(onTick).not.toHaveBeenCalled()
	})

	test("autoStart can be toggled on demand", async () => {
		const service = await startCrono({ autoStart: false })
		const onTick = jest.fn()
		service.setState({ delay: 20, onTick })
		await jest.advanceTimersByTimeAsync(100)
		expect(onTick).not.toHaveBeenCalled()
		service.setState({ autoStart: true })
		await jest.advanceTimersByTimeAsync(20)
		expect(onTick).toHaveBeenCalledTimes(1)
	})

	test("errors inside onCronoTick do not stop scheduling", async () => {
		const service = await startCrono()
		const errorSpy = jest.spyOn(console, "error").mockImplementation(() => void 0)
		let callCount = 0
		const onTick = jest.fn(() => {
			callCount += 1
			if (callCount === 1) {
				throw new Error("boom")
			}
		})
		service.setState({ delay: 15, onTick })
		await jest.advanceTimersByTimeAsync(15)
		await jest.advanceTimersByTimeAsync(15)
		expect(onTick).toHaveBeenCalledTimes(2)
		expect(errorSpy).toHaveBeenCalled()
		errorSpy.mockRestore()
	})

})