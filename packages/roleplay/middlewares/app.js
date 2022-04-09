const RageEvent = require("./event.js");
const Group = require("./group.js")

let singleton = null;

class RageApp {
	constructor(flags) {
		if(singleton != null) {
			throw new Error("Failed to create RageApp again.");
		}
		singleton = this;

		this.events = [];
		this.groups = [];
		this.middlewares = [];
		this.type = "RageApp";
		// this.systems = [];

		if(flags.alertAllNoAppEvents == true) {
			this.regFunction = this.alertAllEvents();
		} else {
			this.regFunction = mp.events.add;
		}

		console.log('RageApp created successefully!');
	}

	use(...args) {
		for(let i = 0; i < args.length; i++) {
			const middleware = args[i];
			if(typeof middleware != "function") {
				console.trace(`Failed to use middleware function at RageApp. Middleware at #${i} number is not a function.`);
				return;
			}

			this.middlewares.push(middleware);
		}
	}

	addEvent(name, callback, middlewares = []) {
		middlewares = this.middlewares.slice().concat(middlewares);

		const event = new RageEvent(name, callback, middlewares, this.regFunction);
		this.events.push(event);

		return event;
	}

	addGroup(name) {
		const group = new Group(this, name, this.regFunction);
		this.groups.push(group);
		
		return group;
	}

	alertAllEvents() {
		const fn = mp.events.add;
		
		mp.events.add = (...args) => {
			console.log(`Your event "${args[0]}" was created without RageApp!`);
			fn.call(mp.events, ...args);
		}

		return fn;
	}
}

module.exports = RageApp;