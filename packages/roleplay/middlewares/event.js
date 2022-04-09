class RageEvent {
	constructor(name, callback, middlewares = [], regFunction) {
		if(typeof name != "string") {
			throw new Error("Failed to create single event: name is not string.");
		}

		if(!name.length) {
			throw new Error("Failed to create single event: name is not string.");
		}

		if(typeof callback != "function") {
			throw new Error("Failed to create single event: name is not string.");
		}

		this.callback = callback;
		this.name = name; 
		this.fullEventName = `${name}`;
		this.middlewares = middlewares;
		
		regFunction.call(mp.events, this.fullEventName, (...args) => this.handle(...args));
	}

	use(...args) {
		for(let i = 0; i < args.length; i++) {
			const middleware = args[i];

			if(typeof middleware != "function") {
				console.trace(`Failed to use middleware #${i} function at RageEvent`);
				continue;
			}

			this.middlewares.push(middleware);
		}
	}

	handle(...args) {
		const source = args[0];
		if(source == null) {
			console.trace("Failed to handle event source");
			return;
		}

    args = args.slice(1, args.length);

		for(let i = 0; i < this.middlewares.length; i++) {
			let flag = false;

			const next = () => {
				flag = true;
			}

			this.middlewares[i](source, args, next, this.name);

			if(!flag) {
				return;
			}
		}

		this.callback(source, ...args);
	}
}

module.exports = RageEvent;