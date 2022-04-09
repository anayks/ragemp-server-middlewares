const RageEvent = require("./event");

class RageGroup {
	constructor(root, name, regFunction, middlewares = []) {
		if(root == null) {
			throw new Error(`Failed to create RageAppGroup "${name}". Root is not defined.`);
		}

		if(!isRootValid(root)) {
			throw new Error(`Failed to create RageAppGroup "${name}". Root is not RageApp or RageAppGroup.`);
		}

		if(!this.isNameValid(name)) {
			throw new Error(`Failed to create RageAppGroup "${name}". Name is not valid.`);
		}

		this.groups = [];
		this.middlewares = middlewares.slice();
		this.name = name;
		this.events = [];
		this.type = "RageAppGroup";
		this.regFunction = regFunction;
	}

	addGroup(name) {
		const group = new RageGroup(this, name, this.regFunction, this.middlewares.slice())
		this.groups.push(group);

		return group;
	}

	isNameValid(name) {
		if(typeof name != "string") {
			return false;
		}
	
		if(!name.length) {
			return false;
		}
	
		return true;
	}

	use(...args) {
		for(let i = 0; i < args.length; i++) {
			const middleware = args[i];
			if(typeof middleware != "function") {
				console.trace(`Failed to use middleware function at RageAppGroup. Middleware at #${i} number is not a function.`);
				return;
			}

			this.middlewares.push(middleware);
		}
	}

	addEvent(name, callback, middlewares = []) {
		middlewares = this.middlewares.slice().concat(middlewares);
		
		const event = new RageEvent(name, callback, this.middlewares, this.regFunction);
		this.events.push(event);

		return event;
	}
}

function isRootValid(root) {
	const isInstanceOfApp 	= root.type == "RageApp";
	const isInstanceOfGroup = root.type == "RageAppGroup";
	return isInstanceOfApp || isInstanceOfGroup;
}

module.exports = RageGroup;